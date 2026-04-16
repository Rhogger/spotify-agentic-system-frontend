<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  bars: number[];
}>();

const paletteHues = [138, 144, 150];
const barHues = ref<number[]>([]);

watch(
  () => props.bars.length,
  (newLen) => {
    if (barHues.value.length !== newLen) {
      barHues.value = Array.from({ length: newLen }, () => {
        return (
          paletteHues[Math.floor(Math.random() * paletteHues.length)] || 144
        );
      });
    }
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="hero-eq-container fixed flex flex-row items-end bottom-0 inset-x-0 z-0 h-[25vh] overflow-visible pointer-events-none"
  >
    <div
      class="flex items-end w-full h-full gap-[1.5px] overflow-visible pointer-events-auto"
    >
      <div
        v-for="(h, i) in props.bars"
        :key="`hero-eq-${i}`"
        class="flex-1 rounded-t-sm transition-all duration-75"
        :style="{
          height: `${Math.max(6, h * 100)}%`,
          background: `hsl(${barHues[i] || 144}, 65%, ${28 + h * 28}%)`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.hero-eq-container {
  will-change: height, transform;
}
</style>
