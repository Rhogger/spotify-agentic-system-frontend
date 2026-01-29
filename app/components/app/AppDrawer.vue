<script setup lang="ts">
// AppDrawer Component (Right side - Agents/Chat)
</script>

<template>
  <aside
    class="w-80 border-l border-border bg-surface-highlight overflow-y-auto hidden xl:flex flex-col shrink-0"
  >
    <div
      class="p-4 border-b border-border flex items-center justify-between bg-surface-base"
    >
      <h3 class="font-semibold text-text-main">Agent Activity</h3>
      <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-yellow-500" />
    </div>

    <div class="p-4 flex-1 text-text-main" id="chat-container">
      <div class="bg-surface-card rounded-lg p-3 text-sm text-text-muted mb-3">
        <p class="font-medium mb-1 text-xs text-(--color-primary)">System</p>
        <p>Waiting for user input...</p>
      </div>
    </div>

    <div class="p-4 border-t border-border bg-surface-base">
      <div class="relative">
        <UTextarea
          placeholder="Ask the agent..."
          :rows="3"
          class="w-full bg-surface-input border-none text-text-main focus:ring-(--color-primary) placeholder-text-dim"
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
