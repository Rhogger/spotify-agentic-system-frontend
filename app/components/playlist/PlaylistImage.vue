<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg' | 'xl';

const props = withDefaults(
  defineProps<{
    src?: string | null;
    alt?: string;
    size?: Size;
  }>(),
  {
    size: 'md',
  },
);

const hasValidImage = computed(() => {
  return props.src && props.src.trim() !== '' && props.src !== 'No image';
});

const sizeClasses: Record<Size, { container: string; icon: string }> = {
  sm: { container: 'w-12 h-12', icon: 'w-6 h-6' },
  md: { container: 'w-20 h-20', icon: 'w-10 h-10' },
  lg: { container: 'w-40 h-40', icon: 'w-16 h-16' },
  xl: { container: 'w-52 h-52', icon: 'w-20 h-20' },
};
</script>

<template>
  <div
    class="rounded-md overflow-hidden flex items-center justify-center"
    :class="sizeClasses[size].container"
  >
    <img
      v-if="hasValidImage"
      :src="src!"
      :alt="alt || 'Playlist'"
      class="w-full h-full object-cover"
    />
    <div
      v-else
      class="w-full h-full bg-surface-card flex items-center justify-center"
    >
      <UIcon
        name="i-heroicons-musical-note"
        class="text-[#7f7f7f]"
        :class="sizeClasses[size].icon"
      />
    </div>
  </div>
</template>
