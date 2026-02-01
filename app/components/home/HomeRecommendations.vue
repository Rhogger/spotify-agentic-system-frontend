<script setup lang="ts">
import { ref } from 'vue';
import type { Track } from '~/models/track';
import { ghostButton } from '~/binds/buttons';
import MusicCard from '~/components/cards/MusicCard.vue';
import { usePlaylists } from '~/composables/usePlaylists';
import { useAuth } from '~/composables/useAuth';

const props = defineProps<{
  recommendations: Track[];
}>();

const {
  playlists,
  addTracksToPlaylist,
  fetchPlaylists,
  isLoading: isPlaylistsLoading,
} = usePlaylists();
const { user } = useAuth();

const myPlaylists = computed(() =>
  playlists.value.filter((p) => p.owner_id === user.value?.spotify_id),
);

const isPlaylistModalOpen = ref(false);
const isTrackSelectionModalOpen = ref(false);
const selectedPlaylistId = ref<string | null>(null);
const selectedTracksIds = ref<Set<string>>(new Set());
const isAddingTracks = ref(false);
const pendingTracksToAdd = ref<Track[]>([]);
const isSingleTrackAdd = ref(false);
const toast = useToast();

function openPlaylistSelection() {
  isSingleTrackAdd.value = false;
  if (playlists.value.length === 0) {
    fetchPlaylists();
  }
  pendingTracksToAdd.value = props.recommendations;
  isPlaylistModalOpen.value = true;
}

function handleAddToPlaylist(track: Track) {
  isSingleTrackAdd.value = true;
  if (playlists.value.length === 0) {
    fetchPlaylists();
  }
  pendingTracksToAdd.value = [track];
  isPlaylistModalOpen.value = true;
}

async function selectPlaylist(id: number | string) {
  selectedPlaylistId.value = String(id);

  if (isSingleTrackAdd.value) {
    isPlaylistModalOpen.value = false;
    const track = pendingTracksToAdd.value[0];

    if (track) {
      const result = await addTracksToPlaylist(String(id), {
        track_ids: [track.spotify_id],
      });

      if (result?.success) {
        toast.add({
          title: 'Sucesso',
          description: 'Música adicionada à playlist.',
          color: 'success',
        });
      } else {
        toast.add({
          title: 'Erro',
          description: 'Falha ao adicionar música.',
          color: 'error',
        });
      }
    }

    pendingTracksToAdd.value = [];
    selectedPlaylistId.value = null;
    isSingleTrackAdd.value = false;
  } else {
    isPlaylistModalOpen.value = false;
    selectedTracksIds.value = new Set(
      pendingTracksToAdd.value.map((t) => t.spotify_id),
    );
    isTrackSelectionModalOpen.value = true;
  }
}

async function confirmAddTracks() {
  if (!selectedPlaylistId.value || selectedTracksIds.value.size === 0) return;

  isAddingTracks.value = true;

  const result = await addTracksToPlaylist(selectedPlaylistId.value, {
    track_ids: Array.from(selectedTracksIds.value),
  });

  isAddingTracks.value = false;

  if (result?.success) {
    toast.add({
      title: 'Sucesso',
      description: `${selectedTracksIds.value.size} músicas adicionadas à playlist.`,
      color: 'success',
    });
    isTrackSelectionModalOpen.value = false;
    selectedPlaylistId.value = null;
    selectedTracksIds.value = new Set();
  }
}

function toggleTrack(spotifyId: string) {
  const trackId = spotifyId;
  if (selectedTracksIds.value.has(trackId)) {
    selectedTracksIds.value.delete(trackId);
  } else {
    selectedTracksIds.value.add(trackId);
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
        @add-to-playlist="handleAddToPlaylist"
      />
    </div>

    <PlaylistSelectionModal
      v-model="isPlaylistModalOpen"
      :playlists="myPlaylists"
      :loading="isPlaylistsLoading"
      @select="selectPlaylist"
      @load-more="fetchPlaylists(true)"
    />

    <TrackSelectionModal
      v-model="isTrackSelectionModalOpen"
      :recommendations="recommendations"
      :selected-ids="selectedTracksIds"
      :loading="isAddingTracks"
      @toggle="toggleTrack"
      @confirm="confirmAddTracks"
    />
  </div>
</template>
