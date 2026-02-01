import { ref } from 'vue';
import type {
  Playlist,
  PlaylistsMCPResponse,
  PlaylistDetailMCPResponse,
  SpotifyPlaylist,
} from '~/models/playlist';
import { getApi } from '~/services/api';
import { useAuth } from '~/composables/useAuth';

const playlists = ref<Playlist[]>([]);
const currentPlaylist = ref<Playlist | null>(null);
const isLoading = ref(false);
const isInitialized = ref(false);

const playlistsPagination = ref({
  offset: 0,
  limit: 50,
  hasMore: true,
});

export const usePlaylists = () => {
  const { token } = useAuth();

  const selectPlaylist = (playlist: Playlist) => {
    currentPlaylist.value = playlist;
  };

  const selectPlaylistById = (id: string | number) => {
    const found = playlists.value.find((p) => String(p.id) === String(id));
    if (found) {
      currentPlaylist.value = found;
    }
  };

  const fetchPlaylists = async (loadMore = false) => {
    if (!token.value) return;
    if (isLoading.value) return;
    if (loadMore && !playlistsPagination.value.hasMore) return;

    if (!loadMore) {
      if (isInitialized.value && playlists.value.length > 0) {
        return;
      } else if (!isInitialized.value) {
        playlistsPagination.value.offset = 0;
        playlistsPagination.value.hasMore = true;
      }
    } else {
      if (!isInitialized.value) return;
    }

    const api = getApi();
    isLoading.value = true;

    try {
      const { limit, offset } = playlistsPagination.value;
      const currentOffset = loadMore ? offset : 0;

      const { data } = await api.get<PlaylistsMCPResponse>(
        `/playlists/?md=false&json=true&limit=${limit}&offset=${currentOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      const items = data.json?.items || [];
      const next = data.json?.next;
      const total = data.json?.total ?? 0;

      const newPlaylists = items.map((item: SpotifyPlaylist) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        count: `${item.tracks?.total || 0} músicas`,
        type: 'Playlist',
        image: item.images?.[0]?.url,
        icon: !item.images?.length ? 'i-heroicons-musical-note' : undefined,
        color: item.primary_color || '#282828',
        owner_name: item.owner?.display_name,
      }));

      const nextOffset = currentOffset + items.length;

      if (loadMore) {
        const ids = new Set(playlists.value.map((p) => p.id));
        const unique = newPlaylists.filter((p) => !ids.has(p.id));

        if (unique.length > 0) {
          playlists.value.push(...unique);
        }
        playlistsPagination.value.offset = nextOffset;
      } else {
        playlists.value = newPlaylists;
        playlistsPagination.value.offset = nextOffset;
      }

      playlistsPagination.value.hasMore =
        !!next && items.length > 0 && playlists.value.length < total;
      isInitialized.value = true;
    } catch (error) {
      console.error('Failed to fetch playlists', error);
    } finally {
      isLoading.value = false;
    }
  };

  const getPlaylist = async (playlistId: string) => {
    if (!token.value) return;
    isLoading.value = true;
    const api = getApi();

    try {
      const { data } = await api.get<PlaylistDetailMCPResponse>(
        `/playlists/${playlistId}?calculate_duration=true`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      if (data.json) {
        const detail = data.json;
        currentPlaylist.value = {
          id: detail.id,
          name: detail.name,
          description: detail.description,
          count: `${detail.total_tracks} músicas`,
          type: 'Playlist',
          image: detail.image,
          icon: !detail.image ? 'i-heroicons-musical-note' : undefined,
          owner_name: detail.owner,
          formatted_duration: detail.formatted_duration,
          color: detail.primary_color,
        };
      }
    } catch (error) {
      console.error('Failed to fetch playlist details', error);
      currentPlaylist.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    playlists,
    currentPlaylist,
    fetchPlaylists,
    selectPlaylist,
    selectPlaylistById,
    getPlaylist,
    isLoading,
    playlistsPagination,
  };
};
