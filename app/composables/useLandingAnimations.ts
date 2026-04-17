import gsap from 'gsap';

interface Counter {
  value: number;
  target: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export function useLandingAnimations() {
  const bars = ref<number[]>(Array.from({ length: 48 }, () => 0.2));
  const barsMirror = computed(() => [...bars.value].reverse());
  const counters = ref<Counter[]>([
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

  let waveRaf = 0;
  let gsapCtx: gsap.Context | null = null;

  function animWave(): void {
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

  async function setupGSAP(): Promise<void> {
    if (!import.meta.client) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsapCtx = gsap.context(() => {
      // 1. Hero char entrance animations
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

      // 2. Generic scroll reveal for .reveal elements
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
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

      // 3. Feature cards staggered entrance
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

      // 5. Stats counters animados por scroll
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

      // 6. Orbs parallax
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

      // 7. Equalizer — transição hero → features
      const heroSection = document.querySelector<HTMLElement>(
        '[data-section="hero"]',
      );
      const featSection = document.querySelector<HTMLElement>(
        '[data-section="features"]',
      );
      const eqWrapper = document.querySelector<HTMLElement>('.hero-eq-wrapper');
      const heroDarken = document.querySelector<HTMLElement>('.hero-darken');
      const heroParticles = document.querySelector<HTMLElement>(
        '.hero-particles-layer',
      );

      // ── Snap-scroll state ──
      // Previne loops de scroll: quando o auto-scroll dispara, travamos apenas
      // a mesma direção por um cooldown. A direção oposta fica livre
      // imediatamente para responder ao scroll rápido do usuário.
      const SNAP_THRESHOLD = 0.4; // 40% de cobertura do EQ
      const SNAP_COOLDOWN_MS = 1400; // cooldown por direção
      let lockedDir: 'down' | 'up' | null = null;
      let prevPhase1Progress = 0;
      let prevPhase2Progress = 0;

      function lockDir(dir: 'down' | 'up'): void {
        lockedDir = dir;
        setTimeout(() => {
          if (lockedDir === dir) lockedDir = null;
        }, SNAP_COOLDOWN_MS);
      }

      function snapToFeatures(): void {
        if (lockedDir === 'down') return;
        lockDir('down');
        const target =
          featSection!.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: target, behavior: 'smooth' });
      }

      function snapToHero(): void {
        if (lockedDir === 'up') return;
        lockDir('up');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (heroSection && featSection && eqWrapper && heroDarken) {
        gsap.set(eqWrapper, { y: '125vh', zIndex: 40 });
        gsap.set(heroDarken, { opacity: 0 });

        // Fase 1: hero pinado, equalizer sobe
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'bottom bottom',
          end: '+=1500',
          pin: true,
          scrub: 1,
          onUpdate(self) {
            const ty = 125 - self.progress * 75;
            eqWrapper.style.transform = `translateY(${ty}vh)`;
            eqWrapper.style.zIndex = '40';
            heroDarken.style.opacity = `${self.progress}`;
            eqWrapper.style.setProperty(
              '--eq-intensity',
              self.progress.toString(),
            );
            if (heroParticles)
              heroParticles.style.setProperty(
                '--rain-intensity',
                self.progress.toString(),
              );

            const goingDown = self.progress > prevPhase1Progress;
            const goingUp = self.progress < prevPhase1Progress;

            // Snap down: EQ cruzou/está acima de 40% indo pra baixo
            if (goingDown && self.progress >= SNAP_THRESHOLD) {
              snapToFeatures();
            }

            // Snap up: se o user voltou rápido do features e caiu na
            // Fase 1, o EQ ainda está visível — snap pra cima.
            // Qualquer progress < 1 com direção up = snap pro hero.
            if (goingUp && self.progress < 1 - SNAP_THRESHOLD) {
              snapToHero();
            }

            prevPhase1Progress = self.progress;
          },
          onLeave() {
            eqWrapper.style.transform = 'translateY(50vh)';
            eqWrapper.style.zIndex = '40';
            heroDarken.style.opacity = '1';
            eqWrapper.style.setProperty('--eq-intensity', '1');
            if (heroParticles)
              heroParticles.style.setProperty('--rain-intensity', '1');
          },
          onLeaveBack() {
            eqWrapper.style.transform = 'translateY(125vh)';
            eqWrapper.style.zIndex = '40';
            heroDarken.style.opacity = '0';
            eqWrapper.style.setProperty('--eq-intensity', '0');
            if (heroParticles)
              heroParticles.style.setProperty('--rain-intensity', '0');
            lockedDir = null;
          },
        });

        // Fase 2: equalizer desce ao entrar em features
        ScrollTrigger.create({
          trigger: featSection,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          onUpdate(self) {
            const ty = 50 - self.progress * 150;
            eqWrapper.style.transform = `translateY(${ty}vh)`;
            eqWrapper.style.zIndex = self.progress < 0.85 ? '40' : '5';
            heroDarken.style.opacity = `${1 - self.progress}`;
            eqWrapper.style.setProperty(
              '--eq-intensity',
              (1 - self.progress).toString(),
            );
            if (heroParticles)
              heroParticles.style.setProperty(
                '--rain-intensity',
                (1 - self.progress).toString(),
              );

            // Snap up: progress <= 0.6 indo pra cima = EQ cobre 40% voltando
            const goingUp = self.progress < prevPhase2Progress;
            const snapBackThreshold = 1 - SNAP_THRESHOLD;
            if (goingUp && self.progress <= snapBackThreshold) {
              snapToHero();
            }

            prevPhase2Progress = self.progress;
          },
          onLeave() {
            eqWrapper.style.transform = 'translateY(-100vh)';
            eqWrapper.style.zIndex = '0';
            heroDarken.style.opacity = '0';
            eqWrapper.style.setProperty('--eq-intensity', '0');
            if (heroParticles)
              heroParticles.style.setProperty('--rain-intensity', '0');
            lockedDir = null;
          },
          onLeaveBack() {
            eqWrapper.style.transform = 'translateY(50vh)';
            eqWrapper.style.zIndex = '40';
            heroDarken.style.opacity = '1';
            eqWrapper.style.setProperty('--eq-intensity', '1');
            if (heroParticles)
              heroParticles.style.setProperty('--rain-intensity', '1');
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

  return { bars, barsMirror, counters };
}
