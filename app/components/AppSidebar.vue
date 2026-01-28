<script setup lang="ts">
// AppSidebar Component
</script>

<template>
  <aside
    class="w-64 flex-col gap-2 border-r border-[var(--color-border)] bg-[var(--color-background)]/50 overflow-y-auto hidden md:flex shrink-0"
  >
    <div class="flex-1 p-4 space-y-4">
      <!-- Navigation -->
      <nav class="space-y-1">
        <div
          class="px-2 pb-2 text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider"
        >
          Main
        </div>
        <UButton
          label="Home"
          icon="i-heroicons-home"
          to="/dashboard"
          block
          variant="ghost"
          class="justify-start text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)]"
          active-class="text-[var(--color-primary)] bg-[var(--color-surface-elevated)]"
        />
        <UButton
          label="Library"
          icon="i-heroicons-musical-note"
          block
          variant="ghost"
          class="justify-start text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
        />
        <UButton
          label="Agents"
          icon="i-heroicons-cpu-chip"
          block
          variant="ghost"
          class="justify-start text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
        />
      </nav>

      <nav class="space-y-1">
        <div
          class="px-2 pb-2 text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider"
        >
          Playlists
        </div>
        <UButton
          label="Discover Weekly"
          icon="i-heroicons-list-bullet"
          block
          variant="ghost"
          class="justify-start text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
        />
        <UButton
          label="Favorites"
          icon="i-heroicons-heart"
          block
          variant="ghost"
          class="justify-start text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
        />
      </nav>

      <!-- Filters (Placeholder as per prototype concept, can be expanded later) -->
      <div class="pt-4 border-t border-[var(--color-border)]">
        <div
          class="px-2 pb-2 text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider"
        >
          Filters
        </div>
        <!-- Simple sliders from prototype could go here later -->
        <div class="px-2 text-xs text-[var(--color-text-dim)]">
          Filters will be implemented here.
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-[var(--color-border)]">
      <UButton
        label="Settings"
        icon="i-heroicons-cog-6-tooth"
        block
        variant="ghost"
        class="justify-start text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
        color="neutral"
      />
    </div>
  </aside>
</template>
