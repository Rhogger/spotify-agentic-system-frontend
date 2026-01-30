import type { Filters } from '~/models/filters';

export const useFilters = () => {
  const filters = useState<Filters>('sidebar-filters', () => ({
    energy: 50,
    danceability: 50,
    valence: 50,
    speechiness: 50,
    acousticness: 50,
    instrumentalness: 50,
    explicit: false,
    popular: false,
    decade: '2020s',
  }));

  return {
    filters,
  };
};
