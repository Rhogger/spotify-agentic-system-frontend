<script setup lang="ts">
import type { gsap } from 'gsap';

definePageMeta({ layout: 'public' });

const config = useRuntimeConfig();

async function handleLogin() {
  const base =
    (config.public.apiBaseUrl as string) || 'http://localhost:8000/api';
  window.location.href = `${base.replace(/\/$/, '')}/auth/login`;
}

// ── Waveform ──────────────────────────────────────────────────────
const bars = ref(Array.from({ length: 48 }, () => 0.2));
const barsMirror = computed(() => [...bars.value].reverse());
let waveRaf: number;

function animWave() {
  const t = Date.now();
  bars.value = bars.value.map((_, i) =>
    Math.max(
      0.08,
      Math.abs(Math.sin(t / 700 + i * 0.85)) * 0.55 +
        Math.abs(Math.sin(t / 420 + i * 1.9)) * 0.3,
    ),
  );
  waveRaf = requestAnimationFrame(animWave);
}

// ── Counters ──────────────────────────────────────────────────────
const counters = ref([
  { value: 0, target: 169, suffix: 'k+', label: 'músicas (1921–2020)' },
  { value: 0, target: 100, suffix: 'k+', label: 'artistas' },
  {
    value: 0,
    target: 0.007,
    suffix: 'ms',
    label: 'por recomendação',
    decimals: 3,
  },
  { value: 0, target: 50, suffix: '%', label: 'taxa de descoberta' },
]);

// ── GSAP context ─────────────────────────────────────────────────
let gsapCtx: gsap.Context | null = null;

async function setupGSAP() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  gsapCtx = gsap.context(() => {
    // ── 1. Hero title: characters fly in from below ───────────────
    gsap.from('.hero-char', {
      y: '115%',
      opacity: 0,
      duration: 0.65,
      stagger: 0.022,
      ease: 'power4.out',
      delay: 0.08,
    });
    gsap.from('.hero-char-accent', {
      y: '115%',
      opacity: 0,
      rotation: 5,
      duration: 0.75,
      stagger: 0.055,
      ease: 'expo.out',
      delay: 0.52,
    });

    // ── 2. Scroll reveals via ScrollTrigger (substitui IO) ────────
    document.querySelectorAll('.reveal').forEach((el) => {
      // Garante que o estado inicial seja opaco para compatibilidade
      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // ── 3. Feature cards: stagger com rotateX ────────────────────
    gsap.from('.feat-card', {
      y: 70,
      opacity: 0,
      rotateX: 14,
      stagger: { amount: 0.28, from: 'start' },
      duration: 0.85,
      ease: 'power3.out',
      transformPerspective: 900,
      scrollTrigger: {
        trigger: '#features',
        start: 'top 72%',
        toggleActions: 'play none none none',
      },
    });

    // ── 4. Counters scrubados ao scroll ──────────────────────────
    counters.value.forEach((c) => {
      ScrollTrigger.create({
        trigger: '.stats-trigger',
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 0.6,
        onUpdate(self) {
          const raw = self.progress * c.target;
          c.value = c.decimals
            ? parseFloat(raw.toFixed(c.decimals))
            : Math.floor(raw);
        },
        onLeave() {
          c.value = c.target;
        },
        onLeaveBack() {
          c.value = 0;
        },
      });
    });

    // ── 5. Parallax dos orbs ──────────────────────────────────────
    gsap.to('.orb-1', {
      y: -160,
      ease: 'none',
      scrollTrigger: { scrub: 1.2, start: 'top top', end: 'bottom bottom' },
    });
    gsap.to('.orb-2', {
      y: 120,
      ease: 'none',
      scrollTrigger: { scrub: 1.8, start: 'top top', end: 'bottom bottom' },
    });
    gsap.to('.orb-3', {
      y: -80,
      ease: 'none',
      scrollTrigger: { scrub: 2.2, start: 'top top', end: 'bottom bottom' },
    });

    // ── 6. Equalizer overlay: hero → features ─────────────────────
    const heroSection = document.querySelector<HTMLElement>(
      '[data-section="hero"]',
    );
    const featSection = document.querySelector<HTMLElement>(
      '[data-section="features"]',
    );
    const eqContainer =
      document.querySelector<HTMLElement>('.hero-eq-container');

    let eqHeight = 25; // vh

    if (heroSection && featSection && eqContainer) {
      eqContainer.style.height = '25vh';
      eqContainer.style.zIndex = '10';

      ScrollTrigger.create({
        trigger: heroSection,
        start: 'bottom bottom',
        end: '+=1500',
        pin: true,
        scrub: 1,
        onUpdate(self) {
          eqHeight = 25 + self.progress * 75;
          eqContainer.style.height = `${eqHeight}vh`;
          eqContainer.style.zIndex = '50';
        },
        onLeave(self) {
          eqHeight = 100;
          eqContainer.style.height = '100vh';
          eqContainer.style.zIndex = '50';
        },
        onLeaveBack(self) {
          eqHeight = 100;
          eqContainer.style.height = '100vh';
        },
      });

      ScrollTrigger.create({
        trigger: featSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        onUpdate(self) {
          eqHeight = 100 * (1 - self.progress);
          eqContainer.style.height = `${eqHeight}vh`;
          eqContainer.style.zIndex = self.progress < 0.3 ? '50' : '10';
        },
      });
    }
  });
}

onMounted(async () => {
  animWave();
  await setupGSAP();
});

onUnmounted(() => {
  cancelAnimationFrame(waveRaf);
  gsapCtx?.revert();
});
</script>

<template>
  <div
    class="lp-root bg-[#0b1810] text-white"
    style="font-family: 'Spline Sans', sans-serif"
  >
    <!-- ── ORBS ── -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
    </div>

    <!-- ── GRID ── -->
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
/* ── Root ── */
.lp-root {
  position: relative;
  min-height: 100vh;
}

/* ── Grid: repeating-linear-gradient para linhas exatas (sem subpixel gaps) ── */
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

/* ── Orbs ── */
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
