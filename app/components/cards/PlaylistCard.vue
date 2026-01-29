<script setup lang="ts">
interface Props {
  id: number | string;
  name: string;
  type: string;
  count: string;
  icon?: string;
  color?: string;
  gradient?: string;
  active?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    class="group flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all duration-200 outline-none hover:bg-surface-highlight hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-surface-highlight active:scale-[0.98] active:bg-surface-highlight"
    tabindex="0"
    role="button"
    @click="navigateTo('/playlist/' + id)"
    @keydown.enter="navigateTo('/playlist/' + id)"
    @keydown.space.prevent="navigateTo('/playlist/' + id)"
  >
    <div
      class="w-12 h-12 rounded flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
      :class="gradient || color || 'bg-surface-elevated'"
    >
      <UIcon
        v-if="icon"
        :name="icon"
        class="text-white w-6 h-6 drop-shadow-sm"
        :class="{ 'fill-current': name === 'Músicas Curtidas' }"
      />
    </div>

    <div class="flex flex-col min-w-0">
      <span
        class="text-sm font-bold text-text-main truncate group-hover:text-white transition-colors"
      >
        {{ name }}
      </span>
      <span
        class="text-xs text-text-muted truncate group-hover:text-text-dim transition-colors"
      >
        {{ type }} • {{ count }}
      </span>
    </div>
  </div>
</template>
