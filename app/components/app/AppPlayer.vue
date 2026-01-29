<script setup lang="ts">
import { iconButton } from "~/binds/buttons";

const { isPlayerVisible } = usePlayerState();

onMounted(() => {
  isPlayerVisible.value = true;
});

onUnmounted(() => {
  isPlayerVisible.value = false;
});
</script>

<template>
  <div
    class="w-full shrink-0 bg-surface-elevated border-t border-border p-3 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
  >
    <div
      class="flex items-center justify-between max-w-screen-2xl mx-auto h-16 md:h-20 gap-2 md:gap-4"
    >
      <div class="flex items-center gap-3 w-[25%] md:w-[30%] min-w-0">
        <div
          class="h-12 w-12 md:h-14 md:w-14 rounded bg-surface-card shrink-0 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-musical-note"
            class="text-text-dim w-6 h-6"
          />
        </div>

        <div class="hidden sm:block overflow-hidden min-w-0">
          <h4
            class="text-sm text-text-main font-medium truncate hover:underline cursor-pointer"
          >
            No Track Selected
          </h4>

          <p
            class="text-xs text-text-muted truncate hover:underline cursor-pointer"
          >
            Artist Name
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
          />

          <UButton
            icon="i-heroicons-play-solid"
            color="neutral"
            variant="solid"
            class="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform bg-white text-black hover:bg-white p-0"
          />

          <UButton
            v-bind="iconButton"
            icon="i-heroicons-forward"
            class="text-text-muted hover:text-text-main"
          />
        </div>

        <div
          class="w-full flex items-center gap-2 text-xs text-text-muted font-medium group"
        >
          <span class="hidden md:inline">0:00</span>

          <input
            class="slider w-full cursor-pointer h-1.5 md:h-1 accent-(--color-primary) bg-(--color-border) rounded-full appearance-none"
            type="range"
            min="0"
            max="100"
            value="0"
          />

          <span class="hidden md:inline">0:00</span>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 w-[25%] md:w-[30%]">
        <div class="hidden md:flex items-center gap-2">
          <UButton
            v-bind="iconButton"
            icon="i-heroicons-speaker-wave"
            class="text-text-muted hover:text-text-main"
          />

          <input
            class="w-24 h-1 cursor-pointer accent-text-muted bg-(--color-border) rounded-full appearance-none"
            type="range"
            min="0"
            max="100"
            value="70"
          />
        </div>
      </div>
    </div>
  </div>
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
}
</style>
