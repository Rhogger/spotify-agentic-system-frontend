<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import AppSkeleton from '~/components/skeletons/AppSkeleton.vue';

const { user, fetchUser, token } = useAuth();
const { isPlayerVisible } = usePlayerState();
const { currentTrack } = useSpotifyPlayer();
const isReady = ref(false);

const hasPlayer = computed(() => isPlayerVisible.value || !!currentTrack.value);

onMounted(async () => {
  if (token.value) {
    await fetchUser();
  }
  isReady.value = true;
});
</script>

<template>
  <AppSkeleton v-if="!isReady" />
  <div
    v-else
    class="flex flex-col h-full w-full overflow-hidden bg-background text-text-main"
  >
    <AppHeader />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar
        class="transition-[padding] duration-500 ease-in-out"
        :class="{ 'pb-24': hasPlayer }"
      />

      <UMain
        class="flex-1 overflow-hidden relative transition-[padding] duration-500 ease-in-out"
        :class="{ 'pb-24': hasPlayer }"
      >
        <slot />
      </UMain>
    </div>

    <AppDrawer />
    <AppChatFab />
  </div>
</template>
