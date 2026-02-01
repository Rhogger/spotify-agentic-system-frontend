<script setup lang="ts">
import type { ModalProps } from '@nuxt/ui';
import { iconButton } from '~/binds/buttons';

interface Props {
  modelValue: ModalProps['open'];
  title: ModalProps['title'];
  description?: ModalProps['description'];
  ui?: ModalProps['ui'];
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
    :title="title"
    :description="description || ' '"
    :ui="{
      content:
        'bg-surface-dialog ring-1 ring-white/10 sm:max-w-lg rounded-lg shadow-xl overflow-hidden flex flex-col',
      overlay: 'bg-black/80 backdrop-blur-md',
      header:
        'p-4 border-b border-white/5 flex items-center justify-between shrink-0',
      body: 'p-6 overflow-y-auto flex-1',
      footer:
        'p-4 border-t border-white/5 flex items-center justify-end gap-3 shrink-0',
      title: 'text-xl font-bold text-text-main',
      ...ui,
    }"
    :close="{
      ...iconButton,
      icon: 'i-heroicons-x-mark',
    }"
  >
    <template #body>
      <slot />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UModal>
</template>
