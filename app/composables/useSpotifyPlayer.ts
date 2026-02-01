/// <reference types="@types/spotify-web-playback-sdk" />

export const useSpotifyPlayer = () => {
  const isConnected = useState<boolean>('spotify-connected', () => false);
  const isPaused = useState<boolean>('spotify-paused', () => true);
  const currentTrack = useState<Spotify.Track | null>(
    'spotify-track',
    () => null,
  );
  const deviceId = useState<string | null>('spotify-device-id', () => null);
  const player = useState<Spotify.Player | null>('spotify-player', () => null);
  const playerState = useState<Spotify.PlaybackState | null>(
    'spotify-player-state',
    () => null,
  );
  const accessToken = useState<string | null>('spotify-token', () => null);

  const scriptLoaded = ref(false);

  const loadScript = () => {
    if (import.meta.client) {
      if (document.getElementById('spotify-player-script')) {
        scriptLoaded.value = true;
        return;
      }

      const script = document.createElement('script');
      script.id = 'spotify-player-script';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
      scriptLoaded.value = true;
    }
  };

  const initializePlayer = (token: string) => {
    if (!import.meta.client) return;

    accessToken.value = token;

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!window.Spotify) return;

      const spotifyPlayer = new window.Spotify.Player({
        name: 'Spotify Agentic System',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener(
        'ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Ready with Device ID', device_id);
          deviceId.value = device_id;
          isConnected.value = true;
        },
      );

      spotifyPlayer.addListener(
        'not_ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id);
          isConnected.value = false;
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

      spotifyPlayer.connect();
      player.value = spotifyPlayer;
    };
  };

  const playTrack = async (uris: string[]) => {
    if (!deviceId.value || !accessToken.value) {
      console.warn('Spotify Player not ready or no token');
      return;
    }

    try {
      await $fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.value}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            'Content-Type': 'application/json',
          },
          body: {
            uris,
          },
        },
      );
      isPaused.value = false;
    } catch (e) {
      console.error('Failed to play track via Web API', e);
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

  return {
    loadScript,
    initializePlayer,
    isConnected,
    isPaused,
    currentTrack,
    playerState,
    playTrack,
    togglePlay,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
  };
};
