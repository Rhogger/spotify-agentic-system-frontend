<script setup lang="ts">
import { useChatDrawer } from "~/composables/useChatDrawer";
import { primaryButton } from "~/binds/buttons";

const { isOpen, toggle } = useChatDrawer();
const { isPlayerVisible } = usePlayerState();
</script>

<template>
  <UButton
    v-if="!isOpen"
    v-bind="primaryButton"
    icon="i-heroicons-sparkles-solid"
    class="fixed right-6 md:right-8 z-60 h-12 w-12 md:h-14 md:w-14 p-0 flex items-center justify-center hover:shadow-primary/50 transition-all duration-300"
    :class="[
      isPlayerVisible ? 'bottom-24 md:bottom-28' : 'bottom-6 md:bottom-8',
    ]"
    title="Abrir Assistente IA"
    @click="toggle"
  />
</template>
