<script setup lang="ts">
// AppHeader Component
</script>

<template>
  <header
    class="h-16 shrink-0 border-b border-[var(--color-border)] flex items-center px-4 bg-[var(--color-background)]/75 backdrop-blur-md z-20"
  >
    <div class="flex items-center gap-2">
      <UIcon
        name="i-heroicons-musical-note"
        class="w-8 h-8 text-[var(--color-primary)]"
      />
      <div
        class="font-bold text-xl tracking-tight text-[var(--color-text-main)]"
      >
        Spotify Agentic
      </div>
    </div>

    <div class="ml-auto flex items-center gap-2">
      <UButton
        icon="i-heroicons-bell"
        color="neutral"
        variant="ghost"
        class="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
      />
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="User"
        size="sm"
        class="ring-2 ring-[var(--color-primary)]"
      />
    </div>
  </header>
</template>
