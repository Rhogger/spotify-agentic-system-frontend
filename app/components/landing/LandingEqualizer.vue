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
    class="hero-eq-wrapper fixed inset-x-0 bottom-0 z-40 pointer-events-none"
    style="height: 150vh; transform: translateY(125vh); --eq-intensity: 0"
  >
    <div class="flex items-end w-full gap-[1.5px]" style="height: 75vh">
      <div
        v-for="(h, i) in props.bars"
        :key="`eq-top-${i}`"
        class="flex-1 rounded-t-sm transition-transform duration-100 will-change-transform"
        :style="{
          height: '100%',
          transformOrigin: 'bottom',
          transform: `scaleY(calc(max(0.06, ${h}) * (1 - var(--eq-intensity, 0)) + 1 * var(--eq-intensity, 0)))`,
          background: barBg(i, h),
        }"
      />
    </div>

    <div class="flex items-start w-full gap-[1.5px]" style="height: 75vh">
      <div
        v-for="(h, i) in props.bars"
        :key="`eq-bot-${i}`"
        class="flex-1 rounded-b-sm transition-transform duration-100 will-change-transform"
        :style="{
          height: '100%',
          transformOrigin: 'top',
          transform: `scaleY(calc(max(0.06, ${h}) * (1 - var(--eq-intensity, 0)) + 1 * var(--eq-intensity, 0)))`,
          background: barBg(i, h),
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.hero-eq-wrapper {
  will-change: transform;
}
</style>
