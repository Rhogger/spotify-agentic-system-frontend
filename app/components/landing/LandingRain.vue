<script setup lang="ts">
const drops = Array.from({ length: 160 }, (_, i) => ({
  id: i,
  x: Math.round((i / 160) * 98 + Math.random() * 2),
  delay: parseFloat(((i * 0.19) % 4).toFixed(2)),
  duration: parseFloat((1.4 + (i % 7) * 0.18).toFixed(2)),
  opacity: parseFloat((0.06 + (i % 5) * 0.02).toFixed(2)),
  length: 10 + (i % 4) * 5,
}));
</script>

<template>
  <div
    class="hero-darken absolute inset-0 z-15 pointer-events-none bg-[#0b1810]"
    style="opacity: 0"
  />

  <div
    class="hero-particles-layer absolute inset-0 z-20 pointer-events-none overflow-hidden"
    aria-hidden="true"
    style="--rain-intensity: 0"
  >
    <div
      v-for="(drop, i) in drops"
      :key="'drop-' + drop.id"
      class="rain-drop-wrapper"
      :style="{
        left: drop.x + '%',
        opacity:
          i % 4 === 0
            ? `calc(0.75 + 0.25 * var(--rain-intensity, 0))`
            : `calc(1.0 * var(--rain-intensity, 0))`,
        transform: `scaleY(calc(1 + 4 * var(--rain-intensity, 0))) scaleX(calc(1 + 2 * var(--rain-intensity, 0)))`,
      }"
    >
      <div
        class="rain-drop"
        :style="{
          animationDuration: drop.duration + 's',
          animationDelay: drop.delay + 's',
          height: drop.length + 'px',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.rain-drop-wrapper {
  position: absolute;
  top: -20px;
  pointer-events: none;
  transform-origin: center;
  will-change: opacity, transform;
}

.rain-drop {
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(56, 224, 123, 0.6),
    transparent
  );
  border-radius: 1px;
  animation: rain-fall linear infinite;
  pointer-events: none;
}

@keyframes rain-fall {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
