<script setup lang="ts">
import { ghostButton } from '~/binds/buttons';

const props = withDefaults(
  defineProps<{
    trackTitle?: string;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <BaseModal v-model="isOpen" title="Remover música" @close="isOpen = false">
    <div class="space-y-4">
      <p class="text-text-main">
        Tem certeza que deseja remover
        <span class="font-bold text-white">"{{ trackTitle || 'Música' }}"</span>
        desta playlist?
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          v-bind="ghostButton"
          label="Cancelar"
          @click="isOpen = false"
        />
        <UButton
          color="error"
          variant="solid"
          label="Remover"
          :loading="!!loading"
          class="bg-red-600 hover:bg-red-700 text-white font-bold"
          @click="emit('confirm')"
        />
      </div>
    </template>
  </BaseModal>
</template>
