<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
});

import { useAuth } from '~/composables/useAuth';

const title = 'Spotify Recs with Playlist Management V2';
const description =
  'Spotify Agentic System - AI Powered Music Recommendations and Playlist Management';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
});

const { fetchUser } = useAuth();

const route = useRoute();

onMounted(() => {
  if (route.path !== '/') {
    fetchUser();
  }
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
