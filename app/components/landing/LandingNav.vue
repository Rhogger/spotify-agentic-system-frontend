<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

defineEmits(['login']);

const magnetBtn = ref<HTMLElement | { $el: HTMLElement } | null>(null);
const btnX = ref(0);
const btnY = ref(0);

function onMagnet(e: MouseEvent) {
  const target = magnetBtn.value;
  const el = target && '$el' in target ? target.$el : target;
  if (!el || !(el instanceof HTMLElement)) return;
  const r = el.getBoundingClientRect();
  btnX.value = (e.clientX - (r.left + r.width / 2)) * 0.35;
  btnY.value = (e.clientY - (r.top + r.height / 2)) * 0.35;
}

function offMagnet() {
  btnX.value = 0;
  btnY.value = 0;
}

// ── Scroll / nav ──────────────────────────────────────────────────
const { y: scrollY } = useWindowScroll();
const navSolid = computed(() => scrollY.value > 40);
</script>

<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 px-6 md:px-14 h-16 flex items-center justify-between transition-colors duration-500"
    :class="
      navSolid
        ? 'bg-[#0b1810]/90 backdrop-blur-2xl border-b border-white/5'
        : 'bg-transparent border-b border-transparent'
    "
  >
    <div class="flex items-center gap-2.5">
      <UIcon name="i-simple-icons-spotify" class="w-5 h-5 text-primary" />
      <span class="font-bold text-base text-white/90">
        Spotify <strong class="text-primary font-black">Recs</strong>
      </span>
    </div>

    <UButton
      ref="magnetBtn"
      label="Entrar"
      color="primary"
      size="md"
      class="magnet-btn rounded-full font-black px-5"
      :style="{ transform: `translate(${btnX}px,${btnY}px)` }"
      @mousemove="onMagnet"
      @mouseleave="offMagnet"
      @click="$emit('login')"
    />
  </nav>
</template>

<style scoped>
.magnet-btn {
  will-change: transform;
  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s ease;
  box-shadow: 0 0 0 rgba(56, 224, 123, 0);
}
.magnet-btn:hover {
  box-shadow: 0 0 24px rgba(56, 224, 123, 0.5);
}
</style>
