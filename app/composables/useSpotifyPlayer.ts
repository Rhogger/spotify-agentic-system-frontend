/// <reference types="@types/spotify-web-playback-sdk" />

const isConnected = ref(false);
const isPaused = ref(true);
const currentTrack = ref<Spotify.Track | null>(null);
const deviceId = ref<string | null>(null);
const player = ref<Spotify.Player | null>(null);
const playerState = ref<Spotify.PlaybackState | null>(null);
const accessToken = ref<string | null>(null);

export const useSpotifyPlayer = () => {
  const loadScript = () => {
    if (!import.meta.client) return;
    if (document.getElementById('spotify-player-script')) return;

    const script = document.createElement('script');
    script.id = 'spotify-player-script';
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const transferPlayback = async (id: string, token: string) => {
    try {
      await $fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          device_ids: [id],
          play: false,
        },
      });
      console.log('Playback transferred to Web Player');
    } catch (e) {
      console.warn('Failed to transfer playback automatically', e);
    }
  };

  const initializePlayer = (token: string) => {
    if (!import.meta.client || player.value) return;

    accessToken.value = token;

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!window.Spotify) return;

      const spotifyPlayer = new window.Spotify.Player({
        name: 'Spotify Agentic System',
        getOAuthToken: (cb: (t: string) => void) => {
          const latestToken =
            useCookie('spotify_access_token').value || accessToken.value;
          cb(latestToken || token);
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener(
        'ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Player Ready - Device ID:', device_id);
          deviceId.value = device_id;
          isConnected.value = true;

          const currentToken =
            useCookie('spotify_access_token').value || accessToken.value;
          if (currentToken) transferPlayback(device_id, currentToken);
        },
      );

      spotifyPlayer.addListener(
        'not_ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Player Offline:', device_id);
          isConnected.value = false;
          deviceId.value = null;
        },
      );

      spotifyPlayer.addListener(
        'player_state_changed',
        (state: Spotify.PlaybackState) => {
          if (!state) return;
          playerState.value = state;
          currentTrack.value = state.track_window.current_track;
          isPaused.value = state.paused;
        },
      );

      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('Spotify SDK Initialization Error:', message);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('Spotify SDK Authentication Error:', message);
      });

      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('Spotify SDK Account Error:', message);
      });

      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error('Spotify SDK Playback Error:', message);
        if (message.includes('DRM') || message.includes('Widevine')) {
          console.error(
            'ERRO DE DRM DETECTADO: Verifique se o seu navegador permite a execução de conteúdo protegido (Widevine). No Firefox/Linux, ative o DRM nas configurações.',
          );
        }
      });

      spotifyPlayer.connect().then((success) => {
        if (success) {
          console.log('Successfully connected to Spotify SDK');
        }
      });
      player.value = spotifyPlayer;
    };

    loadScript();
  };

  const play = async (options: {
    uris?: string[];
    context_uri?: string;
    offset?: { position?: number; uri?: string };
  }) => {
    const currentToken =
      useCookie('spotify_access_token').value || accessToken.value;

    if (!deviceId.value || !currentToken) {
      console.warn('Spotify Player is not ready yet. Please wait a moment.');
      return;
    }

    try {
      if (
        player.value &&
        typeof (player.value as any).activateElement === 'function'
      ) {
        (player.value as any).activateElement();
      }

      await $fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.value}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
          body: options,
        },
      ).catch(async (err) => {
        if (err.status === 404) {
          console.error('Device not found. Re-transferring...');
          await transferPlayback(deviceId.value!, currentToken);
          return $fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.value}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${currentToken}`,
                'Content-Type': 'application/json',
              },
              body: options,
            },
          );
        }
        throw err;
      });
      isPaused.value = false;
    } catch (e) {
      console.error('Failed to play via Spotify Web API', e);
    }
  };

  const togglePlay = async () => {
    if (player.value) {
      await player.value.togglePlay();
    }
  };

  const nextTrack = async () => {
    if (player.value) {
      await player.value.nextTrack();
    }
  };

  const previousTrack = async () => {
    if (player.value) {
      await player.value.previousTrack();
    }
  };

  const seek = async (position: number) => {
    if (player.value) {
      await player.value.seek(position);
    }
  };

  const setVolume = async (volume: number) => {
    if (player.value) {
      await player.value.setVolume(volume / 100);
    }
  };

  const toggleShuffle = async (state: boolean) => {
    const currentToken =
      useCookie('spotify_access_token').value || accessToken.value;
    if (!currentToken || !deviceId.value) return;

    try {
      await $fetch(
        `https://api.spotify.com/v1/me/player/shuffle?state=${state}&device_id=${deviceId.value}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
    } catch (e) {
      console.error('Failed to toggle shuffle', e);
    }
  };

  const setRepeatMode = async (mode: 'track' | 'context' | 'off') => {
    const currentToken =
      useCookie('spotify_access_token').value || accessToken.value;
    if (!currentToken || !deviceId.value) return;

    try {
      await $fetch(
        `https://api.spotify.com/v1/me/player/repeat?state=${mode}&device_id=${deviceId.value}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
    } catch (e) {
      console.error('Failed to set repeat mode', e);
    }
  };

  return {
    initializePlayer,
    isConnected,
    isPaused,
    currentTrack,
    deviceId,
    playerState,
    play,
    togglePlay,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
    toggleShuffle,
    setRepeatMode,
  };
};
