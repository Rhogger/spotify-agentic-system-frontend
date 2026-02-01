<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import AppSkeleton from '~/components/skeletons/AppSkeleton.vue';

const { user, fetchUser, token } = useAuth();
const isReady = ref(false);

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
    class="flex flex-col h-screen w-full overflow-hidden bg-background text-text-main"
  >
    <AppHeader />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar />

      <UMain class="flex-1 overflow-hidden relative">
        <slot />
      </UMain>
    </div>

    <AppDrawer />
    <AppChatFab />
  </div>
</template>
