<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { iconButton } from '~/binds/buttons';
import type { Playlist, Track } from '~/models/playlist';

const props = defineProps<{
  playlist: Playlist;
  tracks: Track[];
  isTracksLoading: boolean;
  hasMoreTracks: boolean;
}>();

const emit = defineEmits<{
  (e: 'play-track', track: Track): void;
  (e: 'load-more'): void;
}>();

const isShuffleActive = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(
  loadMoreTrigger,
  (entries) => {
    const entry = entries[0];
    if (
      entry?.isIntersecting &&
      !props.isTracksLoading &&
      props.hasMoreTracks
    ) {
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
</script>

<template>
  <UPage
    class="h-full overflow-y-auto custom-scrollbar"
    :style="{
      background: `linear-gradient(to bottom, ${playlist.color || '#4f46e5'} 0%, var(--color-background) 100%)`,
    }"
  >
    <div class="p-6 pb-0">
      <UButton
        v-bind="iconButton"
        icon="i-heroicons-chevron-left"
        class="bg-black/40 hover:bg-black/60 backdrop-blur-md"
        title="Voltar"
        @click="navigateTo('/home')"
      />
    </div>

    <div class="flex items-end gap-6 p-6 pb-8 pt-4">
      <div
        class="w-52 h-52 shadow-2xl flex items-center justify-center rounded-md overflow-hidden bg-surface-elevated hover:scale-105 transition-transform duration-500"
      >
        <img
          v-if="playlist.image"
          :src="playlist.image"
          :alt="playlist.name"
          class="w-full h-full object-cover"
        />

        <UIcon
          v-else-if="playlist.icon"
          :name="playlist.icon"
          class="w-20 h-20 text-white drop-shadow-md"
        />

        <span v-else class="text-6xl font-black text-white">
          {{ playlist.name[0] }}
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <span
          class="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm"
        >
          Playlist
        </span>

        <h1
          class="text-6xl/tight font-black text-white tracking-tight drop-shadow-lg line-clamp-2"
        >
          {{ playlist.name }}
        </h1>

        <p
          v-if="playlist.description"
          class="text-white/80 text-sm max-w-2xl line-clamp-2 [&_a]:text-white [&_a]:font-bold [&_a]:underline hover:[&_a]:text-primary transition-colors"
          v-html="playlist.description"
        ></p>

        <div
          class="flex items-center gap-2 text-sm text-white/90 font-medium mt-2"
        >
          <UserAvatar
            v-if="playlist.owner_name"
            :initials="playlist.owner_name[0]"
            size="2xs"
          />

          <span class="hover:underline cursor-pointer font-bold">
            {{ playlist.owner_name || 'Spotify' }}
          </span>

          <span>•</span>

          <span> {{ playlist.count }} </span>

          <span v-if="playlist.formatted_duration">•</span>

          <span v-if="playlist.formatted_duration">
            {{ playlist.formatted_duration }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-black/20 backdrop-blur-3xl">
      <div class="px-6 py-6 flex items-center gap-6">
        <PlayButton size="xl" />

        <UButton
          variant="ghost"
          color="neutral"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative p-0"
          :class="[
            isShuffleActive
              ? 'text-primary'
              : 'text-text-muted hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary',
          ]"
          title="Ordem Aleatória"
          @click="isShuffleActive = !isShuffleActive"
        >
          <UIcon name="i-lucide-shuffle" class="w-6 h-6" />

          <div
            v-if="isShuffleActive"
            class="absolute bottom-0 w-1 h-1 bg-primary rounded-full"
          ></div>
        </UButton>
      </div>

      <div class="px-6 pb-2">
        <div v-if="isTracksLoading && tracks.length === 0" class="space-y-1">
          <div
            class="grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4 mb-4 py-2 border-b border-white/5"
          >
            <USkeleton class="h-4 w-4 bg-white/5 mx-auto" />
            <USkeleton class="h-4 w-24 bg-white/5" />
            <USkeleton class="h-4 w-24 bg-white/5" />
            <USkeleton class="h-4 w-20 bg-white/5 ml-auto mr-4" />
            <USkeleton class="h-5 w-5 bg-white/5 mx-auto" />
          </div>

          <PlaylistTrackSkeleton v-for="i in 10" :key="i" />
        </div>

        <div v-else-if="tracks.length > 0">
          <div
            class="border-b border-white/10 mb-2 py-2 text-sm text-text-muted uppercase tracking-wider grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4"
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
              @play="handlePlayTrack"
            />
          </div>

          <div ref="loadMoreTrigger" class="flex justify-center w-full h-1">
            <div v-if="isTracksLoading" class="space-y-1 w-full">
              <PlaylistTrackSkeleton
                v-for="i in 10"
                :key="`skeleton-more-${i}`"
              />
            </div>
          </div>
        </div>

        <div v-else class="text-text-muted text-center py-12">
          Não há músicas para exibir nesta playlist ainda.
        </div>
      </div>
    </div>
  </UPage>
</template>
