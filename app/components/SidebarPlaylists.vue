<script setup lang="ts">
import { ref } from 'vue';
import { primaryButton } from '~/binds/buttons';
import { dashedCard } from '~/binds/cards';
import { usePlaylists } from '~/composables/usePlaylists';

const { playlists } = usePlaylists();
const isModalOpen = ref(false);
const newPlaylistName = ref('');
const addRecommendations = ref(false);

function handleCreatePlaylist() {
  if (!newPlaylistName.value.trim()) return;

  const newId = playlists.value.length + 1;
  playlists.value.push({
    id: newId,
    name: newPlaylistName.value,
    count: '0 músicas',
    type: 'Playlist',
    icon: 'i-heroicons-musical-note',
    color: 'bg-[#282828]',
  });

  isModalOpen.value = false;
  newPlaylistName.value = '';
  addRecommendations.value = false;
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="space-y-1 p-2">
      <UCard
        v-bind="dashedCard"
        tabindex="0"
        role="button"
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
          >Criar Playlist</span
        >
      </UCard>

      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        v-bind="playlist"
      />
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
          :ui="{ label: 'text-text-main' }"
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
  </div>
</template>
