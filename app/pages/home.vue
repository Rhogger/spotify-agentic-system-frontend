<script setup lang="ts">
import HomeRecommendations from '~/components/home/HomeRecommendations.vue';
import HomeEmptyState from '~/components/home/HomeEmptyState.vue';
import HomeSkeleton from '~/components/home/HomeSkeleton.vue';
import { useRecommendations } from '~/composables/useRecommendations';

const { recommendations, isLoading, fetchRecommendations } =
  useRecommendations();
</script>

<template>
  <UPage class="h-full overflow-y-auto custom-scrollbar">
    <UPageBody class="p-8">
      <HomeSkeleton v-if="isLoading" />

      <HomeRecommendations
        v-else-if="recommendations.length > 0"
        :recommendations="recommendations"
      />

      <HomeEmptyState
        v-else
        :loading="isLoading"
        @generate="fetchRecommendations"
      />
    </UPageBody>
  </UPage>
</template>
