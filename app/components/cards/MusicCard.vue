<script setup lang="ts">
import type { Track } from '~/models/track';
import { baseButton } from '~/binds/buttons';
import PlayButton from '~/components/buttons/PlayButton.vue';

defineProps<{
  track: Track;
}>();
</script>

<template>
  <UPageCard
    class="group cursor-pointer bg-surface-elevated/50 hover:bg-surface-card transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/3 hover:border-white/8 min-w-[180px] max-w-[320px] mx-auto w-full"
  >
    <div class="flex flex-col gap-4">
      <div
        class="relative w-full aspect-square overflow-hidden rounded-lg shadow-xl shadow-black/20"
      >
        <img
          :src="track.image"
          :alt="track.title"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div
          class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"
        ></div>

        <UButton
          v-bind="baseButton"
          icon="i-lucide-plus"
          color="neutral"
          variant="solid"
          class="absolute top-3 right-3 size-10 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-primary hover:text-black hover:border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-4 group-hover:translate-y-0 z-10"
          title="Adicionar à playlist"
        />

        <PlayButton
          size="lg"
          class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 transform translate-y-4 group-hover:translate-y-0 shadow-[0_8px_24px_rgba(56,224,123,0.3)] hover:scale-110 active:scale-95"
        />
      </div>

      <div class="flex flex-col min-w-0 pr-1">
        <h3
          class="font-bold text-text-main truncate text-base group-hover:text-primary transition-colors duration-300"
        >
          {{ track.title }}
        </h3>

        <p class="text-sm font-medium text-text-muted truncate mt-0.5">
          {{ track.artist }}
        </p>

        <div class="flex items-center gap-2 mt-2">
          <span
            class="text-[10px] uppercase tracking-widest font-bold text-white/30 px-2 py-0.5 rounded-full border border-white/5 bg-white/2"
          >
            {{ track.genre.split(',')[0] }}
          </span>
        </div>
      </div>
    </div>
  </UPageCard>
</template>

<style scoped>
.ease-premium {
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
