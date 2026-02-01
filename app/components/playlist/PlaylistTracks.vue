<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import type { Track } from '~/models/playlist';

const props = defineProps<{
  tracks: Track[];
  playlistId: string;
  isLoading: boolean;
  hasMore: boolean;
  isOwner?: boolean;
}>();

const emit = defineEmits<{
  (e: 'play-track', track: Track): void;
  (e: 'remove-track', track: Track, index: number): void;
  (e: 'load-more'): void;
}>();

const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(
  loadMoreTrigger,
  (entries) => {
    const entry = entries[0];
    if (entry?.isIntersecting && !props.isLoading && props.hasMore) {
      emit('load-more');
    }
  },
  {
    threshold: 0.1,
    rootMargin: '500px',
  },
);

const handlePlayTrack = (track: Track) => {
  emit('play-track', track);
};

const handleRemoveTrack = (track: Track, index: number) => {
  emit('remove-track', track, index);
};
</script>

<template>
  <div>
    <div
      class="border-b border-white/10 mb-2 py-2 text-sm text-text-muted uppercase tracking-wider grid grid-cols-[16px_4fr_3fr_2fr_4rem] gap-4"
    >
      <span class="text-center">#</span>
      <span>Título</span>
      <span>Álbum</span>
      <span class="text-right pr-4">Adicionada em</span>
      <div class="flex justify-center w-12">
        <UIcon name="i-heroicons-clock" class="w-5 h-5" />
      </div>
    </div>

    <div class="space-y-1">
      <PlaylistTrackItem
        v-for="(track, index) in tracks"
        :key="track.id"
        :track="track"
        :index="index"
        :playlist-id="playlistId"
        :is-owner="isOwner"
        @play="handlePlayTrack"
        @remove="handleRemoveTrack"
      />
    </div>

    <div ref="loadMoreTrigger" class="flex justify-center w-full h-1">
      <div v-if="isLoading" class="space-y-1 w-full">
        <PlaylistTrackSkeleton v-for="i in 10" :key="`skeleton-more-${i}`" />
      </div>
    </div>
  </div>
</template>
