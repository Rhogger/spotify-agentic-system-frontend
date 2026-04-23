<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface FeatureItem {
  icon: string;
  title: string;
  body: string;
  accent: string;
  image: string;
  tag: string;
}

const features: FeatureItem[] = [
  {
    icon: 'i-lucide-sliders-horizontal',
    title: 'Música do seu jeito',
    body: 'Ajuste nossos controles para escolher exatamente como a música deve soar. Receba recomendações feitas sob medida para as suas escolhas.',
    accent: '#38e07b',
    image: '/images/feat_voice_search.png',
    tag: 'Sons sob Medida',
  },
  {
    icon: 'i-lucide-sparkles',
    title: 'Encontre músicas "iguais a essa"',
    body: 'Sabe aquela música que não sai do repeat? É só pedir e sugerimos na hora outras opções com o mesmo estilo e energia para você.',
    accent: '#2dd4bf',
    image: '/images/feat_playlists.png',
    tag: 'Recomendações',
  },
  {
    icon: 'i-lucide-list-music',
    title: 'Suas playlists, suas regras',
    body: 'Crie, apague ou organize suas playlists em poucos segundos. Adicione novas descobertas na sua conta sem precisar abrir o app.',
    accent: '#38bdf8',
    image: '/images/feat_control.png',
    tag: 'Gestão Fácil',
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'Um DJ direto no seu chat',
    body: 'Peça para tocar uma música, pausar ou pular de faixa. Controle tudo o que você escuta apenas conversando, de um jeito simples e natural.',
    accent: '#c084fc',
    image: '/images/feat_discovery.png',
    tag: 'Controle por Chat',
  },
  {
    icon: 'i-lucide-mic',
    title: 'Voz ou texto, você escolhe',
    body: 'Escreva uma mensagem rápida ou use atalhos para enviar um áudio pelo celular. Peça sua música falando naturalmente, como se fosse um amigo.',
    accent: '#f43f5e',
    image: '/images/feat_voice_search.png',
    tag: 'Comandos de Voz',
  },
  {
    icon: 'i-lucide-compass',
    title: 'Descubra conversando',
    body: 'Não tem ideia do que escutar? Troque uma ideia sobre o seu humor ou o que está fazendo no momento, e montamos a trilha sonora perfeita para você.',
    accent: '#eab308',
    image: '/images/feat_playlists.png',
    tag: 'Exploração',
  },
];

