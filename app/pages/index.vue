<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import { onMounted, onUnmounted, ref } from "vue";

definePageMeta({
  layout: "public",
});

function handleLogin() {
  navigateTo("/home");
}

const { x: mouseX, y: mouseY } = useMouse();

const x = ref(0);
const y = ref(0);

let animationId: number;
const lerpFactor = 0.1;

function updatePosition() {
  const dx = mouseX.value - x.value;
  const dy = mouseY.value - y.value;

  x.value += dx * lerpFactor;
  y.value += dy * lerpFactor;

  animationId = requestAnimationFrame(updatePosition);
}

onMounted(() => {
  updatePosition();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-screen bg-[#051c10] text-text-main overflow-hidden selection:bg-primary selection:text-black"
  >
    <div
      class="absolute inset-0 z-0 opacity-40 pointer-events-none grid-bg"
    ></div>

    <div
      class="absolute inset-0 z-0 pointer-events-none"
      :style="{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(56, 224, 123, 0.15), transparent 40%)`,
      }"
    ></div>

    <div class="z-10 flex flex-col items-center gap-8 relative">
      <div
        class="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700"
      >
        <div
          class="w-24 h-24 rounded-full bg-black/40 flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(56,224,123,0.2)] backdrop-blur-md"
        >
          <UIcon name="i-simple-icons-spotify" class="w-14 h-14 text-primary" />
        </div>

        <h1
          class="text-5xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(56,224,123,0.5)]"
        >
          Spotify <span class="text-primary">Recs</span>
        </h1>

        <p class="text-text-muted text-lg font-medium tracking-wide">
          Descubra novas músicas com o poder da IA
        </p>
      </div>

      <UButton
        label="Entrar com o Spotify"
        color="primary"
        size="xl"
        class="font-bold text-black px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,224,123,0.4)] hover:shadow-[0_0_40px_rgba(56,224,123,0.6)] ring-1 ring-white/20 active:scale-95"
        @click="handleLogin"
      />
    </div>
  </div>
</template>

<style scoped>
.grid-bg {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}
</style>
