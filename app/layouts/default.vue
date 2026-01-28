<script setup lang="ts">
// Authenticated Layout (Default)
</script>

<template>
  <div
    class="flex flex-col h-screen w-full overflow-hidden bg-[var(--color-background)] text-[var(--color-text-main)]"
  >
    <AppHeader />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar />

      <AppMain>
        <slot />
      </AppMain>

      <AppDrawer />
    </div>

    <AppPlayer />
  </div>
</template>
