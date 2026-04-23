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
        ease: 'power1.out',
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

      // 8. Features — Pinned Slider with Title
      const featViewport =
        document.querySelector<HTMLElement>('.features-viewport');
      const titleRow =
        document.querySelector<HTMLElement>('.feature-title-row');
      const featureRows = gsap.utils.toArray<HTMLElement>('.feature-row');

      if (featViewport && titleRow && featureRows.length > 0) {
        const totalCards = featureRows.length;
        const tl = gsap.timeline();
        const snapProgress: number[] = [];

        // Title Entrance Animation (independent of scrub)
        const titleTag = titleRow.querySelector('.feat-title-tag');
        const titleWords = titleRow.querySelectorAll('.feat-title-word');
        const titleDesc = titleRow.querySelector('.feat-title-desc');

        ScrollTrigger.create({
          trigger: featViewport,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(titleTag, {
              opacity: 1,
              y: '0%',
              duration: 0.8,
              ease: 'power3.out',
            });
            gsap.to(titleWords, {
              opacity: 1,
              y: '0%',
              rotate: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.1,
              delay: 0.1,
            });
            gsap.to(titleDesc, {
              opacity: 1,
              y: '0%',
              duration: 1,
              ease: 'power3.out',
              delay: 0.4,
            });
          },
        });

        // Setup Initial States for the timeline
        gsap.set(titleRow, { opacity: 1, y: 0, pointerEvents: 'auto' });

        featureRows.forEach((row, i) => {
          const titleBox = row.querySelector('.feat-title-inner');
          const numBox = row.querySelector('.feat-num-inner');
          const bodyBox = row.querySelector('.feat-body-inner');
          const imgBox = row.querySelector('.feat-img-box');
          const orb = row.querySelector('.feat-neon-orb');

          gsap.set(row, { opacity: 1, zIndex: i + 1, pointerEvents: 'none' });
          gsap.set([titleBox, numBox, bodyBox], {
            opacity: 0,
            y: 80,
            force3D: false,
          });
          gsap.set([imgBox, orb], { scale: 0, opacity: 0, force3D: false });
        });

        // Durations relative to scrub multiplier
        const outputDuration = 0.5; // Fast exit
        const delayDuration = 0.5; // Gap
        const inputDuration = 1.0; // Smooth entrance
        const holdDuration = 1.2; // Stay at y:0 for a while
        const cycle =
          outputDuration + delayDuration + inputDuration + holdDuration;

        // Total scroll items: Title + N Features
        const totalDuration = totalCards * cycle;
        const addSnap = (time: number) =>
          snapProgress.push(time / totalDuration);

        // Helper for safe GSAP color interpolation
        function getMixedBg(hexAccent: string | null): string {
          if (!hexAccent) return 'rgb(34, 16, 17)'; // Red (#f43f5e) + Green mix default
          const c1 = [
            parseInt(hexAccent.slice(1, 3), 16),
            parseInt(hexAccent.slice(3, 5), 16),
            parseInt(hexAccent.slice(5, 7), 16),
          ];
          const c2 = [5, 10, 7]; // #050a07
          const r = Math.round(c1[0] * 0.12 + c2[0] * 0.88);
          const g = Math.round(c1[1] * 0.12 + c2[1] * 0.88);
          const b = Math.round(c1[2] * 0.12 + c2[2] * 0.88);
          return `rgb(${r}, ${g}, ${b})`;
        }

        // --- Step 0: Title ---
        addSnap(0);
        tl.to(
          titleRow,
          {
            opacity: 0,
            y: -100,
            scale: 0.9,
            roundProps: 'y',
            force3D: false,
            duration: outputDuration,
            ease: 'power2.inOut',
          },
          0,
        );
        tl.to('.lp-root', { '--lp-bg': getMixedBg(null), duration: 0.01 }, 0);

        // --- Steps 1 to N ---
        featureRows.forEach((row, i) => {
          const titleBox = row.querySelector('.feat-title-inner');
          const numBox = row.querySelector('.feat-num-inner');
          const bodyBox = row.querySelector('.feat-body-inner');
          const imgBox = row.querySelector('.feat-img-box');
          const orb = row.querySelector('.feat-neon-orb');
          const accent = row.dataset.accent || '#38e07b';

          const tStartTransition = i * cycle;
          const tDelayStart = tStartTransition + outputDuration;
          const tInStart = tDelayStart + delayDuration;
          const tInEnd = tInStart + inputDuration;
          const tHoldEnd = tInEnd + holdDuration;
          const tSnapPoint = tInEnd + holdDuration / 2;
          const tOutStart = tHoldEnd;

          // Color change during delay gap using pre-calculated RGB
          const prevAccent =
            i === 0 ? null : featureRows[i - 1].dataset.accent || '#38e07b';
          tl.fromTo(
            '.lp-root',
            { '--lp-bg': getMixedBg(prevAccent) },
            {
              '--lp-bg': getMixedBg(accent),
              duration: delayDuration,
              ease: 'none',
            },
            tDelayStart,
          );

          // Animate IN
          tl.to(
            [titleBox, numBox, bodyBox],
            {
              opacity: 1,
              y: 0,
              roundProps: 'y',
              force3D: false,
              duration: inputDuration,
              ease: 'power1.inOut',
              stagger: 0.1,
            },
            tInStart,
          );
          tl.to(
            imgBox,
            {
              scale: 1,
              opacity: 1,
              force3D: false,
              duration: inputDuration,
              ease: 'power1.in',
            },
            tInStart,
          );
          tl.to(
            orb,
            {
              scale: 1,
              opacity: 0.15,
              force3D: false,
              duration: inputDuration,
              ease: 'power1.in',
            },
            tInStart,
          );

          tl.set(
            row,
            { pointerEvents: 'auto' },
            tInStart + inputDuration * 0.5,
          );

          // Hold state
          addSnap(tSnapPoint);

          // Animate OUT (Slides up, fades out fast, image scales to 0)
          if (i < totalCards - 1) {
            tl.to(
              [titleBox, numBox, bodyBox],
              {
                opacity: 0,
                y: -120,
                roundProps: 'y',
                force3D: false,
                duration: outputDuration,
                ease: 'power1.out',
                stagger: 0.05,
              },
              tOutStart,
            );
            tl.to(
              imgBox,
              {
                scale: 0,
                opacity: 0,
                force3D: false,
                duration: outputDuration,
                ease: 'power1.out',
              },
              tOutStart,
            );
            tl.to(
              orb,
              {
                scale: 0,
                opacity: 0,
                force3D: false,
                duration: outputDuration,
                ease: 'power1.out',
              },
              tOutStart,
            );

            tl.set(
              row,
              { pointerEvents: 'none' },
              tOutStart + outputDuration * 0.5,
            );
          }
        });

        // Force exact duration
        tl.set({}, {}, totalDuration);

        // The ScrollTrigger that scrubs the timeline
        ScrollTrigger.create({
          animation: tl,
          trigger: featViewport,
          start: 'top top',
          end: `+=${totalCards * window.innerHeight * 1.5}`, // Total scroll distance
          pin: true,
          scrub: 1, // Reduced from 1 to 0.15 for near-instant response
          snap: {
            snapTo: snapProgress,
            duration: { min: 0.2, max: 0.6 }, // Faster snap
            delay: 0,
            ease: 'power1.out',
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
