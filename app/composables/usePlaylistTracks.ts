import { ref } from 'vue';
import type {
  PlaylistTracksMCPResponse,
  SpotifyPlaylistTrack,
  Track,
} from '~/models/playlist';
import { getApi } from '~/services/api';
import { useAuth } from '~/composables/useAuth';

export const usePlaylistTracks = () => {
  const { token } = useAuth();

  const tracks = ref<Track[]>([]);
  const isLoading = ref(false);
  const pagination = ref({
    offset: 0,
    limit: 10,
    hasMore: true,
  });

  const fetchTracks = async (playlistId: string, loadMore = false) => {
    if (!token.value) return;
    if (isLoading.value) return;
    if (loadMore && !pagination.value.hasMore) return;

    if (!loadMore) {
      pagination.value.offset = 0;
      pagination.value.hasMore = true;
      tracks.value = [];
    }

    const api = getApi();
    isLoading.value = true;

    try {
      const { limit, offset } = pagination.value;
      const currentOffset = loadMore ? offset : 0;

      const url = `/tracks/playlist/${playlistId}?md=false&json=true&limit=${limit}&offset=${currentOffset}`;

      const { data } = await api.get<PlaylistTracksMCPResponse>(url, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      const items = data.json?.items || [];
      const next = data.json?.next;

      const newTracks = items.map((item: SpotifyPlaylistTrack) => {
        const ms = item.track.duration_ms;
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000)
          .toString()
          .padStart(2, '0');

        return {
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists.map((a) => a.name).join(', '),
          album: item.track.album.name,
          duration: `${minutes}:${seconds}`,
          addedAt: new Date(item.added_at).toLocaleDateString(),
          image: item.track.album.images?.[0]?.url,
        };
      });

      if (loadMore) {
        tracks.value.push(...newTracks);
        pagination.value.offset += items.length;
      } else {
        tracks.value = newTracks;
        pagination.value.offset = items.length;
      }

      pagination.value.hasMore = !!next;
    } catch (error) {
      console.error('Failed to fetch playlist tracks', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tracks,
    isLoading,
    pagination,
    fetchTracks,
  };
};
