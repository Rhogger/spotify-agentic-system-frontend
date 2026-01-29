import { ref } from 'vue';
import type { Playlist } from '~/models/playlist';

const playlists = ref<Playlist[]>([
  {
    id: 1,
    name: 'Músicas Curtidas',
    count: '142 músicas',
    type: 'Playlist',
    icon: 'i-heroicons-heart',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    name: 'Mix para Dirigir',
    count: '45 músicas',
    type: 'Playlist',
    icon: 'i-heroicons-musical-note',
    color: 'bg-[#282828]',
  },
  {
    id: 3,
    name: 'Treino Pesado',
    count: '28 músicas',
    type: 'Playlist',
    icon: 'i-heroicons-musical-note',
    color: 'bg-[#282828]',
  },
  {
    id: 4,
    name: 'Vibe Tranquila',
    count: '62 músicas',
    type: 'Playlist',
    icon: 'i-heroicons-musical-note',
    color: 'bg-[#282828]',
  },
]);

export const usePlaylists = () => {
  return {
    playlists,
  };
};