// Pixel Perfect Logic: Force even container width to ensure integer column pixels
const gridWrapperRefs = ref<HTMLElement[]>([]);
const gridWidths = ref<Record<number, number>>({});
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const target = entry.target as HTMLElement;
      const index = parseInt(target.dataset.index || '0');
      // Arredonda para baixo para o par mais próximo (ex: 547 -> 546)
      // Isso garante que 50% seja sempre um número inteiro (ex: 273)
      const roundedWidth = Math.floor(entry.contentRect.width / 2) * 2;
      gridWidths.value[index] = roundedWidth;
    }
  });

  gridWrapperRefs.value.forEach((el) => {
    if (el) resizeObserver?.observe(el);
  });
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <section data-section="features" id="features" class="relative w-full">
    <!-- Pinned Slider Viewport -->
    <div
      class="features-viewport w-full h-screen relative bg-transparent overflow-hidden"
    >
      <!-- TITLE SECTION (Acts as feature 0) -->
      <div
        class="feature-title-row absolute inset-0 w-full h-full flex items-center justify-center px-6 md:px-14 z-20 pointer-events-none"
      >
        <div
          class="max-w-4xl mx-auto w-full text-center flex flex-col items-center"
        >
          <div class="overflow-hidden mb-6">
            <p
              class="feat-title-tag text-[11px] text-primary/70 font-bold tracking-[0.25em] uppercase block transform translate-y-full opacity-0"
            >
              Descubra o Poder
            </p>
          </div>
          <h2
            class="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.2] text-white flex flex-wrap justify-center gap-x-4 gap-y-2"
          >
            <span class="overflow-hidden">
              <span
                class="feat-title-word block transform translate-y-[110%] rotate-3 origin-bottom-left opacity-0"
              >
                Seu
              </span>
            </span>
            <span class="overflow-hidden">
              <span
                class="feat-title-word block text-primary transform translate-y-[110%] rotate-3 origin-bottom-left opacity-0"
              >
                som.
              </span>
            </span>

            <span class="overflow-hidden">
              <span
                class="feat-title-word block transform translate-y-[110%] rotate-3 origin-bottom-left opacity-0"
              >
                Suas
              </span>
            </span>

            <span class="overflow-hidden">
              <span
                class="feat-title-word block text-primary transform translate-y-[110%] rotate-3 origin-bottom-left opacity-0"
              >
                regras.
              </span>
            </span>
          </h2>
          <div class="overflow-hidden mt-8 max-w-xl">
            <p
              class="feat-title-desc text-lg md:text-xl text-white/60 font-medium leading-relaxed block transform translate-y-full opacity-0"
            >
              Não é apenas dar play. É assumir o controle total da sua
              experiência musical interagindo com inteligência e ferramentas
              exclusivas.
            </p>
          </div>
        </div>
      </div>

      <!-- Cada feature ocupa a tela toda e fica sobreposta (absolute) -->
      <div
        v-for="(feature, i) in features"
        :key="i"
        class="feature-row absolute inset-0 w-full h-full flex items-center justify-center px-6 md:px-14 opacity-0 pointer-events-none"
        :data-accent="feature.accent"
      >
        <div
          class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
        >
          <!-- Text Box Layout -->
          <div
            ref="gridWrapperRefs"
            :data-index="i"
            class="feat-text-box mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 bg-transparent"
            :class="i % 2 !== 0 ? 'md:order-2' : ''"
            :style="{ width: gridWidths[i] ? `${gridWidths[i]}px` : '100%' }"
          >
            <!-- Top Left: Title Box -->
            <div
              class="feat-title-wrap aspect-square bg-transparent overflow-hidden relative min-h-0"
            >
              <div
                class="feat-title-inner absolute inset-0 flex items-center justify-center"
                :style="{ backgroundColor: feature.accent }"
              >
                <div class="max-w-[80%] text-left">
                  <h3
                    class="text-3xl lg:text-[2.25rem] font-medium text-[#0c0c0c] tracking-tight leading-snug"
                  >
                    {{ feature.title }}
                  </h3>
                </div>
              </div>
            </div>

            <!-- Top Right: Number -->
            <div
              class="feat-num-wrap aspect-square hidden md:block bg-transparent overflow-hidden relative min-h-0"
            >
              <div
                class="feat-num-inner absolute inset-0 flex items-center justify-center"
              >
                <span
                  class="text-8xl lg:text-[9rem] font-bold leading-none opacity-80"
                  :style="{ color: feature.accent }"
                >
                  {{ i + 1 }}
                </span>
              </div>
            </div>

            <!-- Bottom Left: Empty -->
            <div
              class="aspect-square hidden md:block bg-transparent min-h-0"
            ></div>

            <!-- Bottom Right: Body Text -->
            <div
              class="feat-body-wrap aspect-square bg-transparent overflow-hidden relative min-h-0"
            >
              <div
                class="feat-body-inner absolute inset-0 flex items-center justify-center md:border"
                :style="{
                  borderColor: `color-mix(in srgb, ${feature.accent} 25%, transparent)`,
                }"
              >
                <div class="max-w-[80%] text-left">
                  <p
                    class="text-base lg:text-lg leading-relaxed font-medium"
                    :style="{ color: feature.accent }"
                  >
                    {{ feature.body }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Image Box with Neon Orb -->
          <div
            class="relative w-full aspect-square flex items-center justify-center"
            :class="i % 2 !== 0 ? 'md:order-1' : ''"
          >
            <!-- Neon Orb -->
            <div
              class="feat-neon-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              :style="{
                backgroundColor: feature.accent,
                width: '130%',
                height: '130%',
                filter: 'blur(110px)',
                opacity: 0,
              }"
            ></div>

            <div
              class="feat-img-box w-full h-full bg-[#111] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] relative z-10"
            >
              <img
                :src="feature.image"
                :alt="feature.title"
                class="feat-img w-full h-full object-cover origin-center transition-transform duration-300 hover:scale-[1.02]"
              />
              <div
                class="absolute inset-0 border border-white/10 pointer-events-none"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feat-title-inner,
.feat-num-inner,
.feat-body-inner {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  will-change: transform, opacity;
}
</style>
