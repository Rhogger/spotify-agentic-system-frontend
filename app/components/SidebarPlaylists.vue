<script setup lang="ts">
import { ref } from "vue";
import { primaryButton, iconButton } from "~/binds/buttons";
import { baseTooltip } from "~/binds/tooltips";

const isModalOpen = ref(false);
const newPlaylistName = ref("");
const addRecommendations = ref(false);

const playlists = ref([
  {
    id: 1,
    name: "Músicas Curtidas",
    count: "142 músicas",
    type: "Playlist",
    icon: "i-heroicons-heart",
    gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  {
    id: 2,
    name: "Mix para Dirigir",
    count: "45 músicas",
    type: "Playlist",
    icon: "i-heroicons-musical-note",
    color: "bg-[#282828]",
  },
  {
    id: 3,
    name: "Treino Pesado",
    count: "28 músicas",
    type: "Playlist",
    icon: "i-heroicons-musical-note",
    color: "bg-[#282828]",
  },
  {
    id: 4,
    name: "Vibe Tranquila",
    count: "62 músicas",
    type: "Playlist",
    icon: "i-heroicons-musical-note",
    color: "bg-[#282828]",
  },
]);

function handleCreatePlaylist() {
  console.log(
    "Creating playlist:",
    newPlaylistName.value,
    addRecommendations.value,
  );
  isModalOpen.value = false;
  newPlaylistName.value = "";
  addRecommendations.value = false;
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-2 pl-2 pr-2">
      <div class="text-lg font-bold text-text-main flex items-center gap-2">
        <UIcon name="i-heroicons-book-open" class="w-5 h-5" />
        Sua Biblioteca
      </div>

      <UTooltip text="Criar nova playlist" v-bind="baseTooltip">
        <UButton
          v-bind="iconButton"
          icon="i-heroicons-plus"
          @click="isModalOpen = true"
        />
      </UTooltip>
    </div>

    <div class="flex-1 overflow-y-auto space-y-1 p-2 custom-scrollbar">
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
