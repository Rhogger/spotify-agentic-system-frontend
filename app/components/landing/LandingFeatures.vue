<script setup lang="ts">
interface FeatureItem {
  icon: string;
  title: string;
  body: string;
  accent: string;
}

const features: FeatureItem[] = [
  {
    icon: 'i-lucide-mic-2',
    title: 'Diga o que quer ouvir',
    body: 'Escreva do jeito que fala: "algo pra focar", "vibe anos 80" ou "parecido com Arctic Monkeys". A gente entende.',
    accent: '#38e07b',
  },
  {
    icon: 'i-lucide-list-music',
    title: 'Playlists que se organizam sozinhas',
    body: 'Crie, adicione e edite playlists com um comando. Sem ficar clicando em tudo. Sem perder tempo.',
    accent: '#2dd4bf',
  },
  {
    icon: 'i-lucide-radio',
    title: 'Controle total pelo chat',
    body: 'Pause, avance, shuffle, repeat, volume. Tudo com uma mensagem. Nem precisa tocar no player.',
    accent: '#38bdf8',
  },
  {
    icon: 'i-lucide-sparkles',
    title: 'Descubra músicas que vão te pegar',
    body: 'Não são listas aleatórias. São recomendações baseadas no que você já ama, e no que você ainda vai descobrir.',
    accent: '#c084fc',
  },
];

function onCardTilt(e: MouseEvent) {
  const current = e.currentTarget as HTMLElement | { $el: HTMLElement } | null;
  const el =
    current && '$el' in current ? current.$el : (current as HTMLElement | null);
  if (!el || !(el instanceof HTMLElement)) return;

  const r = el.getBoundingClientRect();
  const width = r.width || 1;
  const height = r.height || 1;
  const x = ((e.clientX - r.left) / width - 0.5) * 2;
  const y = ((e.clientY - r.top) / height - 0.5) * 2;

  el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
}

function onCardUntilt(e: MouseEvent) {
  const current = e.currentTarget as HTMLElement | { $el: HTMLElement } | null;
  const el =
    current && '$el' in current ? current.$el : (current as HTMLElement | null);
  if (!el || !(el instanceof HTMLElement)) return;

  el.style.transform =
    'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
}
</script>

<template>
  <section
    data-section="features"
    id="features"
    class="relative z-10 px-6 md:px-14 flex items-center min-h-[calc(100vh-64px)]"
  >
    <div class="max-w-5xl mx-auto w-full">
      <div class="reveal text-center mb-16">
        <p
          class="text-[11px] text-primary/70 font-bold tracking-[0.25em] uppercase mb-4"
        >
          O que você pode fazer
        </p>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
        >
          Música do jeito que<br />você sempre quis.
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <UCard
          v-for="(feature, i) in features"
          :key="i"
          class="reveal feat-card cursor-default bg-transparent ring-0! border-0 shadow-none [&>div]:p-8 [&>div]:sm:p-8 [&>div]:h-full [&>div]:flex [&>div]:flex-col"
          :class="`reveal-delay-${i}`"
          :style="{ '--accent': feature.accent }"
          @mousemove="onCardTilt"
          @mouseleave="onCardUntilt"
        >
          <div class="flex items-start justify-between mb-6">
            <div
              class="w-[52px] h-[52px] rounded-xl flex items-center justify-center relative z-10"
              :style="{
                background: `color-mix(in srgb, ${feature.accent} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${feature.accent} 22%, transparent)`,
              }"
            >
              <UIcon
                :name="feature.icon"
                class="w-6 h-6"
                :style="{ color: feature.accent }"
              />
            </div>
            <span class="feat-num relative z-10">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>
          <h3
            class="relative z-10 text-lg font-black text-white mb-2 leading-snug"
          >
            {{ feature.title }}
          </h3>
          <p class="relative z-10 text-sm text-white/65 leading-relaxed">
            {{ feature.body }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(40px);
}

.reveal-delay-0 {
  transition-delay: 0ms;
}
.reveal-delay-1 {
  transition-delay: 70ms;
}
.reveal-delay-2 {
  transition-delay: 140ms;
}
.reveal-delay-3 {
  transition-delay: 210ms;
}

@property --card-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.feat-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  isolation: isolate;
  will-change: transform;
  transition:
    transform 0.15s ease-out,
    box-shadow 0.3s ease,
    background 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
}
.feat-card:hover {
  background: rgba(255, 255, 255, 0.05);
}
.feat-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--card-angle) at 50% 50%,
    transparent 0deg,
    var(--accent) 70deg,
    transparent 140deg
  );
  animation: card-border-spin 8s linear infinite;
  z-index: -1;
  opacity: 0.15;
  will-change: transform, opacity;
  transition: opacity 0.4s ease;
}
.feat-card::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: calc(1rem - 1px);
  background: #152b1b;
  z-index: -1;
}
.feat-card:hover::before {
  opacity: 1;
}
.feat-card:hover {
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 48px color-mix(in srgb, var(--accent) 8%, transparent);
}
@keyframes card-border-spin {
  to {
    --card-angle: 360deg;
  }
}

.feat-num {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 255, 255, 0.04);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  user-select: none;
  z-index: 10;
  transition: color 0.4s;
  will-change: color;
}
.feat-card:hover .feat-num {
  color: color-mix(in srgb, var(--accent) 12%, transparent);
}
</style>
