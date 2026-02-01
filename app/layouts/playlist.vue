<script setup lang="ts">
const { isPlayerVisible } = usePlayerState();
const { currentTrack } = useSpotifyPlayer();
const hasPlayer = computed(() => isPlayerVisible.value || !!currentTrack.value);
</script>

<template>
  <div
    class="flex flex-col h-full w-full overflow-hidden bg-background text-text-main"
  >
    <AppHeader />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar
        hide-filters
        no-accordion
        class="transition-[padding] duration-500 ease-in-out"
        :class="{ 'pb-24': hasPlayer }"
      />

      <UMain
        class="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-background transition-[padding] duration-500 ease-in-out"
        :class="{ 'pb-24': hasPlayer }"
      >
        <slot />
      </UMain>
    </div>

    <AppDrawer />
    <AppChatFab />
  </div>
</template>
