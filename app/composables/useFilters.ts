import type { Filters } from '~/models/filters';

export const useFilters = () => {
  const filters = useCookie<Filters>('sidebar-filters', {
    default: () => ({
      energy: 50,
      danceability: 50,
      valence: 50,
      acousticness: 50,
      explicit: false,
      popular: false,
      decade: '2020s',
    }),
    maxAge: 60 * 60 * 24 * 365,
  });

  return {
    filters,
  };
};
