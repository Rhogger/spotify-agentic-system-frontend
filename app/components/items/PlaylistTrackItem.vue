<script setup lang="ts">
import type { Track } from '~/models/playlist';

defineProps<{
  track: Track;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'play', track: Track): void;
}>();
</script>

<template>
  <div
    class="group grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4 items-center px-2 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-text-muted"
    role="button"
    @dblclick="emit('play', track)"
  >
    <span class="text-center group-hover:hidden w-4">
      {{ index + 1 }}
    </span>

    <UIcon
      name="i-heroicons-play-solid"
      class="w-4 h-4 text-white hidden group-hover:block mx-auto cursor-pointer"
      @click.stop="emit('play', track)"
    />

    <div class="flex items-center gap-3 overflow-hidden">
      <img
        v-if="track.image"
        :src="track.image"
        class="w-10 h-10 rounded shrink-0 object-cover"
        :alt="track.title"
      />
      <div class="flex flex-col truncate">
        <span
          class="text-white font-medium text-base truncate group-hover:text-primary transition-colors cursor-pointer"
        >
          {{ track.title }}
        </span>

        <span
          class="text-xs group-hover:text-white transition-colors cursor-pointer truncate"
        >
          {{ track.artist }}
        </span>
      </div>
    </div>

    <span
      class="truncate group-hover:text-white transition-colors cursor-pointer"
    >
      {{ track.album }}
    </span>
    <span class="text-right pr-4 truncate">
      {{ track.addedAt }}
    </span>

    <span class="whitespace-nowrap font-mono text-center w-12">
      {{ track.duration }}
    </span>
  </div>
</template>
