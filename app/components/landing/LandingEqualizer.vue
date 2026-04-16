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

function barBg(i: number, h: number): string {
  const hue = barHues.value[i] || 144;
  return `hsl(${hue}, 65%, ${28 + h * 28}%)`;
}
</script>

<template>
  <div
    class="hero-eq-wrapper fixed inset-x-0 bottom-0 z-0 pointer-events-none"
    style="height: 25vh"
  >
    <!-- Barras superiores (crescem pra cima), sem background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="flex items-end w-full h-full gap-[1.5px]">
        <div
          v-for="(h, i) in props.bars"
          :key="`eq-top-${i}`"
          class="flex-1 rounded-t-sm transition-[height] duration-75 will-change-[height]"
          :style="{
            height: `${Math.max(6, h * 100)}%`,
            background: barBg(i, h),
          }"
        />
      </div>
    </div>

    <!-- Barras espelhadas abaixo do wrapper -->
    <div
      class="absolute top-full inset-x-0 flex items-start gap-[1.5px]"
      style="height: 30vh"
    >
      <div
        v-for="(h, i) in props.bars"
        :key="`eq-bot-${i}`"
        class="flex-1 rounded-b-sm transition-[height] duration-75 will-change-[height]"
        :style="{
          height: `${Math.max(6, h * 100)}%`,
          background: barBg(i, h),
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.hero-eq-wrapper {
  will-change: height, transform;
}
</style>
