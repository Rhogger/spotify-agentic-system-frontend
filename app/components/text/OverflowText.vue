<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useResizeObserver } from '@vueuse/core';

const props = defineProps<{
  text: string;
}>();

const containerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const isOverflowing = ref(false);

const checkOverflow = async () => {
  await nextTick();
  if (containerRef.value && contentRef.value) {
    isOverflowing.value =
      contentRef.value.scrollWidth > containerRef.value.clientWidth;
  }
};

useResizeObserver(containerRef, checkOverflow);

watch(() => props.text, checkOverflow, { immediate: true });
</script>

<template>
  <div
    ref="containerRef"
    class="group relative overflow-hidden w-full"
    :class="{ 'hover-mask': isOverflowing }"
    :title="text"
  >
    <div
      ref="contentRef"
      class="whitespace-nowrap w-fit will-change-transform"
      :class="{
        'flex gap-4 group-hover:animate-marquee': isOverflowing,
        truncate: !isOverflowing,
      }"
    >
      <span>{{ text }}</span>
      <span v-if="isOverflowing" aria-hidden="true">{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
.hover-mask:hover {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 0.5rem));
  }
}

.group-hover\:animate-marquee {
  animation: none;
}

.group:hover .group-hover\:animate-marquee {
  animation: marquee 8s linear infinite;
}
</style>
