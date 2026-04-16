<script setup lang="ts">
// ── Chat rotativo ─────────────────────────────────────────────────
const chatIndex = ref(0);
let chatInterval: ReturnType<typeof setInterval> | undefined;

interface ChatMsg {
  from: string;
  text: string;
}
interface ChatTrack {
  name: string;
  artist: string;
  color: string;
  image?: string;
}
interface ChatConv {
  messages: ChatMsg[];
  tracks?: ChatTrack[];
}

const PRIMARY = '#38e07b';
const chatConversations: ChatConv[] = [
  {
    messages: [
      { from: 'user', text: 'Algo semelhante ao Bat Country do A7X' },
      { from: 'ai', text: 'Achei! Tocando agora:' },
    ],
    tracks: [
      {
        name: 'Critical Acclaim',
        artist: 'Avenged Sevenfold',
        color: PRIMARY,
        image: '/images/critical_acclaim.webp',
      },
    ],
  },
  {
    messages: [
      { from: 'user', text: 'Músicas da Metallica pra tocar agora' },
      { from: 'ai', text: 'Selecionei as melhores da Metallica:' },
    ],
    tracks: [
      {
        name: 'Enter Sandman',
        artist: 'Metallica',
        color: PRIMARY,
        image: '/images/enter_sandman.webp',
      },
      {
        name: 'Nothing Else Matters',
        artist: 'Metallica',
        color: PRIMARY,
        image: '/images/nothing_else_matters.webp',
      },
    ],
  },
  {
    messages: [
      { from: 'user', text: 'lembro que era algo tipo "movinon alexandria"' },
      { from: 'ai', text: 'Encontrei! Era esta:' },
    ],
    tracks: [
      {
        name: 'Moving On',
        artist: 'Asking Alexandria',
        color: PRIMARY,
        image: '/images/moving_on.webp',
      },
    ],
  },
  {
    messages: [
      {
        from: 'user',
        text: 'Adiciona as melhores do A7X na playlist "Best of A7X"',
      },
      { from: 'ai', text: 'Adicionei 8 faixas em "Best of A7X" ✓' },
    ],
    tracks: [
      {
        name: 'Nightmare',
        artist: 'Avenged Sevenfold',
        color: PRIMARY,
        image: '/images/nightmare.webp',
      },
      {
        name: 'Hail to the King',
        artist: 'Avenged Sevenfold',
        color: PRIMARY,
        image: '/images/hail_to_the_king.webp',
      },
    ],
  },
];
const currentChat = computed(() => chatConversations[chatIndex.value]);

onMounted(() => {
  chatInterval = setInterval(() => {
    chatIndex.value = (chatIndex.value + 1) % chatConversations.length;
  }, 7000);
});

onUnmounted(() => {
  clearInterval(chatInterval);
});
</script>

