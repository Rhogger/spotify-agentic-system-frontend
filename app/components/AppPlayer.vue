<script setup lang="ts">
// AppPlayer Component (Footer/Player Bar)
// Based on the prototype's bottom player bar
</script>

<template>
  <div
    class="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)] p-3 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
  >
    <div
      class="flex items-center justify-between max-w-screen-2xl mx-auto h-16 md:h-20 gap-2 md:gap-4"
    >
      <!-- Track Info -->
      <div class="flex items-center gap-3 w-[25%] md:w-[30%] min-w-0">
        <div
          class="h-12 w-12 md:h-14 md:w-14 rounded bg-[var(--color-surface-card)] flex-shrink-0 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-musical-note"
            class="text-[var(--color-text-dim)] w-6 h-6"
          />
        </div>
        <div class="hidden sm:block overflow-hidden min-w-0">
          <h4
            class="text-sm text-[var(--color-text-main)] font-medium truncate hover:underline cursor-pointer"
          >
            No Track Selected
          </h4>
          <p
            class="text-xs text-[var(--color-text-muted)] truncate hover:underline cursor-pointer"
          >
            Artist Name
          </p>
        </div>
        <UButton
          icon="i-heroicons-heart"
          variant="ghost"
          color="neutral"
          class="hidden md:block text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
        />
      </div>

      <!-- Controls -->
      <div class="flex flex-col items-center flex-1 max-w-[50%] md:max-w-[40%]">
        <div class="flex items-center gap-4 md:gap-6 mb-1">
          <UButton
            icon="i-heroicons-backward"
            variant="ghost"
            color="neutral"
            class="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          />
          <button
            class="bg-[var(--color-text-main)] text-black rounded-full h-10 w-10 md:h-12 md:w-12 hover:scale-105 transition-transform flex items-center justify-center shadow-lg"
          >
            <UIcon name="i-heroicons-play" class="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <UButton
            icon="i-heroicons-forward"
            variant="ghost"
            color="neutral"
            class="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
          />
        </div>
        <div
          class="w-full flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-medium group"
        >
          <span class="hidden md:inline">0:00</span>
          <!-- Custom Slider could replace this range input -->
          <input
            class="slider w-full cursor-pointer h-1.5 md:h-1 accent-[var(--color-primary)] bg-[var(--color-border)] rounded-full appearance-none"
            type="range"
            min="0"
            max="100"
            value="0"
          />
          <span class="hidden md:inline">0:00</span>
        </div>
      </div>

      <!-- Volume / Extra -->
      <div class="flex items-center justify-end gap-2 w-[25%] md:w-[30%]">
        <div class="hidden md:flex items-center gap-2">
          <UButton
            icon="i-heroicons-speaker-wave"
            variant="ghost"
            color="neutral"
            class="text-[var(--color-text-muted)]"
          />
          <input
            class="w-24 h-1 cursor-pointer accent-[var(--color-text-muted)] bg-[var(--color-border)] rounded-full appearance-none"
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
/* Simple styling for range inputs if Tailwind plugin not full valid yet for ranges */
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
