<script setup lang="ts">
import { useImage } from '@vueuse/core';

/**
 * UserAvatar Component
 *
 * Displays user avatar or fallback initials with consistent styling.
 *
 * Props:
 * - src: Image URL (optional)
 * - alt: Alt text (optional, default "User")
 * - size: Avatar size (default "sm") - compatible with UAvatar
 * - initials: Text to display if no image (optional)
 */

interface Props {
  src?: string;
  alt?: string;
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  initials?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'User',
  size: 'sm',
  initials: '',
});

const BLANK_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const imageOptions = computed(() => ({ src: props.src || BLANK_IMAGE }));
const { isLoading: imageLoading } = useImage(imageOptions);

const isLoading = computed(() => !!props.src && imageLoading.value);
</script>

<template>
  <div class="relative inline-flex rounded-full">
    <USkeleton
      v-if="src && isLoading"
      class="rounded-full bg-surface-elevated"
      :class="[
        size === '3xs' ? 'h-4 w-4' : '',
        size === '2xs' ? 'h-5 w-5' : '',
        size === 'xs' ? 'h-6 w-6' : '',
        size === 'sm' ? 'h-8 w-8' : '',
        size === 'md' ? 'h-10 w-10' : '',
        size === 'lg' ? 'h-12 w-12' : '',
        size === 'xl' ? 'h-14 w-14' : '',
        size === '2xl' ? 'h-16 w-16' : '',
        size === '3xl' ? 'h-20 w-20' : '',
      ]"
    />

    <UAvatar
      v-show="!src || !isLoading"
      :src="src"
      :alt="alt"
      :size="size"
      :text="initials"
      class="cursor-pointer bg-primary/20 text-black font-bold ring-2 ring-transparent transition-all group-hover:ring-primary/50"
      :class="{ 'opacity-0 absolute': src && isLoading }"
      :ui="{
        root: 'relative inline-flex items-center justify-center flex-shrink-0 rounded-full select-none overflow-hidden',
        image: 'h-full w-full object-cover rounded-full',
        fallback:
          'font-bold leading-none text-black truncate flex items-center justify-center bg-primary',
      }"
    >
      <template v-if="!src" #fallback>
        <div
          class="h-full w-full flex items-center justify-center bg-primary text-black font-bold"
        >
          {{ initials || alt?.charAt(0).toUpperCase() }}
        </div>
      </template>
    </UAvatar>
  </div>
</template>