<template>
  <section
    data-section="chat"
    class="relative z-10 px-6 md:px-14 flex items-center min-h-[calc(100vh-64px)]"
  >
    <div
      class="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14"
    >
      <div class="reveal flex-1">
        <p
          class="text-[11px] text-primary/70 font-bold tracking-[0.25em] uppercase mb-4"
        >
          Simples assim
        </p>
        <h2
          class="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-6"
        >
          Uma conversa.<br />
          <span class="text-white/55">Resultado real.</span>
        </h2>
        <p class="text-white/65 text-sm leading-relaxed mb-7">
          Escreva do jeito que vier na cabeça: errado, incompleto, sem saber o
          nome certo. O assistente entende o que você quer e já age.
        </p>
        <ul class="space-y-3.5">
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span
              class="w-5 h-5 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5"
            >
              <UIcon name="i-lucide-search" class="w-3 h-3 text-primary" />
            </span>
            <span
              ><strong class="text-white/70 font-semibold"
                >Busca inteligente</strong
              >: encontra músicas mesmo com o nome errado ou incompleto</span
            >
          </li>
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span
              class="w-5 h-5 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5"
            >
              <UIcon name="i-lucide-play" class="w-3 h-3 text-primary" />
            </span>
            <span
              ><strong class="text-white/70 font-semibold"
                >Controle de reprodução</strong
              >: toca, pausa, avança, shuffle e volume pelo chat</span
            >
          </li>
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span
              class="w-5 h-5 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5"
            >
              <UIcon name="i-lucide-list-plus" class="w-3 h-3 text-primary" />
            </span>
            <span
              ><strong class="text-white/70 font-semibold"
                >Playlists sem esforço</strong
              >: cria, edita, adiciona e remove com um só comando</span
            >
          </li>
          <li class="flex items-start gap-3 text-sm text-white/60">
            <span
              class="w-5 h-5 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5"
            >
              <UIcon name="i-lucide-sparkles" class="w-3 h-3 text-primary" />
            </span>
            <span
              ><strong class="text-white/70 font-semibold"
                >Recomendações que fazem sentido</strong
              >: descobre em segundos músicas que combinam com o que você
              ama</span
            >
          </li>
        </ul>
      </div>

      <div class="reveal flex-1 w-full max-w-sm">
        <!-- Chat window with NuxtUI UCard -->
        <UCard
          class="glass-card flex flex-col h-[440px] overflow-hidden rounded-2xl bg-transparent ring-0 divide-y divide-white/5"
          :ui="{
            header: 'p-0 sm:p-0',
            body: 'p-0 sm:p-0 flex flex-1 flex-col overflow-hidden min-h-0',
            footer: 'p-0 sm:p-0',
          }"
        >
          <!-- Header -->
          <template #header>
            <div
              class="flex items-center gap-3 bg-black/20 shrink-0 w-full px-4 py-3"
            >
              <UAvatar
                icon="i-lucide-bot"
                size="sm"
                class="bg-primary/20 text-primary"
              />
              <span class="text-sm font-bold text-white/80">Assistente IA</span>
            </div>
          </template>

          <div class="flex-1 overflow-y-auto p-4 w-full h-full">
            <Transition name="chat-fade" mode="out-in">
              <div :key="chatIndex" class="flex flex-col gap-3">
                <div
                  v-for="(msg, i) in currentChat.messages"
                  :key="i"
                  class="flex"
                  :class="msg.from === 'user' ? 'justify-end' : 'justify-start'"
                >
                  <div
                    class="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%]"
                    :class="
                      msg.from === 'user'
                        ? 'bg-white/10 text-white/80 border border-white/5 rounded-tr-sm'
                        : 'bg-primary/12 text-white/80 border border-primary/15 rounded-tl-sm'
                    "
                  >
                    {{ msg.text }}
                  </div>
                </div>

                <!-- Track items using NuxtUI -->
                <div
                  v-if="currentChat.tracks?.length"
                  class="flex flex-col gap-2 mt-1"
                >
                  <UCard
                    v-for="t in currentChat.tracks"
                    :key="t.name"
                    class="group bg-white/5 hover:bg-white/10 transition-all cursor-pointer w-full ring-0! border border-transparent hover:border-white/10"
                    :ui="{ body: 'p-2.5 sm:p-2.5 flex items-center gap-3' }"
                  >
                    <UAvatar
                      :src="t.image"
                      :icon="!t.image ? 'i-lucide-music' : undefined"
                      size="md"
                      class="rounded-lg bg-white/5"
                      :style="!t.image ? { color: t.color } : {}"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-bold text-white truncate">
                        {{ t.name }}
                      </p>
                      <p class="text-xs text-white/60 truncate">
                        {{ t.artist }}
                      </p>
                    </div>
                    <UButton
                      icon="i-heroicons-play-solid"
                      color="primary"
                      variant="solid"
                      class="shadow-lg group-hover:scale-105 transition-transform rounded-full"
                      size="sm"
                      :style="{ backgroundColor: t.color }"
                    />
                  </UCard>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Input fake using NuxtUI -->
          <template #footer>
            <div class="w-full bg-black/20 px-4 py-3">
              <UInput
                placeholder="Escreva algo..."
                disabled
                size="md"
                variant="outline"
                color="gray"
                class="bg-white/5 border-white/8 text-white/40 rounded-full [&>input]:rounded-full"
              >
                <template #trailing>
                  <UButton
                    icon="i-lucide-send"
                    color="primary"
                    variant="link"
                    size="xs"
                    :padded="false"
                  />
                </template>
              </UInput>
            </div>
          </template>
        </UCard>

        <!-- Indicadores -->
        <div class="flex justify-center gap-1.5 mt-3">
          <button
            v-for="(_, i) in chatConversations"
            :key="i"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="i === chatIndex ? 'bg-primary w-4' : 'bg-white/20 w-1.5'"
            @click="chatIndex = i"
            aria-label="Trocar conversa"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Scroll reveal (estado inicial) ── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
}

/* ── Glassmorphism ── */
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* ── Chat transition ── */
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
