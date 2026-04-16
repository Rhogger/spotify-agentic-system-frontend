<script setup lang="ts">
const props = defineProps<{
  bars: number[];
  barsMirror: number[];
}>();

defineEmits(['login']);
</script>

<template>
  <section
    data-section="cta"
    class="relative z-10 overflow-hidden flex items-center min-h-[calc(100vh-64px)]"
  >
    <!-- Background layers -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[#0b1810]" />

      <!-- Bars topo: espelho invertido das de baixo -->
      <div
        class="absolute top-0 inset-x-0 flex items-start overflow-hidden"
        style="height: 100px"
      >
        <div
          v-for="(h, i) in props.barsMirror"
          :key="`ct-${i}`"
          class="flex-1 rounded-b-sm"
          :style="{
            height: `${Math.max(10, h * 100)}%`,
            background: `rgba(56,224,123,${0.12 + h * 0.55})`,
          }"
        />
      </div>

      <!-- Bars fundo: ondas principais -->
      <div
        class="absolute bottom-0 inset-x-0 flex items-end overflow-hidden"
        style="height: 100px"
      >
        <div
          v-for="(h, i) in props.bars"
          :key="`cb-${i}`"
          class="flex-1 rounded-t-sm"
          :style="{
            height: `${Math.max(10, h * 100)}%`,
            background: `rgba(56,224,123,${0.12 + h * 0.55})`,
          }"
        />
      </div>

      <!-- Fade suave entre as waves e o fundo -->
      <div
        class="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-[#0b1810] to-transparent"
      />
      <div
        class="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-[#0b1810] to-transparent"
      />

      <!-- Glow central -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="w-[900px] h-[500px] rounded-full blur-[130px] opacity-10"
          style="
            background: radial-gradient(
              ellipse,
              #38e07b 0%,
              #7c6af7 55%,
              transparent 70%
            );
          "
        />
      </div>
    </div>

    <!-- Content -->
    <div class="reveal relative text-center max-w-3xl mx-auto px-6">
      <p
        class="text-primary text-[11px] font-bold tracking-[0.3em] uppercase mb-10"
      >
        Pronto para começar?
      </p>

      <h2
        class="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] mb-10"
      >
        Sua próxima<br />
        <span class="grad-text">música favorita</span><br />
        está esperando.
      </h2>

      <p class="text-white/60 text-lg leading-relaxed mb-14 max-w-sm mx-auto">
        Uma conta Spotify é tudo o que você precisa.
      </p>

      <div class="flex justify-center">
        <div class="cta-primary-wrap">
          <button
            class="group relative flex items-center gap-3 px-12 py-5 rounded-full bg-primary text-black font-black text-lg overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_60px_rgba(56,224,123,0.5)] hover:shadow-[0_0_90px_rgba(56,224,123,0.75)]"
            @click="$emit('login')"
          >
            <UIcon
              name="i-simple-icons-spotify"
              class="w-6 h-6 relative z-10"
            />
            <span class="relative z-10">Começar agora</span>
            <span class="btn-shine" />
          </button>
          <div class="cta-pulse-ring" />
        </div>
      </div>

      <p class="mt-8 text-white/50 text-sm">
        Grátis · Sem cartão · Só entra com sua conta Spotify
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ── Scroll reveal (estado inicial) ── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
}

/* ── Gradient text ── */
.grad-text {
  background: linear-gradient(120deg, #38e07b 0%, #1db954 40%, #7c6af7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── CTA primary wrap (pulse ring) ── */
.cta-primary-wrap {
  position: relative;
  display: inline-flex;
}
.cta-pulse-ring {
  position: absolute;
  inset: -8px;
  border-radius: 9999px;
  border: 2px solid rgba(56, 224, 123, 0.3);
  animation: pulse-ring 2.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes pulse-ring {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.08);
    opacity: 0;
  }
}

/* ── Btn shine ── */
.btn-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 25%,
    rgba(255, 255, 255, 0.28) 50%,
    transparent 75%
  );
  background-size: 300% 100%;
  background-position: -100% 0;
}
button:hover .btn-shine {
  animation: shine-move 0.55s ease forwards;
}
@keyframes shine-move {
  from {
    background-position: -100% 0;
  }
  to {
    background-position: 200% 0;
  }
}
</style>
