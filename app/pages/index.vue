<script setup lang="ts">
definePageMeta({ layout: 'public' });

const config = useRuntimeConfig();
const { bars, barsMirror, counters } = useLandingAnimations();

async function handleLogin(): Promise<void> {
  const base =
    (config.public.apiBaseUrl as string) || 'http://localhost:8000/api';
  window.location.href = `${base.replace(/\/$/, '')}/auth/login`;
}
</script>

<template>
  <div
    class="lp-root text-white transition-colors duration-700"
    style="font-family: 'Spline Sans', sans-serif; background-color: var(--lp-bg, rgb(34, 16, 17));"
  >
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
    </div>

    <div class="lp-grid pointer-events-none" aria-hidden="true" />

    <LandingNav @login="handleLogin" />

    <LandingHero @login="handleLogin" />

    <LandingEqualizer :bars="bars" />

    <LandingFeatures />

    <!-- <LandingCatalog :counters="counters" /> -->

    <!-- <LandingDemo /> -->

    <!-- <LandingChatDemo /> -->

    <!-- <LandingCta :bars="bars" :barsMirror="barsMirror" @login="handleLogin" /> -->

    <LandingFooter />
  </div>
</template>

<style scoped>
.lp-root {
  position: relative;
  min-height: 100vh;
}

.lp-grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 51px,
      rgba(56, 224, 123, 0.045) 51px,
      rgba(56, 224, 123, 0.045) 52px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 51px,
      rgba(56, 224, 123, 0.045) 51px,
      rgba(56, 224, 123, 0.045) 52px
    );
  transform: translateZ(0);
  will-change: unset;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  will-change: transform;
  pointer-events: none;
}
.orb-1 {
  width: 620px;
  height: 620px;
  background: radial-gradient(
    circle,
    rgba(56, 224, 123, 0.2) 0%,
    transparent 70%
  );
  top: -20%;
  left: -15%;
  animation: drift 28s ease-in-out infinite;
}
.orb-2 {
  width: 460px;
  height: 460px;
  background: radial-gradient(
    circle,
    rgba(124, 106, 247, 0.18) 0%,
    transparent 70%
  );
  top: 35%;
  right: -12%;
  animation: drift 22s ease-in-out infinite reverse;
  animation-delay: -7s;
}
.orb-3 {
  width: 380px;
  height: 380px;
  background: radial-gradient(
    circle,
    rgba(56, 224, 123, 0.12) 0%,
    transparent 70%
  );
  bottom: 8%;
  left: 20%;
  animation: drift 36s ease-in-out infinite;
  animation-delay: -15s;
}
@keyframes drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(40px, -50px);
  }
  66% {
    transform: translate(-30px, 40px);
  }
}
</style>
