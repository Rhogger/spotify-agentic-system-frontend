<script setup lang="ts">
import type { AgentPlaylist } from '~/models/agent';

const props = defineProps<{
  playlist: AgentPlaylist;
}>();
</script>

<template>
  <div
    class="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
  >
    <div
      class="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-surface-highlight flex items-center justify-center"
    >
      <img
        v-if="playlist.image"
        :src="playlist.image"
        class="w-full h-full object-cover"
      />
      <UIcon
        v-else
        name="i-heroicons-queue-list"
        class="w-6 h-6 text-text-dim"
      />
    </div>

    <div class="flex-1 min-w-0">
      <p
        class="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors"
      >
        {{ playlist.name }}
      </p>
      <p v-if="playlist.description" class="text-xs text-text-dim truncate">
        {{ playlist.description }}
      </p>
    </div>
  </div>
</template>
