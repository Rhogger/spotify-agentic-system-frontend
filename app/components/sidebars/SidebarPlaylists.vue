<script setup lang="ts">
import { ref, computed, resolveComponent, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { dashedCard } from '~/binds/cards';
import { usePlaylists } from '~/composables/usePlaylists';
import { useAuth } from '~/composables/useAuth';

const props = defineProps<{
  infiniteScroll?: boolean;
}>();

const {
  playlists,
  fetchPlaylists,
  createPlaylist,
  isLoading,
  playlistsPagination,
} = usePlaylists();
const { token } = useAuth();

const isModalOpen = ref(false);
const isCreating = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const toast = useToast();

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

async function handleCreatePlaylist(data: {
  name: string;
  description: string;
  public: boolean;
}) {
  isCreating.value = true;

  const result = await createPlaylist({
    name: data.name,
    description: data.description || undefined,
    public: data.public,
  });

  isCreating.value = false;

  if (result?.success) {
    toast.add({
      title: 'Sucesso',
      description: 'Playlist criada com sucesso.',
      color: 'success',
    });
    isModalOpen.value = false;
  } else {
    toast.add({
      title: 'Erro',
      description: 'Falha ao criar playlist.',
      color: 'error',
    });
  }
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

      <SidebarPlaylistsSkeleton
        v-if="(isLoading || !token) && playlists.length === 0"
      />

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

    <PlaylistCreateModal
      v-model="isModalOpen"
      :loading="isCreating"
      @create="handleCreatePlaylist"
    />
  </component>
</template>
