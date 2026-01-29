<script setup lang="ts">
import type { CardProps } from '@nuxt/ui';
import { iconButton } from '~/binds/buttons';
import { baseTooltip } from '~/binds/tooltips';

/**
 * BaseModal Component
 *
 * Reusable modal component adhering to the Spotify Agentic System style guide.
 * Wraps UModal and UCard with consistent styling for backdrop, header, body, and footer.
 */

interface Props {
  modelValue: boolean;
  title: string;
  ui?: Pick<CardProps, 'ui'>;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'close']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    if (!value) emit('close');
  },
});
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ overlay: 'bg-black/60 backdrop-blur-sm' }"
  >
    <template #content>
      <UCard
        :ui="{
          root: 'bg-surface-card ring-1 ring-border divide-y divide-border',
          body: 'p-0 sm:p-0',
          header: 'p-4 sm:p-4 border-b border-border',
          footer: 'p-4 sm:p-4 border-t border-border bg-surface-card',
          ...ui,
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-text-main">
              {{ title }}
            </h3>

            <UTooltip
              text="Fechar"
              v-bind="baseTooltip"
            >
              <UButton
                v-bind="iconButton"
                icon="i-heroicons-x-mark"
                @click="isOpen = false"
              />
            </UTooltip>
          </div>
        </template>

        <div class="p-6 bg-surface-card">
          <slot />
        </div>

        <template
          v-if="$slots.footer"
          #footer
        >
          <slot name="footer" />
        </template>
      </UCard>
    </template>
  </UModal>
</template>
