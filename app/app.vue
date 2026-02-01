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

const { fetchUser, token } = useAuth();

const route = useRoute();

onMounted(() => {
  if (route.path !== '/') {
    fetchUser();
  }
});
</script>

<template>
  <UApp>
    <div
      class="flex flex-col h-screen overflow-hidden bg-background text-foreground"
    >
      <div class="flex-1 overflow-hidden relative min-h-0">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>

      <div class="shrink-0 z-50">
        <AppPlayer v-if="token" />
      </div>
    </div>
  </UApp>
</template>
