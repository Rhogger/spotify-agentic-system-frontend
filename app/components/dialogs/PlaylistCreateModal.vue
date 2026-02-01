<script setup lang="ts">
import { ref, watch } from 'vue';
import { primaryButton } from '~/binds/buttons';

const props = withDefaults(
  defineProps<{
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const emit = defineEmits<{
  (
    e: 'create',
    data: { name: string; description: string; public: boolean },
  ): void;
}>();

const isOpen = defineModel<boolean>({ required: true });

const name = ref('');
const description = ref('');
const isPublic = ref(false);

watch(isOpen, (val) => {
  if (!val) {
    name.value = '';
    description.value = '';
    isPublic.value = false;
  }
});

function handleCreate() {
  if (!name.value.trim()) return;
  emit('create', {
    name: name.value.trim(),
    description: description.value.trim(),
    public: isPublic.value,
  });
}
</script>

<template>
  <BaseModal v-model="isOpen" title="Criar playlist" @close="isOpen = false">
    <div class="space-y-5">
      <div class="space-y-2">
        <label
          class="block text-xs font-bold text-text-muted uppercase tracking-wider"
        >
          Nome
        </label>

        <UInput
          v-model="name"
          placeholder="Minha playlist"
          class="w-full"
          variant="none"
          :ui="{
            base: 'bg-white/5 text-text-main border-transparent focus:ring-1 focus:ring-primary placeholder-text-dim rounded-md px-3 py-2',
          }"
        />
      </div>

      <div class="space-y-2">
        <label
          class="block text-xs font-bold text-text-muted uppercase tracking-wider"
        >
          Descrição
        </label>

        <UTextarea
          v-model="description"
          placeholder="Descrição da playlist (opcional)"
          class="w-full"
          variant="none"
          :rows="3"
          :ui="{
            base: 'bg-white/5 text-text-main border-transparent focus:ring-1 focus:ring-primary placeholder-text-dim rounded-md px-3 py-2 resize-none',
          }"
        />
      </div>

      <UCheckbox
        v-model="isPublic"
        label="Playlist pública"
        color="primary"
        class="cursor-pointer"
        :ui="{
          label: 'text-text-main cursor-pointer',
          base: 'cursor-pointer',
        }"
      />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          v-bind="primaryButton"
          label="Criar"
          :loading="!!loading"
          :disabled="!name.trim()"
          class="px-6"
          @click="handleCreate"
        />
      </div>
    </template>
  </BaseModal>
</template>
