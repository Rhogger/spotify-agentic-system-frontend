<script setup lang="ts">
import { computed, watch } from 'vue';
import { usePlaylists } from '~/composables/usePlaylists';
import { usePlaylistTracks } from '~/composables/usePlaylistTracks';
import { useAuth } from '~/composables/useAuth';
import type { Track } from '~/models/playlist';
import PlaylistDetail from '~/components/playlist/PlaylistDetail.vue';
import PlaylistNotFound from '~/components/playlist/PlaylistNotFound.vue';

const route = useRoute();
const playlistId = route.params.id as string;

const { currentPlaylist, getPlaylist, isLoading } = usePlaylists();

const {
  tracks: currentPlaylistTracks,
  isLoading: isTracksLoading,
  pagination: tracksPagination,
  fetchTracks: fetchPlaylistTracks,
  removeTrackFromList,
} = usePlaylistTracks();

definePageMeta({
  layout: 'playlist',
});

const playlist = computed(() => currentPlaylist.value);
const { token } = useAuth();

watch(
  [() => playlistId, () => token.value],
  ([newId, newToken]) => {
    if (newId && newToken) {
      getPlaylist(newId);
      fetchPlaylistTracks(newId);
    }
  },
  { immediate: true },
);

const tracks = computed(() => currentPlaylistTracks.value);

const handlePlayTrack = (track: Track) => {
  console.log('Playing track', track);
};

const handleLoadMore = () => {
  fetchPlaylistTracks(playlistId, true);
};

const handleTrackRemoved = (track: Track) => {
  getPlaylist(playlistId);
  removeTrackFromList(track.id);
};
</script>

<template>
  <PlaylistSkeleton v-if="!playlist && (isLoading || !token)" />

  <PlaylistDetail
    v-else-if="playlist"
    :playlist="playlist"
    :tracks="tracks"
    :is-tracks-loading="isTracksLoading"
    :has-more-tracks="tracksPagination.hasMore"
    @play-track="handlePlayTrack"
    @load-more="handleLoadMore"
    @track-removed="handleTrackRemoved"
  />

  <PlaylistNotFound v-else />
</template>
