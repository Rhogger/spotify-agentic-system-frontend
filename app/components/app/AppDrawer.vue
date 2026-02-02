<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { marked } from 'marked';
import type { Message } from '~/models/message';
import { iconButton } from '~/binds/buttons';
import { useChatDrawer } from '~/composables/useChatDrawer';
import { useAgentChat } from '~/composables/useAgentChat';
import { useSpotifyPlayer } from '~/composables/useSpotifyPlayer';

const { isOpen } = useChatDrawer();
const { messages, isLoading, sendMessage, resetSession, fetchSession } =
  useAgentChat();
const { play } = useSpotifyPlayer();

onMounted(() => {
  fetchSession();
});

const inputValue = ref('');
const status = computed(() => (isLoading.value ? 'streaming' : 'ready'));

const scrollContainer = ref<HTMLElement | null>(null);

function handleSend() {
  if (!inputValue.value.trim() || isLoading.value) return;
  const content = inputValue.value;
  inputValue.value = '';
  sendMessage(content);
}

function playTrack(spotifyId: string) {
  play({ uris: [`spotify:track:${spotifyId}`] });
}

// Config marked to be safe
marked.setOptions({
  breaks: true,
  gfm: true,
});

function parseMarkdown(text: string) {
  return marked.parse(text) as string;
}

// Auto scroll to bottom
watch(
  () => messages.value.length,
  () => {
    nextTick(() => {
      // Scroll logic if needed, usually UChatMessages handles it or we can find the element
    });
  },
);
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    :ui="{
      overlay: 'bg-black/60 backdrop-blur-sm',
      content:
        'bg-surface-base border-l border-border flex flex-col max-w-md w-full md:w-[40%] md:max-w-none',
    }"
  >
    <template #content>
      <div
        class="flex items-center justify-between p-4 border-b border-border bg-surface-base/50 backdrop-blur-md sticky top-0 z-10"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"
          >
            <UIcon name="i-lucide-bot" class="w-6 h-6" />
          </div>

          <h3 class="text-lg font-bold text-text-main">Assistente IA</h3>
        </div>

        <div class="flex items-center gap-2">
          <UTooltip text="Resetar sessão">
            <UButton
              v-bind="iconButton"
              icon="i-heroicons-arrow-path"
              size="xs"
              @click="resetSession"
            />
          </UTooltip>
          <UButton
            v-bind="iconButton"
            icon="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </div>

      <UChatPalette class="flex-1 flex flex-col min-h-0">
        <UChatMessages
          :messages="messages"
          :status="status"
          :user="
            {
              color: 'neutral',
              variant: 'subtle',
              ui: {
                root: 'flex-row-reverse',
                content:
                  'bg-surface-elevated text-text-main border border-white/5 shadow-inner px-4 py-2.5 rounded-2xl',
              },
            } as any
          "
          :assistant="
            {
              variant: 'soft',
              ui: {
                root: 'max-w-none w-full',
                content:
                  'max-w-none bg-white/5 border border-white/5 rounded-2xl shadow-sm',
              },
            } as any
          "
        >
          <template #indicator>
            <div
              class="flex items-center gap-3 px-4 py-3 text-primary animate-pulse"
            >
              <div class="flex gap-1.5">
                <span
                  class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"
                ></span>
                <span
                  class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"
                ></span>
                <span
                  class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                ></span>
              </div>
              <span
                class="text-xs font-semibold tracking-wider uppercase opacity-80"
                >Sintonizando resposta...</span
              >
            </div>
          </template>
          <template #content="{ message }">
            <div
              v-if="message.id === 'welcome'"
              class="text-sm leading-relaxed"
            >
              <div
                class="prose prose-invert prose-sm max-w-none"
                v-html="
                  parseMarkdown(
                    'Olá! Sou seu assistente musical do **Spotify Recs**. Posso ajudar a encontrar novas músicas, criar playlists ou sugerir vibe parecida com o que você gosta.',
                  )
                "
              />

              <br />

              <p class="font-semibold mb-1">Exemplos do que posso fazer:</p>

              <ul class="list-disc list-inside text-text-muted space-y-1">
                <li>"Músicas de rock indie para relaxar"</li>
                <li>"Recomende algo parecido com Daft Punk"</li>
                <li>"Crie uma playlist com músicas de 2010"</li>
              </ul>
            </div>

            <div
              v-else
              class="flex flex-col gap-3"
              :class="{
                'w-full min-w-[320px] md:min-w-[420px]':
                  message.tracks?.length || message.playlists?.length,
              }"
            >
              <div
                class="text-sm leading-relaxed prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-white/5"
                v-html="parseMarkdown(message.content)"
              />

              <div
                v-if="message.tracks?.length"
                class="flex flex-col gap-2 mt-1 w-full"
              >
                <ChatTrackItem
                  v-for="track in message.tracks"
                  :key="track.spotify_id"
                  :track="track"
                />
              </div>

              <div
                v-if="message.playlists?.length"
                class="flex flex-col gap-2 mt-1 w-full"
              >
                <ChatPlaylistItem
                  v-for="pl in message.playlists"
                  :key="pl.id"
                  :playlist="pl"
                />
              </div>
            </div>
          </template>
        </UChatMessages>

        <template #prompt>
          <UChatPrompt
            v-model="inputValue"
            :status="status"
            placeholder="Peça uma recomendação..."
            :ui="{
              root: 'w-full flex items-end gap-2 p-1',
              base: 'flex-1 text-text-main placeholder:text-text-dim border-none focus:ring-1 focus:ring-primary rounded-3xl px-5 py-3 custom-scrollbar resize-none max-h-32 min-h-[48px]',
            }"
            @submit="handleSend"
          >
            <UChatPromptSubmit
              :status="status"
              color="primary"
              variant="solid"
              icon="i-lucide-send"
              class="w-12 h-12 shrink-0 flex items-center justify-center text-black shadow-lg hover:scale-105 transition-transform rounded-2xl"
            />
          </UChatPrompt>
        </template>
      </UChatPalette>
    </template>
  </USlideover>
</template>
