import { ref } from 'vue';
import type { Playlist, SpotifyPlaylist } from '~/models/playlist';
import { getApi } from '~/services/api';
import { useAuth } from '~/composables/useAuth';

const playlists = ref<Playlist[]>([]);
const isLoading = ref(false);
const isInitialized = ref(false);

export const usePlaylists = () => {
  const { token } = useAuth();

  const fetchPlaylists = async (force = false) => {
    if ((isInitialized.value && !force) || isLoading.value) return;

    if (!token.value) return;

    const api = getApi();
    isLoading.value = true;

    try {
      const { data } = await api.get<
        SpotifyPlaylist[] | { items: SpotifyPlaylist[] }
      >('/playlists/', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      const items = Array.isArray(data) ? data : data.items || [];

      playlists.value = items.map((item) => ({
        id: item.id,
        name: item.name,
        count: `${item.tracks?.total || 0} músicas`,
        type: 'Playlist',
        image: item.images?.[0]?.url,
        icon: !item.images?.length ? 'i-heroicons-musical-note' : undefined,
        color: !item.images?.length ? 'bg-[#282828]' : undefined,
      }));

      isInitialized.value = true;
    } catch (error) {
      console.error('Failed to fetch playlists', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    playlists,
    fetchPlaylists,
    isLoading,
  };
};
