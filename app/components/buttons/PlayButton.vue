<script setup lang="ts">
import { ref } from 'vue';
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
    class="aspect-square flex items-center justify-center p-0 rounded-full shadow-[0_8px_20px_rgba(56,224,123,0.4)] hover:shadow-[0_12px_28px_rgba(56,224,123,0.5)]"
    :class="{
      'w-14 h-14': size === 'xl',
      'w-12 h-12': size === 'lg',
      'w-10 h-10': size === 'md',
      'w-8 h-8': size === 'sm',
    }"
    @click="toggle"
  >
    <UIcon
      :name="
        isPlaying ? 'i-heroicons-pause-20-solid' : 'i-heroicons-play-20-solid'
      "
      class="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
      :class="{ 'ml-0.5': !isPlaying }"
    />
  </UButton>
</template>
