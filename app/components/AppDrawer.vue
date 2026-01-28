<script setup lang="ts">
// AppDrawer Component (Right side - Agents/Chat)
</script>

<template>
  <aside
    class="w-80 border-l border-[var(--color-border)] bg-[var(--color-surface-highlight)] overflow-y-auto hidden xl:flex flex-col shrink-0"
  >
    <div
      class="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface-base)]"
    >
      <h3 class="font-semibold text-[var(--color-text-main)]">
        Agent Activity
      </h3>
      <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-yellow-500" />
    </div>

    <div class="p-4 flex-1 text-[var(--color-text-main)]" id="chat-container">
      <!-- Example Chat Message -->
      <div
        class="bg-[var(--color-surface-card)] rounded-lg p-3 text-sm text-[var(--color-text-muted)] mb-3"
      >
        <p class="font-medium mb-1 text-xs text-[var(--color-primary)]">
          System
        </p>
        <p>Waiting for user input...</p>
      </div>
    </div>

    <div
      class="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-base)]"
    >
      <div class="relative">
        <UTextarea
          placeholder="Ask the agent..."
          :rows="3"
          class="w-full bg-[var(--color-surface-input)] border-none text-[var(--color-text-main)] focus:ring-[var(--color-primary)] placeholder-[var(--color-text-dim)]"
          variant="none"
        />
        <div class="absolute bottom-2 right-2">
          <UButton
            icon="i-heroicons-paper-airplane"
            size="xs"
            color="primary"
            variant="solid"
          />
        </div>
      </div>
    </div>
  </aside>
</template>
