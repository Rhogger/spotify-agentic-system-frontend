<script setup lang="ts">
import { ref } from 'vue';
import type { Track } from '~/models/track';
import { ghostButton, primaryButton } from '~/binds/buttons';
import MusicCard from '~/components/cards/MusicCard.vue';
import { usePlaylists } from '~/composables/usePlaylists';

const props = defineProps<{
  recommendations: Track[];
}>();

const { playlists } = usePlaylists();
const isPlaylistModalOpen = ref(false);
const isSongSelectionModalOpen = ref(false);
const selectedPlaylistId = ref<number | string | null>(null);
const selectedSongsIds = ref<Set<number>>(new Set());

function openPlaylistSelection() {
  isPlaylistModalOpen.value = true;
}

function selectPlaylist(id: number | string) {
  selectedPlaylistId.value = id;
  isPlaylistModalOpen.value = false;
  selectedSongsIds.value = new Set(props.recommendations.map((t) => t.id));
  isSongSelectionModalOpen.value = true;
}

function confirmAddSongs() {
  console.log(
    `Adicionando ${selectedSongsIds.value.size} músicas à playlist ${selectedPlaylistId.value}`,
  );
  isSongSelectionModalOpen.value = false;
  selectedPlaylistId.value = null;
}

function toggleSong(id: number) {
  if (selectedSongsIds.value.has(id)) {
    selectedSongsIds.value.delete(id);
  } else {
    selectedSongsIds.value.add(id);
  }
}
</script>

<template>
  <div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
    >
      <h2 class="text-2xl font-bold text-text-main">Músicas Recomendadas</h2>

      <UButton
        v-bind="ghostButton"
        icon="i-heroicons-plus-circle"
        label="Adicionar à playlist"
        class="px-4"
        @click="openPlaylistSelection"
      />
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto max-w-screen-2xl"
    >
      <MusicCard
        v-for="track in recommendations"
        :key="track.id"
        :track="track"
      />
    </div>

    <BaseModal v-model="isPlaylistModalOpen" title="Salvar na playlist">
      <div class="space-y-2">
        <p class="text-sm text-text-muted mb-4">
          Escolha em qual playlist você deseja salvar as recomendações.
        </p>
        <div class="grid gap-2">
          <button
            v-for="playlist in playlists"
            :key="playlist.id"
            class="flex items-center gap-4 p-3 rounded-md hover:bg-surface-highlight transition-colors text-left w-full group"
            @click="selectPlaylist(playlist.id)"
          >
            <div
              class="w-12 h-12 rounded flex items-center justify-center shrink-0 shadow-sm"
              :class="
                playlist.gradient || playlist.color || 'bg-surface-elevated'
              "
            >
              <UIcon
                v-if="playlist.icon"
                :name="playlist.icon"
                class="text-white w-6 h-6"
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
        </div>
      </div>
    </BaseModal>

    <BaseModal v-model="isSongSelectionModalOpen" title="Selecionar músicas">
      <div class="space-y-4">
        <p class="text-sm text-text-muted">
          Selecione quais músicas você deseja adicionar à playlist.
        </p>

        <div
          class="max-h-[400px] overflow-y-auto custom-scrollbar pr-2 space-y-2"
        >
          <div
            v-for="track in recommendations"
            :key="track.id"
            class="flex items-center gap-3 p-2 rounded-md hover:bg-surface-highlight transition-colors cursor-pointer"
            @click="toggleSong(track.id)"
          >
            <UCheckbox
              :model-value="selectedSongsIds.has(track.id)"
              color="primary"
              @click.stop="toggleSong(track.id)"
            />
            <img :src="track.image" class="w-10 h-10 rounded object-cover" />
            <div class="flex flex-col min-w-0">
              <span class="text-sm font-bold text-text-main truncate">{{
                track.title
              }}</span>
              <span class="text-xs text-text-muted truncate">{{
                track.artist
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            v-bind="ghostButton"
            label="Cancelar"
            @click="isSongSelectionModalOpen = false"
          />
          <UButton
            v-bind="primaryButton"
            :label="`Adicionar ${selectedSongsIds.size} músicas`"
            :disabled="selectedSongsIds.size === 0"
            class="text-black font-bold"
            @click="confirmAddSongs"
          />
        </div>
      </template>
    </BaseModal>
  </div>
</template>
