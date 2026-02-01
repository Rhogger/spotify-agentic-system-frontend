<script setup lang="ts">
import { useImage } from '@vueuse/core';

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
    <UserAvatarSkeleton v-if="src && isLoading" :size="size" />

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
