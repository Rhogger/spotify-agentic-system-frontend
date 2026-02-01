<script setup lang="ts">
import type { Track } from '~/models/track';
import { baseButton } from '~/binds/buttons';
import PlayButton from '~/components/buttons/PlayButton.vue';
import OverflowText from '~/components/text/OverflowText.vue';

const props = defineProps<{
  track: Track;
}>();

const emit = defineEmits<{
  (e: 'add-to-playlist', track: Track): void;
}>();

const formattedArtists = computed(() => {
  try {
    const parsed = JSON.parse(props.track.artists.replace(/'/g, '"'));
    return Array.isArray(parsed) ? parsed.join(', ') : props.track.artists;
  } catch {
    return props.track.artists;
  }
});
</script>

<template>
  <div
    class="group cursor-pointer bg-white/5 hover:bg-surface-card transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/3 hover:border-white/8 rounded-xl p-3"
  >
    <div class="flex flex-col gap-3">
      <div
        class="relative w-full aspect-square overflow-hidden rounded-lg shadow-xl shadow-black/20 bg-white/5"
      >
        <img
          :src="track.image_url"
          :alt="track.name"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
          @click.stop="emit('add-to-playlist', track)"
        />

        <PlayButton
          size="lg"
          :track-uri="`spotify:track:${track.spotify_id}`"
          class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 transform translate-y-4 group-hover:translate-y-0 shadow-[0_8px_24px_rgba(56,224,123,0.3)] hover:scale-110 active:scale-95"
        />
      </div>

      <div class="flex flex-col min-w-0">
        <OverflowText
          :text="track.name"
          class="font-bold text-text-main text-sm group-hover:text-primary transition-colors duration-300"
        />

        <OverflowText
          :text="formattedArtists"
          class="text-xs font-medium text-text-muted mt-0.5"
        />

        <div v-if="track.explicit" class="flex items-center mt-2">
          <span
            class="text-[10px] uppercase tracking-widest font-bold text-white/30 px-2 py-0.5 rounded-full border border-white/5 bg-white/2"
          >
            Explícito
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
