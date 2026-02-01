import { ref } from 'vue';
import type {
  Track,
  RecommendationPayload,
  RecommendationResponse,
} from '~/models/track';
import { useFilters } from './useFilters';
import { getApi } from '~/services/api';
import { useAuth } from './useAuth';

const recommendations = ref<Track[]>([]);
const isLoading = ref(false);

export const useRecommendations = () => {
  const { filters } = useFilters();
  const { token } = useAuth();

  const fetchRecommendations = async () => {
    if (!token.value) {
      console.warn('No auth token found');
      return;
    }

    isLoading.value = true;
    recommendations.value = [];
    const api = getApi();

    const payload: RecommendationPayload = {
      energy: filters.value.energy / 100,
      danceability: filters.value.danceability / 100,
      valence: filters.value.valence / 100,
      acousticness: filters.value.acousticness / 100,
      is_popular: filters.value.popular,
      explicit: filters.value.explicit,
      decade: filters.value.decade.replace('s', ''),
    };

    try {
      const { data } = await api.post<RecommendationResponse>(
        '/recommendations/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );

      recommendations.value = data.recommendations || [];
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    recommendations,
    isLoading,
    fetchRecommendations,
  };
};
