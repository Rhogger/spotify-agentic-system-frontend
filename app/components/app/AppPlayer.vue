<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { iconButton } from '~/binds/buttons';
import { useSpotifyPlayer } from '~/composables/useSpotifyPlayer';
import { usePlayerState } from '~/composables/usePlayerState';
import { useAuth } from '~/composables/useAuth';

const { isPlayerVisible } = usePlayerState();
const {
  initializePlayer,
  isConnected,
  isPaused,
  currentTrack,
  playerState,
  togglePlay,
  nextTrack,
  previousTrack,
  seek,
  setVolume,
  toggleShuffle,
  setRepeatMode,
} = useSpotifyPlayer();
const { user } = useAuth();
const { playlists, addTracksToPlaylist, fetchPlaylists } = usePlaylists();
const toast = useToast();

const volumeCookie = useCookie('player_volume', { default: () => 50 });

const progress = ref(0);
const duration = ref(0);
const sliderValue = ref(0);
const volumeValue = ref(volumeCookie.value);
const prevVolume = ref(volumeValue.value);
const isMuted = ref(false);
const isPlaylistModalOpen = ref(false);
let progressInterval: any = null;

const trackName = computed(() => currentTrack.value?.name || 'Sem música');
const artistName = computed(
  () =>
    currentTrack.value?.artists.map((a: any) => a.name).join(', ') ||
    'Selecione uma música',
);
const coverImage = computed(() => currentTrack.value?.album.images[0]?.url);

const isPremium = computed(
  () => user.value?.spotify_profile?.product === 'premium',
);

const myPlaylists = computed(() =>
  playlists.value.filter((p) => p.owner_id === user.value?.spotify_id),
);

const isShuffle = computed(() => playerState.value?.shuffle || false);
const repeatMode = computed(() => playerState.value?.repeat_mode || 0);

const handleToggleShuffle = () => {
  toggleShuffle(!isShuffle.value);
};

const handleToggleRepeat = () => {
  const modes = [0, 1, 2] as const;
  const nextMode = modes[(repeatMode.value + 1) % 3];

  const modeString =
    nextMode === 0 ? 'off' : nextMode === 1 ? 'context' : 'track';
  setRepeatMode(modeString);
};

const containingPlaylists = ref(new Set<string | number>());

const handleAddToPlaylist = () => {
  if (!currentTrack.value) return;
  if (playlists.value.length === 0) {
    fetchPlaylists();
  }

  containingPlaylists.value.clear();

  isPlaylistModalOpen.value = true;
};

const selectPlaylist = async (id: string | number) => {
  if (!currentTrack.value) return;

  isPlaylistModalOpen.value = false;
  const result = await addTracksToPlaylist(String(id), {
    track_ids: [currentTrack.value.id!],
  });

  if (result?.success) {
    toast.add({
      title: 'Sucesso',
      description: 'Música adicionada à playlist.',
      color: 'success',
    });
  }
};

const formatTime = (ms: number) => {
  if (!ms) return '0:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const handleSeek = (value: number | undefined) => {
  if (value === undefined) return;
  const seekTo = (value / 100) * duration.value;
  seek(seekTo);
};

const handleVolume = (value: number | undefined) => {
  if (value === undefined) return;
  volumeValue.value = value;
  volumeCookie.value = value;
  if (value > 0) isMuted.value = false;
  setVolume(value);
};

const toggleMute = () => {
  if (isMuted.value) {
    volumeValue.value = prevVolume.value || 50;
    isMuted.value = false;
  } else {
    prevVolume.value = volumeValue.value;
    volumeValue.value = 0;
    isMuted.value = true;
  }
  setVolume(volumeValue.value);
};

const handlePrevious = async () => {
  if (progress.value > 2000) {
    await seek(0);
  } else {
    await previousTrack();
  }
};

onMounted(() => {
  const spotifyToken =
    useCookie('spotify_access_token').value || user.value?.spotify_access_token;

  if (spotifyToken) {
    initializePlayer(spotifyToken);
    setTimeout(() => {
      setVolume(volumeValue.value);
    }, 1500);
  } else {
    console.warn(
      'Spotify Access Token não encontrado. O player não será inicializado.',
    );
  }

  if (user.value?.spotify_profile?.product !== 'premium') {
    console.error(
      'Sua conta Spotify é FREE. O Web Playback SDK requer uma conta PREMIUM para funcionar.',
    );
  }

  progressInterval = setInterval(() => {
    if (!isPaused.value && playerState.value) {
      const state = playerState.value;
      duration.value = state.duration;

      if (!state.paused) {
        progress.value = Math.min(progress.value + 1000, duration.value);
      } else {
        progress.value = state.position;
      }

      sliderValue.value =
        duration.value > 0 ? (progress.value / duration.value) * 100 : 0;
    } else if (playerState.value) {
      progress.value = playerState.value.position;
      duration.value = playerState.value.duration;
      sliderValue.value =
        duration.value > 0 ? (progress.value / duration.value) * 100 : 0;
    }
  }, 1000);
});

watch(
  () => playerState.value?.position,
  (newPos) => {
    if (newPos !== undefined) {
      progress.value = newPos;
    }
  },
);

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval);
});
</script>

