<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Message } from '~/models/message';
import { iconButton } from '~/binds/buttons';
import { useChatDrawer } from '~/composables/useChatDrawer';

const { isOpen } = useChatDrawer();

const messages = ref<Message[]>([
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Welcome Message',
  },
]);

const inputValue = ref('');
const isLoading = ref(false);
const status = computed(() => (isLoading.value ? 'streaming' : 'ready'));

function sendMessage() {
  if (!inputValue.value.trim() || isLoading.value) return;

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: inputValue.value,
  });

  const userText = inputValue.value;
  inputValue.value = '';
  isLoading.value = true;

  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: `Entendi! Você disse: "${userText}". Em breve vou poder buscar recomendações reais pra você!`,
    });
    isLoading.value = false;
  }, 1000);
}
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

        <UButton
          v-bind="iconButton"
          icon="i-heroicons-x-mark"
          @click="isOpen = false"
        />
      </div>

      <UChatPalette class="flex-1 flex flex-col min-h-0">
        <UChatMessages
          :messages="messages"
          :user="{
            variant: 'solid',
            ui: { content: 'text-black' },
          }"
          :assistant="{
            variant: 'soft',
          }"
        >
          <template #content="{ message }">
            <div
              v-if="message.id === 'welcome'"
              class="text-sm leading-relaxed"
            >
              <p>
                Olá! Sou seu assistente musical. Posso ajudar a encontrar novas
                músicas, criar playlists baseadas no seu humor ou sugerir
                artistas parecidos com seus favoritos.
              </p>

              <br />

              <p class="font-semibold mb-1">Exemplos de prompts:</p>

              <ul class="list-disc list-inside text-text-muted">
                <li>"Músicas para relaxar"</li>
                <li>"Parecido com Daft Punk"</li>
                <li>"Playlist para treino intenso"</li>
              </ul>
            </div>

            <span v-else>
              {{ message.content }}
            </span>
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
            @submit="sendMessage"
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
