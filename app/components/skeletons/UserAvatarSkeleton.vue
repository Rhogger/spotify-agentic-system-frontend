<script setup lang="ts">
defineProps<{
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}>();
</script>

<template>
  <USkeleton
    class="rounded-full bg-surface-elevated"
    :class="[
      size === '3xs' ? 'h-4 w-4' : '',
      size === '2xs' ? 'h-5 w-5' : '',
      size === 'xs' ? 'h-6 w-6' : '',
      size === 'sm' || !size ? 'h-8 w-8' : '',
      size === 'md' ? 'h-10 w-10' : '',
      size === 'lg' ? 'h-12 w-12' : '',
      size === 'xl' ? 'h-14 w-14' : '',
      size === '2xl' ? 'h-16 w-16' : '',
      size === '3xl' ? 'h-20 w-20' : '',
    ]"
  />
</template>