<template>
  <Transition
    enter-active-class="transform transition ease-out duration-500"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition ease-in duration-300"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="isPlayerVisible || currentTrack"
      class="fixed bottom-0 left-0 right-0 h-24 bg-background/80 backdrop-blur-xl border-t border-white/5 p-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
    >
      <div
        class="flex items-center justify-between max-w-screen-2xl mx-auto h-full gap-4"
      >
        <div class="flex items-center gap-4 w-[30%] min-w-0">
          <div
            class="h-14 w-14 rounded-lg bg-white/5 shrink-0 flex items-center justify-center overflow-hidden shadow-lg border border-white/10"
          >
            <img
              v-if="coverImage"
              :src="coverImage"
              alt="Album Art"
              class="w-full h-full object-cover animate-fade-in"
            />
            <UIcon
              v-else
              name="i-heroicons-musical-note"
              class="text-white/20 w-7 h-7"
            />
          </div>

          <div class="overflow-hidden min-w-0 flex flex-col justify-center">
            <h4
              class="text-sm text-text-main font-bold truncate hover:text-primary transition-colors cursor-pointer"
            >
              {{ trackName }}
            </h4>
            <p
              class="text-xs text-text-muted truncate hover:text-white transition-colors cursor-pointer font-medium"
            >
              {{ artistName }}
            </p>
          </div>

          <UButton
            v-if="currentTrack"
            v-bind="iconButton"
            icon="i-lucide-plus"
            class="ml-2 text-text-muted hover:text-primary transition-all hover:scale-110"
            title="Adicionar à playlist"
            @click="handleAddToPlaylist"
          />
        </div>

        <div class="flex flex-col items-center flex-1 max-w-[40%]">
          <div class="flex items-center gap-4 mb-2">
            <UButton
              v-bind="iconButton"
              icon="i-lucide-shuffle"
              class="transition-all hover:scale-110 active:scale-95"
              :class="
                isShuffle ? 'text-primary' : 'text-text-muted hover:text-white'
              "
              :disabled="!isConnected || !isPremium"
              @click="handleToggleShuffle"
            />

            <UButton
              v-bind="iconButton"
              icon="i-heroicons-backward"
              class="text-text-muted hover:text-white transition-all hover:scale-110 active:scale-90"
              :disabled="!isConnected || !isPremium"
              @click="handlePrevious"
            />

            <UButton
              color="primary"
              variant="solid"
              class="rounded-full w-12 h-12 flex items-center justify-center shadow-[0_8px_20px_rgba(56,224,123,0.3)] hover:scale-110 active:scale-95 transition-all bg-primary text-black hover:bg-primary/90 p-0"
              :disabled="!isConnected || !isPremium"
              @click="togglePlay"
            >
              <UIcon
                :name="
                  isPaused
                    ? 'i-heroicons-play-solid'
                    : 'i-heroicons-pause-solid'
                "
                class="w-7 h-7"
              />
            </UButton>

            <UButton
              v-bind="iconButton"
              icon="i-heroicons-forward"
              class="text-text-muted hover:text-white transition-all hover:scale-110 active:scale-90"
              :disabled="!isConnected || !isPremium"
              @click="nextTrack"
            />

            <UButton
              v-bind="iconButton"
              :icon="repeatMode === 2 ? 'i-lucide-repeat-1' : 'i-lucide-repeat'"
              class="transition-all hover:scale-110 active:scale-95"
              :class="
                repeatMode > 0
                  ? 'text-primary'
                  : 'text-text-muted hover:text-white'
              "
              :disabled="!isConnected || !isPremium"
              @click="handleToggleRepeat"
            />
          </div>

          <div
            v-if="!isPremium"
            class="text-[10px] text-primary font-bold uppercase tracking-tighter mb-1"
          >
            Plano Premium necessário para este player
          </div>

          <div
            class="w-full flex items-center gap-3 text-[10px] font-bold text-text-muted/60 tracking-wider"
          >
            <span class="w-10 text-right">{{ formatTime(progress) }}</span>
            <BaseSlider
              v-model="sliderValue"
              :disabled="!isConnected || !isPremium"
              size="sm"
              class="flex-1"
              @update:model-value="handleSeek"
            />
            <span class="w-10 text-left">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="flex items-center justify-end gap-4 w-[30%]">
          <div class="flex items-center gap-3 group min-w-[150px]">
            <UButton
              v-bind="iconButton"
              :icon="
                isMuted || volumeValue === 0
                  ? 'i-heroicons-speaker-x-mark'
                  : volumeValue < 50
                    ? 'i-heroicons-speaker-wave-20-solid'
                    : 'i-heroicons-speaker-wave'
              "
              class="text-text-muted hover:text-white transition-colors p-0"
              @click="toggleMute"
            />
            <BaseSlider
              v-model="volumeValue"
              :disabled="!isConnected || !isPremium"
              size="sm"
              class="flex-1"
              @update:model-value="handleVolume"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <PlaylistSelectionModal
    v-model="isPlaylistModalOpen"
    :playlists="myPlaylists"
    :containing-playlists="containingPlaylists"
    @select="selectPlaylist"
  />
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
