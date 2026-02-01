<script setup lang="ts">
import MusicCardSkeleton from '~/components/cards/MusicCardSkeleton.vue';
</script>

<template>
  <div>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
    >
      <div class="h-8 w-48 bg-surface-highlight rounded animate-pulse"></div>
      <div
        class="h-9 w-32 rounded-full bg-surface-highlight animate-pulse"
      ></div>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto max-w-screen-2xl"
    >
      <MusicCardSkeleton v-for="i in 10" :key="i" />
    </div>
  </div>
</template>
