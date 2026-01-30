<script setup lang="ts">
import { baseTooltip } from '~/binds/tooltips';

defineProps<{
  text: string;
}>();
</script>

<template>
  <UTooltip :text="text" v-bind="baseTooltip">
    <UIcon
      name="i-heroicons-information-circle"
      class="w-4 h-4 text-text-dim hover:text-text-main cursor-help transition-colors"
    />
  </UTooltip>
</template>
