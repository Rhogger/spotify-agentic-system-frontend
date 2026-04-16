<script setup lang="ts">
import HeroParticles from './HeroParticles.vue';

defineEmits<{ (e: 'login'): void }>();

const heroLine1 = 'Diga o que quer'.split('');
const heroLine2 = 'ouvir.'.split('');
</script>

<template>
  <section
    data-section="hero"
    class="relative h-screen flex flex-col pt-[64px]"
  >
    <HeroParticles class="absolute inset-0 z-0" />

    <div class="relative z-10 flex-1 flex flex-col">
      <div
        class="flex-1 flex flex-col items-center justify-center px-6 text-center min-h-0"
      >
        <UBadge
          color="primary"
          variant="soft"
          class="hero-badge mb-8 px-4 py-1.5 rounded-full border border-primary/25 text-[11px] font-bold tracking-widest uppercase gap-2 items-center"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary blink block" />
          Controle o Spotify com palavras
        </UBadge>

        <h1
          class="hero-title font-black leading-none tracking-tighter max-w-4xl"
        >
          <span
            class="block text-[clamp(2.8rem,8vw,6rem)] text-white overflow-hidden pb-[0.2em] -mb-[0.2em]"
          >
            <span
              v-for="(char, i) in heroLine1"
              :key="`l1-${i}`"
              class="hero-char inline-block whitespace-pre"
              >{{ char }}</span
            >
          </span>
          <span
            class="block text-[clamp(2.8rem,8vw,6rem)] grad-text overflow-hidden pb-[0.2em] -mb-[0.2em]"
          >
            <span
              v-for="(char, i) in heroLine2"
              :key="`l2-${i}`"
              class="hero-char-accent inline-block"
              >{{ char }}</span
            >
          </span>
        </h1>

        <p
          class="hero-sub mt-6 text-base sm:text-lg text-white/65 max-w-md leading-relaxed"
        >
          Conecte sua conta Spotify e converse com um assistente que entende
          você e cuida da sua música.
        </p>

        <div class="hero-cta mt-10 flex flex-col items-center gap-4">
          <div class="cta-primary-wrap relative">
            <UButton
              size="xl"
              class="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary text-black font-black text-[15px] overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_32px_rgba(56,224,123,0.4)] hover:shadow-[0_0_52px_rgba(56,224,123,0.65)]"
              @click="$emit('login')"
            >
              <UIcon
                name="i-simple-icons-spotify"
                class="w-5 h-5 relative z-10"
              />
              <span class="relative z-10">Entrar com Spotify</span>
              <span class="btn-shine" />
            </UButton>
            <div class="cta-pulse-ring" />
          </div>
        </div>

        <p
          class="hero-trust mt-5 flex items-center justify-center gap-4 text-[11px] text-white/55 font-medium"
        >
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-check" class="text-primary w-3 h-3" /> Grátis
          </span>
          <span class="w-px h-3 bg-white/15" />
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-check" class="text-primary w-3 h-3" /> 1
            clique
          </span>
          <span class="w-px h-3 bg-white/15" />
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-check" class="text-primary w-3 h-3" /> Sem
            cadastro
          </span>
        </p>

        <div class="scroll-indicator mt-6 flex flex-col items-center gap-1">
          <div
            class="scroll-mouse border-2 border-primary/30 bg-primary/5 relative overflow-hidden rounded-full w-6 h-10"
          >
            <div
              class="scroll-dot bg-primary w-1 h-2 rounded-sm absolute left-1/2 top-2 -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes hero-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  opacity: 1;
}
.hero-char,
.hero-char-accent {
  display: inline-block;
  will-change: transform, opacity;
}

.hero-badge {
  opacity: 0;
  animation: hero-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
}
.hero-sub {
  opacity: 0;
  animation: hero-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}
.hero-cta {
  opacity: 0;
  animation: hero-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.42s forwards;
}
.hero-trust {
  opacity: 0;
  animation: hero-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.52s forwards;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}
.blink {
  animation: blink 1.8s ease-in-out infinite;
  will-change: opacity;
}

.scroll-indicator {
  opacity: 0;
  animation: hero-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
}
.scroll-dot {
  animation: scroll-bounce 1.8s ease-in-out infinite;
  will-change: transform, opacity;
}
@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateX(-50%) translateY(14px);
    opacity: 0.3;
  }
}

[data-section='hero'] {
  overflow: visible;
}
</style>
