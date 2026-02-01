<script setup lang="ts">
import { ref, onMounted, computed, resolveComponent, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { primaryButton } from '~/binds/buttons';
import { dashedCard } from '~/binds/cards';
import { usePlaylists } from '~/composables/usePlaylists';

import { useAuth } from '~/composables/useAuth';

const props = defineProps<{
  infiniteScroll?: boolean;
}>();

const { playlists, fetchPlaylists, isLoading, playlistsPagination } =
  usePlaylists();
const { token } = useAuth();

const isModalOpen = ref(false);
const newPlaylistName = ref('');
const addRecommendations = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const Wrapper = computed(() =>
  props.infiniteScroll ? resolveComponent('UScrollArea') : 'div',
);

watch(
  token,
  (newToken) => {
    if (newToken) {
      fetchPlaylists();
    }
  },
  { immediate: true },
);

useIntersectionObserver(
  loadMoreTrigger,
  (entries) => {
    const entry = entries[0];
    if (
      entry?.isIntersecting &&
      !isLoading.value &&
      playlistsPagination.value.hasMore
    ) {
      fetchPlaylists(true);
    }
  },
  {
    threshold: 0.1,
  },
);

function handleCreatePlaylist() {
  if (!newPlaylistName.value.trim()) return;

  const newId = playlists.value.length + 1;
  playlists.value.push({
    id: newId,
    name: newPlaylistName.value,
    count: '0 músicas',
    type: 'Playlist',
    icon: 'i-heroicons-musical-note',
    color: '#282828',
  });

  isModalOpen.value = false;
  newPlaylistName.value = '';
  addRecommendations.value = false;
}
</script>

<template>
  <component :is="Wrapper" class="flex flex-col h-full">
    <div class="space-y-1 p-2">
      <UCard
        v-bind="dashedCard"
        tabindex="0"
        role="button"
        class="cursor-pointer"
        @click="isModalOpen = true"
        @keydown.enter="isModalOpen = true"
        @keydown.space.prevent="isModalOpen = true"
      >
        <div
          class="w-12 h-12 flex items-center justify-center bg-surface-elevated rounded-md group-hover:bg-white/10 transition-colors"
        >
          <UIcon
            name="i-heroicons-plus"
            class="w-6 h-6 text-text-muted group-hover:text-white transition-colors"
          />
        </div>

        <span
          class="font-medium text-text-muted group-hover:text-white transition-colors"
        >
          Criar Playlist
        </span>
      </UCard>

      <div
        v-if="(isLoading || !token) && playlists.length === 0"
        class="space-y-1"
      >
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-3 p-2 rounded-md"
        >
          <USkeleton class="w-12 h-12 rounded-md bg-white/5" />

          <div class="flex-1 space-y-2">
            <USkeleton class="h-4 w-3/4 bg-white/5" />
            <USkeleton class="h-3 w-1/2 bg-white/5" />
          </div>
        </div>
      </div>

      <template v-else>
        <PlaylistCard
          v-for="playlist in playlists"
          :key="playlist.id"
          v-bind="playlist"
        />

        <div ref="loadMoreTrigger" class="flex justify-center py-2 min-h-4">
          <UIcon
            v-if="isLoading && playlists.length > 0"
            name="i-heroicons-arrow-path"
            class="w-5 h-5 animate-spin text-text-muted"
          />
        </div>
      </template>
    </div>

    <BaseModal
      v-model="isModalOpen"
      title="Criar playlist"
      @close="isModalOpen = false"
    >
      <div class="space-y-6">
        <div class="space-y-2">
          <label
            class="block text-xs font-bold text-text-muted uppercase tracking-wider"
          >
            Nome
          </label>

          <UInput
            v-model="newPlaylistName"
            placeholder="Minha playlist"
            class="w-full"
            variant="none"
            :ui="{
              base: 'bg-white/5 text-text-main border-transparent focus:ring-1 focus:ring-primary placeholder-text-dim rounded-md px-3 py-2',
            }"
          />
        </div>

        <UCheckbox
          v-model="addRecommendations"
          label="Adicionar músicas recomendadas"
          color="primary"
          class="cursor-pointer"
          :ui="{
            label: 'text-text-main cursor-pointer',
            base: 'cursor-pointer',
          }"
        />
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            v-bind="primaryButton"
            label="Criar"
            class="px-6"
            @click="handleCreatePlaylist"
          />
        </div>
      </template>
    </BaseModal>
  </component>
</template>
