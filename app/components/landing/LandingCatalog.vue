<script setup lang="ts">
const props = defineProps<{
  counters: { value: number; target: number; suffix: string; label: string; decimals?: number }[]
}>();

const genres = [
  'Pop','Dance pop','Hip-Hop','Rock','Indie','Lo-fi','Metal','R&B','Soul','Jazz',
  'Eletrônico','House','Techno','Trap','Drill','Funk','MPB','Sertanejo','Bossa Nova',
  'Clássico','Folk','Acoustic','K-pop','Reggae','Blues','Gospel','Latin','Afrobeat',
  'Drum and Bass','Ambient','Punk','Grunge','Emo','Ska','Neo soul','Progressive',
  'Alternative','Synthwave','Indie pop','Country',
];
</script>

<template>
  <section data-section="catalog" class="relative z-10 min-h-[calc(100vh-64px)] flex flex-col justify-center py-16">
    <div class="max-w-5xl mx-auto px-6 md:px-14 w-full">

      <!-- Título -->
      <div class="reveal text-center mb-12">
        <p class="text-[11px] text-primary/70 font-bold tracking-[0.25em] uppercase mb-3">Nosso catálogo</p>
        <h2 class="text-3xl sm:text-4xl font-black tracking-tight">
          Tamanho que importa
        </h2>
      </div>

      <!-- Stats grid -->
      <div class="reveal stats-trigger grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div
          v-for="(c, i) in props.counters"
          :key="c.label"
          class="stat-card flex flex-col items-center justify-center py-8 cursor-default"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <span class="text-3xl md:text-4xl font-black text-primary tabular-nums mb-2">
            {{ c.decimals ? c.value.toFixed(c.decimals) : c.value }}{{ c.suffix }}
          </span>
          <span class="text-xs text-white/65 font-medium text-center">{{ c.label }}</span>
        </div>
      </div>

      <!-- Audio Features -->
      <div class="reveal text-center mb-12">
        <p class="text-white/60 text-sm mb-3">Recomendação baseada em <span class="text-primary font-semibold">7 características</span>:</p>
        <div class="flex flex-wrap justify-center gap-2">
          <span class="feature-pill">Energia</span>
          <span class="feature-pill">Dançabilidade</span>
          <span class="feature-pill">Valência</span>
          <span class="feature-pill">Acusticidade</span>
          <span class="feature-pill">Explícito</span>
          <span class="feature-pill">Popular</span>
          <span class="feature-pill">Década</span>
        </div>
      </div>

      <!-- Marquee de gêneros -->
      <div class="reveal border-t border-white/5 pt-8">
        <p class="text-center text-white/55 text-xs font-medium mb-4 tracking-wider uppercase">Gêneros disponíveis</p>
        <div class="marquee-wrapper-fade">
          <div class="marquee-inner">
            <div class="marquee-track">
              <span v-for="(g,i) in genres" :key="`a-${i}`" class="genre-pill">{{ g }}</span>
              <span v-for="(g,i) in genres" :key="`b-${i}`" class="genre-pill" aria-hidden="true">{{ g }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Scroll reveal (estado inicial) ── */
.reveal { opacity: 0; transform: translateY(40px); }

/* ── Stat cards ── */
.stat-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 1rem;
  transition: all 0.3s ease;
}
.stat-card:hover {
  background: rgba(56,224,123,0.05);
  border-color: rgba(56,224,123,0.15);
  transform: translateY(-2px);
}

/* ── Feature pills ── */
.feature-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(56,224,123,0.15);
  background: rgba(56,224,123,0.05);
  color: rgba(56,224,123,0.9);
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.feature-pill:hover {
  border-color: rgba(56,224,123,0.4);
  background: rgba(56,224,123,0.1);
}

/* ── Marquee ── */
.marquee-wrapper-fade {
  position: relative;
  overflow: hidden;
}
.marquee-wrapper-fade::before,
.marquee-wrapper-fade::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 10;
  pointer-events: none;
}
.marquee-wrapper-fade::before {
  left: 0;
  background: linear-gradient(to right, #0b1810 0%, #0b1810 40%, transparent 100%);
}
.marquee-wrapper-fade::after {
  right: 0;
  background: linear-gradient(to left, #0b1810 0%, #0b1810 40%, transparent 100%);
}
.marquee-inner { overflow: hidden; }
.marquee-track {
  display: flex;
  gap: 12px;
  width: max-content;
  animation: marquee-slide 40s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }
@keyframes marquee-slide {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.genre-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.65);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  cursor: default;
  transition: all 0.25s;
}
.genre-pill:hover {
  border-color: rgba(56,224,123,0.4);
  color: #38e07b;
  background: rgba(56,224,123,0.07);
}
</style>
