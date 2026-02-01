import { ref } from 'vue';
import type {
  Playlist,
  PlaylistsMCPResponse,
  PlaylistDetailMCPResponse,
  SpotifyPlaylist,
  CreatePlaylistInput,
  AddTracksInput,
  RemoveTracksInput,
  PlaylistOperationResponse,
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
  const { token, user } = useAuth();

  const selectPlaylist = (playlist: Playlist) => {
    currentPlaylist.value = playlist;
  };

  const selectPlaylistById = (id: string | number) => {
    const found = playlists.value.find((p) => String(p.id) === String(id));
    if (found) {
      currentPlaylist.value = found;
    }
  };

  const fetchPlaylists = async (loadMore = false, force = false) => {
    if (!token.value) return;
    if (isLoading.value) return;
    if (loadMore && !playlistsPagination.value.hasMore) return;

    if (!loadMore && !force) {
      if (isInitialized.value && playlists.value.length > 0) {
        return;
      } else if (!isInitialized.value) {
        playlistsPagination.value.offset = 0;
        playlistsPagination.value.hasMore = true;
      }
    } else if (!loadMore && force) {
      playlistsPagination.value.offset = 0;
      playlistsPagination.value.hasMore = true;
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
        owner_id: item.owner?.id,
        total_tracks: item.tracks?.total || 0,
        snapshot_id: item.snapshot_id,
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
        const playlistData: Playlist = {
          id: detail.id,
          name: detail.name,
          description: detail.description,
          count: `${detail.total_tracks} músicas`,
          type: 'Playlist',
          image: detail.image,
          icon: !detail.image ? 'i-heroicons-musical-note' : undefined,
          owner_name: detail.owner,
          owner_image: user.value?.spotify_profile?.images?.[0]?.url || null,
          formatted_duration: detail.formatted_duration,
          color: detail.primary_color,
          privacy: detail.privacy === 'Public' ? 'Public' : 'Private',
          snapshot_id: detail.snapshot_id,
          total_tracks: detail.total_tracks,
        };

        currentPlaylist.value = playlistData;

        const index = playlists.value.findIndex(
          (p) => String(p.id) === String(detail.id),
        );
        if (index !== -1) {
          playlists.value[index] = {
            ...playlists.value[index],
            ...playlistData,
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch playlist details', error);
      currentPlaylist.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const createPlaylist = async (
    input: CreatePlaylistInput,
  ): Promise<PlaylistOperationResponse | null> => {
    if (!token.value) return null;

    const api = getApi();
    isLoading.value = true;

    try {
      const payload = {
        ...input,
        description: input.description || '',
      };

      const { data } = await api.post<PlaylistOperationResponse>(
        '/playlists/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      if (data.success && data.playlist_id) {
        const newPlaylist: Playlist = {
          id: data.playlist_id,
          name: input.name,
          description: input.description || null,
          count: '0 músicas',
          total_tracks: 0,
          type: 'Playlist',
          icon: 'i-heroicons-musical-note',
          color: '#282828',
          owner_id: user.value?.spotify_id,
          owner_name: user.value?.display_name,
        };
        playlists.value.unshift(newPlaylist);

        fetchPlaylists(false, true);
      }

      return data;
    } catch (error) {
      console.error('Failed to create playlist', error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const unfollowPlaylist = async (
    playlistId: string,
  ): Promise<PlaylistOperationResponse | null> => {
    if (!token.value) return null;

    const api = getApi();

    try {
      const { data } = await api.delete<PlaylistOperationResponse>(
        `/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      if (data.success) {
        playlists.value = playlists.value.filter(
          (p) => String(p.id) !== playlistId,
        );
      }

      return data;
    } catch (error) {
      console.error('Failed to unfollow playlist', error);
      return null;
    }
  };

  const followPlaylist = async (
    playlistId: string,
  ): Promise<PlaylistOperationResponse | null> => {
    if (!token.value) return null;

    const api = getApi();

    try {
      const { data } = await api.post<PlaylistOperationResponse>(
        `/playlists/${playlistId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      if (data.success && currentPlaylist.value) {
        const newPlaylist: Playlist = {
          ...currentPlaylist.value,
          id: playlistId,
        };
        playlists.value.unshift(newPlaylist);
      }

      return data;
    } catch (error) {
      console.error('Failed to follow playlist', error);
      return null;
    }
  };

  const getUserImage = () => {
    return user.value?.spotify_profile?.images?.[0]?.url || null;
  };

  const isPlaylistInLibrary = (playlistId: string | number) => {
    return playlists.value.some((p) => String(p.id) === String(playlistId));
  };

  const addTracksToPlaylist = async (
    playlistId: string,
    input: AddTracksInput,
  ): Promise<PlaylistOperationResponse | null> => {
    if (!token.value) return null;

    const api = getApi();

    try {
      const uniqueTrackIds = Array.from(new Set(input.track_ids));
      const payload = { ...input, track_ids: uniqueTrackIds };

      const { data } = await api.post<PlaylistOperationResponse>(
        `/playlists/${playlistId}/tracks`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      if (data.success) {
        getPlaylist(playlistId);
      }

      return data;
    } catch (error) {
      console.error('Failed to add tracks to playlist', error);
      return null;
    }
  };
 
  const removeTracksFromPlaylist = async (
    playlistId: string,
    input: RemoveTracksInput,
  ): Promise<PlaylistOperationResponse | null> => {
    if (!token.value) return null;

    const api = getApi();

    try {
      const { data } = await api.delete<PlaylistOperationResponse>(
        `/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          data: input,
        },
      );

      if (data.success) {
        getPlaylist(playlistId);
      }

      return data;
    } catch (error) {
      console.error('Failed to remove tracks from playlist', error);
      return null;
    }
  };

  return {
    playlists,
    currentPlaylist,
    fetchPlaylists,
    selectPlaylist,
    selectPlaylistById,
    getPlaylist,
    createPlaylist,
    followPlaylist,
    unfollowPlaylist,
    addTracksToPlaylist,
    removeTracksFromPlaylist,
    isPlaylistInLibrary,
    getUserImage,
    isLoading,
    playlistsPagination,
  };
};
