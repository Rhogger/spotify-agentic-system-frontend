<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSpotifyPlayer } from '~/composables/useSpotifyPlayer';
import { usePlaylists } from '~/composables/usePlaylists';
import type { AgentTrack } from '~/models/agent';
import PlaylistSelectionModal from '~/components/dialogs/PlaylistSelectionModal.vue';

const props = defineProps<{
  track: AgentTrack;
}>();

const { play } = useSpotifyPlayer();
const {
  playlists,
  fetchPlaylists,
  addTracksToPlaylist,
  isLoading: isPlaylistsLoading,
} = usePlaylists();
const toast = useToast();
const isAdding = ref(false);
const isModalOpen = ref(false);

const artistName = computed(() => {
  const artists = props.track.artists as any;

  if (Array.isArray(artists)) return artists.join(', ');

  try {
    const parsed = JSON.parse(String(artists).replace(/'/g, '"'));

    return Array.isArray(parsed) ? parsed.join(', ') : String(artists);
  } catch (e) {
    return String(artists);
  }
});

function handlePlay() {
  play({ uris: [`spotify:track:${props.track.spotify_id}`] });
}

async function handleAddToPlaylist(playlistId: string | number) {
  isAdding.value = true;
  try {
    const res = await addTracksToPlaylist(String(playlistId), {
      track_ids: [props.track.spotify_id],
    });

    if (res?.success) {
      toast.add({
        title: 'Sucesso!',
        description: 'Música adicionada à playlist.',
        color: 'success',
        icon: 'i-heroicons-check-circle',
      });
      isModalOpen.value = false;
    } else {
      throw new Error('Falha ao adicionar');
    }
  } catch (e) {
    toast.add({
      title: 'Erro',
      description: 'Não foi possível adicionar a música.',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    });
  } finally {
    isAdding.value = false;
  }
}

const openModal = () => {
  isModalOpen.value = true;
  if (playlists.value.length === 0) {
    fetchPlaylists();
  }
};

const handleLoadMore = () => {
  fetchPlaylists(true);
};
</script>

<template>
  <div
    class="flex items-center gap-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 w-full"
  >
    <div
      class="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-highlight flex items-center justify-center relative shadow-md"
      @click="handlePlay"
    >
      <img
        v-if="props.track.image_url"
        :src="props.track.image_url"
        class="w-full h-full object-cover"
      />
      <UIcon
        v-else
        name="i-heroicons-musical-note"
        class="w-6 h-6 text-text-dim"
      />
    </div>

    <div class="flex-1 min-w-0" @click="handlePlay">
      <p
        class="text-sm font-bold text-text-main truncate hover:text-primary transition-colors cursor-pointer"
      >
        {{ props.track.name }}
      </p>
      <p class="text-xs text-text-dim truncate mt-0.5">
        {{ artistName }}
      </p>
    </div>

    <div class="flex items-center gap-2 shrink-0 px-1">
      <UButton
        variant="ghost"
        color="neutral"
        class="w-9 h-9 rounded-full flex items-center justify-center p-0 border-2 border-white/20 hover:border-white hover:scale-105 transition-all text-white/50 hover:text-white"
        title="Adicionar à playlist"
        :loading="isAdding"
        @click="openModal"
      >
        <UIcon v-if="!isAdding" name="i-heroicons-plus" class="w-5 h-5" />
      </UButton>

      <UButton
        variant="solid"
        color="primary"
        icon="i-heroicons-play-20-solid"
        size="md"
        class="rounded-full shadow-lg bg-primary text-black hover:bg-white hover:scale-110 active:scale-95 transition-all p-2.5"
        @click="handlePlay"
      />
    </div>

    <PlaylistSelectionModal
      v-model="isModalOpen"
      :playlists="playlists"
      :loading="isPlaylistsLoading"
      @select="handleAddToPlaylist"
      @load-more="handleLoadMore"
    />
  </div>
</template>
