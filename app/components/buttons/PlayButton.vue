<script setup lang="ts">
import { primaryButton } from '~/binds/buttons';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

withDefaults(defineProps<Props>(), {
  size: 'xl',
});

const isPlaying = ref(false);

function toggle() {
  isPlaying.value = !isPlaying.value;
}
</script>

<template>
  <UButton
    v-bind="primaryButton"
    class="aspect-square flex items-center justify-center p-0"
    :class="{
      'w-14 h-14': size === 'xl',
      'w-12 h-12': size === 'lg',
      'w-10 h-10': size === 'md',
      'w-8 h-8': size === 'sm',
    }"
    @click="toggle"
  >
    <UIcon
      :name="isPlaying ? 'i-heroicons-pause-solid' : 'i-heroicons-play-solid'"
      class="w-7 h-7"
      :class="{ 'ml-1': !isPlaying }"
    />
  </UButton>
</template>
