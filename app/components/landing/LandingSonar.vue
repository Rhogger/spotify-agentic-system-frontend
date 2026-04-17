<script setup lang="ts">
const waves = [
  { id: 0, x: 8, y: 25, size: 1.0, delay: 0 },
  { id: 1, x: 22, y: 55, size: 0.7, delay: 1.5 },
  { id: 2, x: 38, y: 15, size: 0.9, delay: 3 },
  { id: 3, x: 52, y: 70, size: 0.6, delay: 0.8 },
  { id: 4, x: 65, y: 35, size: 1.1, delay: 2.2 },
  { id: 5, x: 78, y: 60, size: 0.8, delay: 4 },
  { id: 6, x: 88, y: 20, size: 0.65, delay: 1 },
  { id: 7, x: 15, y: 80, size: 0.9, delay: 3.5 },
  { id: 8, x: 45, y: 45, size: 0.75, delay: 2.7 },
  { id: 9, x: 72, y: 85, size: 0.55, delay: 5 },
  { id: 10, x: 92, y: 42, size: 1.0, delay: 1.8 },
  { id: 11, x: 30, y: 90, size: 0.8, delay: 0.4 },
];
</script>

<template>
  <div
    class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      v-for="wave in waves"
      :key="'wave-' + wave.id"
      class="sound-wave"
      :style="{
        left: wave.x + '%',
        top: wave.y + '%',
        transform: `scale(${wave.size})`,
        animationDelay: wave.delay + 's',
      }"
    />
  </div>
</template>

<style scoped>
.sound-wave {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 1.5px solid rgba(56, 224, 123, 0.12);
  animation: pulse-wave 7s ease-in-out infinite;
  pointer-events: none;
  transform-origin: center;
}

.sound-wave::before,
.sound-wave::after {
  content: '';
  position: absolute;
  inset: 22px;
  border-radius: 50%;
  border: 1px solid rgba(56, 224, 123, 0.07);
  animation: pulse-wave-inner 7s ease-in-out infinite;
  animation-delay: 0.6s;
}

.sound-wave::after {
  inset: 44px;
  animation-delay: 1.2s;
}

@keyframes pulse-wave {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.35;
    border-color: rgba(56, 224, 123, 0.12);
  }
  50% {
    transform: scale(1.6);
    opacity: 0.05;
    border-color: rgba(56, 224, 123, 0.03);
  }
}

@keyframes pulse-wave-inner {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.35);
    opacity: 0.08;
  }
}
</style>
