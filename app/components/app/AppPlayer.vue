<script setup lang="ts">
// import { iconButton } from '~/binds/buttons';
// import { useSpotifyPlayer } from '~/composables/useSpotifyPlayer';
// import { spotifyApi } from '~/services/api';

// const { isPlayerVisible } = usePlayerState();
// const {
//   loadScript,
//   initializePlayer,
//   isConnected,
//   isPaused,
//   currentTrack,
//   playerState,
//   togglePlay,
//   nextTrack,
//   previousTrack,
//   seek,
//   setVolume,
// } = useSpotifyPlayer();

// const progress = ref(0);
// const duration = ref(0);
// const sliderValue = ref(0);
// let progressInterval: any = null;

// const trackName = computed(
//   () => currentTrack.value?.name || 'No Track Selected',
// );
// const artistName = computed(
//   () => currentTrack.value?.artists[0]?.name || 'Select a track to play',
// );
// const albumSubtext = computed(() => {
//   if (!currentTrack.value) return 'Artist Name';
//   return currentTrack.value.artists
//     .map((a: Spotify.Entity) => a.name)
//     .join(', ');
// });
// const coverImage = computed(() => currentTrack.value?.album.images[0]?.url);

// const formatTime = (ms: number) => {
//   if (!ms) return '0:00';
//   const totalSeconds = Math.floor(ms / 1000);
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;
//   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
// };

// const handleSeek = (event: Event) => {
//   const value = Number((event.target as HTMLInputElement).value);
//   const seekTo = (value / 100) * duration.value;
//   seek(seekTo);
// };

// const handleVolume = (event: Event) => {
//   const value = Number((event.target as HTMLInputElement).value);
//   setVolume(value);
// };

// onMounted(async () => {
//   isPlayerVisible.value = true;
//   loadScript();

//   try {
//     const userTokenCookie = useCookie('spotify_access_token');
//     if (userTokenCookie.value) {
//       initializePlayer(userTokenCookie.value);
//     } else {
//       // Attempt to fetch token from backend via Axios service
//       const { token } = await spotifyApi.getToken();
//       if (token) {
//         initializePlayer(token);
//       }
//     }
//   } catch (e) {
//     console.error('Failed to fetch Spotify token:', e);
//   }

//   // Progress updater
//   progressInterval = setInterval(() => {
//     if (!isPaused.value && playerState.value) {
//       const state = playerState.value;
//       duration.value = state.duration;
//       // Estimate position based on last state update time could be better, but simple position + delta is okay for now
//       // Actually SDK state is snapshot. We should trust state.position but it doesn't update in real time in the object ref.
//       // Usually we need to manually increment if playing.
//       // For now, let's just rely on state position if available, or 0.
//       progress.value = state.position;
//       sliderValue.value =
//         duration.value > 0 ? (state.position / duration.value) * 100 : 0;
//     }
//   }, 1000);
// });

// onUnmounted(() => {
//   isPlayerVisible.value = false;
//   if (progressInterval) clearInterval(progressInterval);
// });
</script>

<template>
  <!-- <div
    class="w-full shrink-0 bg-surface-elevated border-t border-border p-3 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
  >
    <div
      class="flex items-center justify-between max-w-screen-2xl mx-auto h-16 md:h-20 gap-2 md:gap-4"
    >
      <div class="flex items-center gap-3 w-[25%] md:w-[30%] min-w-0">
        <div
          class="h-12 w-12 md:h-14 md:w-14 rounded bg-surface-card shrink-0 flex items-center justify-center overflow-hidden relative group"
        >
          <img
            v-if="coverImage"
            :src="coverImage"
            alt="Album Art"
            class="w-full h-full object-cover"
          />
          <UIcon
            v-else
            name="i-heroicons-musical-note"
            class="text-text-dim w-6 h-6"
          />
        </div>

        <div class="hidden sm:block overflow-hidden min-w-0">
          <h4
            class="text-sm text-text-main font-medium truncate hover:underline cursor-pointer"
          >
            {{ trackName }}
          </h4>

          <p
            class="text-xs text-text-muted truncate hover:underline cursor-pointer"
          >
            {{ albumSubtext }}
          </p>
        </div>

        <UButton
          v-bind="iconButton"
          icon="i-heroicons-heart"
          class="hidden md:flex text-text-muted hover:text-(--color-primary)"
        />
      </div>

      <div class="flex flex-col items-center flex-1 max-w-[50%] md:max-w-[40%]">
        <div class="flex items-center gap-4 md:gap-6 mb-1">
          <UButton
            v-bind="iconButton"
            icon="i-heroicons-backward"
            class="text-text-muted hover:text-text-main"
            :disabled="!isConnected"
            @click="previousTrack"
          />

          <UButton
            :icon="
              isPaused ? 'i-heroicons-play-solid' : 'i-heroicons-pause-solid'
            "
            color="neutral"
            variant="solid"
            class="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform bg-white text-black hover:bg-white p-0"
            :disabled="!isConnected"
            @click="togglePlay"
          />

          <UButton
            v-bind="iconButton"
            icon="i-heroicons-forward"
            class="text-text-muted hover:text-text-main"
            :disabled="!isConnected"
            @click="nextTrack"
          />
        </div>

        <div
          class="w-full flex items-center gap-2 text-xs text-text-muted font-medium group"
        >
          <span class="hidden md:inline">{{ formatTime(progress) }}</span>

          <input
            class="slider w-full cursor-pointer h-1.5 md:h-1 accent-(--color-primary) bg-(--color-border) rounded-full appearance-none hover:h-1.5 transition-all"
            type="range"
            min="0"
            max="100"
            :value="sliderValue"
            :disabled="!isConnected"
            @input="handleSeek"
          />

          <span class="hidden md:inline">{{ formatTime(duration) }}</span>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 w-[25%] md:w-[30%]">
        <div class="hidden md:flex items-center gap-2 group">
          <UButton
            v-bind="iconButton"
            icon="i-heroicons-speaker-wave"
            class="text-text-muted hover:text-text-main"
          />

          <input
            class="w-24 h-1 cursor-pointer accent-text-muted bg-(--color-border) rounded-full appearance-none hover:accent-text-main group-hover:h-1.5 transition-all"
            type="range"
            min="0"
            max="100"
            value="50"
            :disabled="!isConnected"
            @input="handleVolume"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider:hover::-webkit-slider-thumb {
  transform: scale(1.1);
}
</style>
