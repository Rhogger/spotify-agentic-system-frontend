<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col h-screen w-full overflow-hidden bg-background text-text-main"
  >
    <AppHeader />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar />

      <UMain class="flex-1 overflow-hidden relative">
        <slot />
      </UMain>
    </div>

    <!-- <AppPlayer /> -->
    <AppDrawer />
    <AppChatFab />
  </div>
</template>
