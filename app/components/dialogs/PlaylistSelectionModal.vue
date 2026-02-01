<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import type { Playlist } from '~/models/playlist';
import PlaylistImage from '~/components/playlist/PlaylistImage.vue';

const props = withDefaults(
  defineProps<{
    playlists: Playlist[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const emit = defineEmits<{
  (e: 'select', id: string | number): void;
  (e: 'load-more'): void;
}>();

const isOpen = defineModel<boolean>({ required: true });

const loadMoreTrigger = ref<HTMLElement | null>(null);
useIntersectionObserver(
  loadMoreTrigger,
  (entries) => {
    const entry = entries[0];
    if (entry?.isIntersecting) {
      emit('load-more');
    }
  },
  { threshold: 0.1 },
);
</script>

<template>
  <BaseModal v-model="isOpen" title="Salvar na playlist">
    <div class="space-y-2">
      <p class="text-sm text-text-muted mb-4">
        Escolha em qual playlist você deseja salvar as recomendações.
      </p>
      <div
        class="grid gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2"
      >
        <button
          v-for="playlist in playlists"
          :key="playlist.id"
          class="flex items-center gap-4 p-3 rounded-md hover:bg-surface-highlight transition-colors text-left w-full group"
          @click="emit('select', playlist.id)"
        >
          <div class="shrink-0">
            <PlaylistImage
              :src="playlist.image"
              :alt="playlist.name"
              size="sm"
            />
          </div>

          <div class="flex flex-col min-w-0">
            <span
              class="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors"
            >
              {{ playlist.name }}
            </span>
            <span class="text-xs text-text-muted">
              {{ playlist.count }}
            </span>
          </div>
        </button>

        <div ref="loadMoreTrigger" class="h-4 w-full flex justify-center">
          <UIcon
            v-if="!!loading"
            name="i-heroicons-arrow-path"
            class="animate-spin"
          />
        </div>
      </div>
    </div>
  </BaseModal>
</template>
