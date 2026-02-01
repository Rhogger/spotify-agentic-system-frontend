<script setup lang="ts">
import { ref, computed } from 'vue';
import { iconButton, ghostButton } from '~/binds/buttons';
import type { Playlist, Track } from '~/models/playlist';
import { usePlaylists } from '~/composables/usePlaylists';

const props = defineProps<{
  playlist: Playlist;
  tracks: Track[];
  isTracksLoading: boolean;
  hasMoreTracks: boolean;
}>();

const emit = defineEmits<{
  (e: 'play-track', track: Track): void;
  (e: 'load-more'): void;
  (e: 'unfollowed'): void;
  (e: 'followed'): void;
  (e: 'track-removed', track: Track): void;
}>();

const {
  followPlaylist,
  unfollowPlaylist,
  removeTracksFromPlaylist,
  playlists,
  isPlaylistInLibrary,
} = usePlaylists();
const { user } = useAuth();

const isShuffleActive = ref(false);
const isUnfollowModalOpen = ref(false);
const isUnfollowing = ref(false);
const isFollowingLoading = ref(false);
const isRemoveTrackModalOpen = ref(false);
const isRemovingTrack = ref(false);
const trackToRemove = ref<Track | null>(null);
const trackIndexToRemove = ref<number | null>(null);

const isFollowing = computed(() => {
  return isPlaylistInLibrary(props.playlist.id);
});

const isOwner = computed(() => {
  const p = playlists.value.find(
    (p) => String(p.id) === String(props.playlist.id),
  );
  return p?.owner_id === user.value?.spotify_id;
});

const handlePlayTrack = (track: Track) => {
  emit('play-track', track);
};

const handleLoadMore = () => {
  emit('load-more');
};

const handleUnfollow = async () => {
  isUnfollowing.value = true;
  const result = await unfollowPlaylist(String(props.playlist.id));
  isUnfollowing.value = false;

  if (result?.success) {
    isUnfollowModalOpen.value = false;
    emit('unfollowed');
  }
};

const handleFollow = async () => {
  isFollowingLoading.value = true;
  const result = await followPlaylist(String(props.playlist.id));
  isFollowingLoading.value = false;

  if (result?.success) {
    emit('followed');
  }
};

const openRemoveTrackModal = (track: Track, index: number) => {
  trackToRemove.value = track;
  trackIndexToRemove.value = index;
  isRemoveTrackModalOpen.value = true;
};

const handleRemoveTrack = async () => {
  if (!trackToRemove.value) return;

  isRemovingTrack.value = true;
  const result = await removeTracksFromPlaylist(String(props.playlist.id), {
    track_ids: [String(trackToRemove.value.id)],
    snapshot_id: props.playlist.snapshot_id,
    positions:
      trackIndexToRemove.value !== null
        ? [trackIndexToRemove.value]
        : undefined,
  });
  isRemovingTrack.value = false;

  if (result?.success) {
    isRemoveTrackModalOpen.value = false;
    emit('track-removed', trackToRemove.value);
    trackToRemove.value = null;
    trackIndexToRemove.value = null;
  }
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

    <PlaylistInfo :playlist="playlist" />

    <div class="bg-black/20 backdrop-blur-3xl">
      <PlaylistPlayerController
        :playlist="playlist"
        :is-following="isFollowing"
        :is-following-loading="isFollowingLoading"
        :is-shuffle-active="isShuffleActive"
        @toggle-shuffle="isShuffleActive = !isShuffleActive"
        @follow="handleFollow"
        @unfollow="isUnfollowModalOpen = true"
        @play="() => {}"
      />

      <div class="px-6 pb-2">
        <PlaylistDetailTracksSkeleton
          v-if="isTracksLoading && tracks.length === 0"
        />

        <PlaylistTracks
          v-else-if="tracks.length > 0"
          :tracks="tracks"
          :playlist-id="String(playlist.id)"
          :is-loading="isTracksLoading"
          :is-owner="isOwner"
          :has-more="hasMoreTracks"
          @play-track="handlePlayTrack"
          @remove-track="openRemoveTrackModal"
          @load-more="handleLoadMore"
        />

        <PlaylistEmptyState v-else />
      </div>
    </div>

    <PlaylistUnfollowModal
      v-model="isUnfollowModalOpen"
      :playlist-name="playlist.name"
      :loading="isUnfollowing"
      @confirm="handleUnfollow"
    />

    <PlaylistRemoveTrackModal
      v-model="isRemoveTrackModalOpen"
      :track-title="trackToRemove?.title"
      :loading="isRemovingTrack"
      @confirm="handleRemoveTrack"
    />
  </UPage>
</template>
