<script setup lang="ts">
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

const rowRefs = ref<HTMLElement[]>([]);

// Navega até o card clicando na aba: calcula a posição de scroll
// baseada no range do ScrollTrigger que pina a seção.
function scrollToFeature(i: number): void {
  const viewport = document.querySelector('.features-viewport');
  if (!viewport) return;
  const viewportTop = viewport.getBoundingClientRect().top + window.scrollY;
  // Cada card ocupa 1 viewport de scroll no range pinado
  const scrollPerCard = window.innerHeight * 0.7;
  const target = viewportTop + i * scrollPerCard;
  window.scrollTo({ top: target, behavior: 'smooth' });
}
</script>

<template>
  <section data-section="features" id="features" class="relative">
    <!-- Cabeçalho da seção — flui normalmente antes do pin -->
    <div class="px-6 md:px-14 pt-32">
      <div class="max-w-6xl mx-auto w-full">
        <div class="text-center mb-32 md:mb-48">
          <p
            class="text-[11px] text-primary/70 font-bold tracking-[0.25em] uppercase mb-4"
          >
            O que você pode fazer
          </p>
          <h2
            class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight text-white mb-6"
          >
            Música do jeito que<br />você sempre quis.
          </h2>
        </div>
      </div>
    </div>

    <!-- Viewport para Pinned Stack Cards — pinado via GSAP no desktop -->
    <div class="features-viewport relative px-6 md:px-14 pb-16 md:pb-0">
      <div class="features-stack max-w-6xl mx-auto w-full relative md:h-screen">
        <div
          v-for="(feature, i) in features"
          :key="i"
          :ref="
            (el) => {
              if (el) rowRefs[i] = el as HTMLElement;
            }
          "
          class="feature-row static md:absolute md:left-0 md:right-0 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-16 md:mb-0"
          :style="{ top: `calc(15vh + ${i * 44}px)`, zIndex: i + 1 }"
        >
          <!-- Text Box Layout -->
          <div
            class="feat-text-box relative w-full aspect-square md:aspect-auto md:h-auto lg:aspect-square transition-all duration-500 overflow-hidden grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 rounded-4xl bg-transparent"
            :class="i % 2 !== 0 ? 'md:order-2' : ''"
          >
            <!-- Top Left: Title Box (Solid Background) -->
            <div class="flex flex-col justify-center p-8 lg:p-10 rounded-tl-4xl" :style="{ backgroundColor: feature.accent }">
              <h3 class="text-3xl lg:text-[2.25rem] font-medium text-[#0c0c0c] tracking-tight leading-snug">
                {{ feature.title }}
              </h3>
            </div>
            
            <!-- Top Right: Number (Transparent bg, dark font) -->
            <div class="hidden md:flex items-center justify-center p-8 lg:p-10 bg-transparent">
              <span class="text-8xl lg:text-[9rem] font-bold leading-none opacity-80" :style="{ color: feature.accent }">
                {{ i + 1 }}
              </span>
            </div>
            
            <!-- Bottom Left: Empty (Transparent bg) -->
            <div class="hidden md:block bg-transparent"></div>
            
            <!-- Bottom Right: Body Text (Bordered, Transparent bg, colored text) -->
            <div class="flex flex-col justify-center p-8 lg:p-10 md:border-l md:border-t bg-transparent" :style="{ borderColor: `color-mix(in srgb, ${feature.accent} 25%, transparent)` }">
              <p class="text-base lg:text-lg leading-relaxed font-medium" :style="{ color: feature.accent }">
                {{ feature.body }}
              </p>
            </div>
          </div>

          <!-- Image Box (Imagem full) -->
          <div
            class="feat-img-box relative w-full aspect-square md:aspect-auto md:h-auto lg:aspect-square rounded-4xl bg-[#111] overflow-hidden shadow-2xl"
            :class="i % 2 !== 0 ? 'md:order-1' : ''"
          >
            <img
              :src="feature.image"
              :alt="feature.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 border border-white/10 rounded-4xl pointer-events-none"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Card stacking é controlado inteiramente por GSAP no desktop.
   Os cards usam position:absolute + translateY animado via GSAP timeline.
   No mobile (< md), cards ficam em flow estático normal. */
</style>
