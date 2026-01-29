<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { iconButton } from "~/binds/buttons";
import { useChatDrawer } from "~/composables/useChatDrawer";

const { isOpen } = useChatDrawer();

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: "assistant",
    content:
      "Olá! Eu sou o seu assistente musical. Como posso ajudar você hoje?",
  },
]);

const inputValue = ref("");
const messagesContainer = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

function sendMessage() {
  if (!inputValue.value.trim()) return;

  // Add user message
  messages.value.push({
    id: Date.now(),
    role: "user",
    content: inputValue.value,
  });

  const userText = inputValue.value;
  inputValue.value = "";
  scrollToBottom();

  // Mock response (later this would be real AI)
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: "assistant",
      content: `Entendi! Você disse: "${userText}". Em breve vou poder buscar recomendações reais pra você!`,
    });
    scrollToBottom();
  }, 1000);
}

// Watch for opening to scroll to bottom
watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom();
  }
});
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    :ui="{
      overlay: 'bg-black/60 backdrop-blur-sm',
      content:
        'bg-surface-base border-l border-border flex flex-col max-w-md w-full sm:w-[500px]',
    }"
  >
    <template #content>
      <!-- Header -->
      <div
        class="flex items-center justify-between p-4 border-b border-border bg-surface-base/50 backdrop-blur-md sticky top-0 z-10"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"
          >
            <UIcon name="i-lucide-bot" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-text-main">Assistente IA</h3>
            <span class="text-xs text-text-muted flex items-center gap-1">
              <span
                class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
              ></span>
              Online
            </span>
          </div>
        </div>
        <UButton
          v-bind="iconButton"
          icon="i-heroicons-x-mark"
          @click="isOpen = false"
        />
      </div>

      <!-- Messages Area -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar scroll-smooth"
      >
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="flex flex-col gap-1 max-w-[85%]"
          :class="[
            msg.role === 'user'
              ? 'self-end items-end'
              : 'self-start items-start',
          ]"
        >
          <div
            class="px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm break-all"
            :class="[
              msg.role === 'user'
                ? 'bg-primary text-black font-medium rounded-br-sm'
                : 'bg-surface-elevated text-text-main border border-white/5 rounded-bl-sm',
            ]"
          >
            {{ msg.content }}
          </div>
          <span class="text-[10px] text-text-dim px-1 lowercase">
            {{ msg.role === "user" ? "Você" : "Assistente" }}
          </span>
        </div>
      </div>

      <!-- Input Area -->
      <div
        class="p-4 border-t border-border bg-surface-base sticky bottom-0 z-10"
      >
        <form
          @submit.prevent="sendMessage"
          class="relative items-end gap-2 flex"
        >
          <UTextarea
            v-model="inputValue"
            placeholder="Peça uma recomendação..."
            variant="none"
            :rows="1"
            autoresize
            :maxrows="5"
            class="w-full"
            :ui="{
              base: 'bg-surface-input text-text-main placeholder:text-text-dim rounded-2xl px-4 py-3 pr-12 focus:ring-1 focus:ring-primary border-none custom-scrollbar resize-none',
            }"
            @keydown.enter.prevent="sendMessage"
          />
          <UButton
            type="submit"
            :disabled="!inputValue.trim()"
            color="primary"
            variant="ghost"
            class="absolute right-2 bottom-2 rounded-full w-8 h-8 flex items-center justify-center text-primary hover:bg-white/10 active:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            :class="{
              'bg-primary text-black hover:bg-primary/90': inputValue.trim(),
            }"
          >
            <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4" />
          </UButton>
        </form>
        <div class="text-center mt-2">
          <span class="text-[10px] text-text-dim"
            >IA pode cometer erros. Verifique informações importantes.</span
          >
        </div>
      </div>
    </template>
  </USlideover>
</template>
