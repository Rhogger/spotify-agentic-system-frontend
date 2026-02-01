<script setup lang="ts">
import type { Track } from '~/models/track';
import { ghostButton, primaryButton } from '~/binds/buttons';
import OverflowText from '~/components/text/OverflowText.vue';

const props = withDefaults(
  defineProps<{
    recommendations: Track[];
    selectedIds: Set<string>;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const emit = defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'confirm'): void;
}>();

const isOpen = defineModel<boolean>({ required: true });

function formatArtists(artistString: string) {
  try {
    const escaped = artistString.replace(/"/g, '\\"');
    const jsonString = escaped.replace(/'/g, '"');
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed.join(', ') : artistString;
  } catch {
    return artistString;
  }
}
</script>

<template>
  <BaseModal v-model="isOpen" title="Selecionar músicas">
    <div class="space-y-4">
      <p class="text-sm text-text-muted">
        Selecione quais músicas você deseja adicionar à playlist.
      </p>

      <div
        class="max-h-[400px] overflow-y-auto custom-scrollbar pr-2 space-y-2"
      >
        <div
          v-for="track in recommendations"
          :key="track.spotify_id"
          class="flex items-center gap-3 p-2 rounded-md hover:bg-surface-highlight transition-colors cursor-pointer"
          @click="emit('toggle', track.spotify_id)"
        >
          <UCheckbox
            :model-value="selectedIds.has(track.spotify_id)"
            color="primary"
            @click.stop="emit('toggle', track.spotify_id)"
          />
          <img :src="track.image_url" class="w-10 h-10 rounded object-cover" />
          <div class="flex flex-col min-w-0">
            <OverflowText
              :text="track.name"
              class="text-sm font-bold text-text-main"
            />
            <OverflowText
              :text="formatArtists(track.artists)"
              class="text-xs text-text-muted"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          v-bind="ghostButton"
          label="Cancelar"
          @click="isOpen = false"
        />
        <UButton
          v-bind="primaryButton"
          :label="`Adicionar ${selectedIds.size} músicas`"
          :disabled="selectedIds.size === 0"
          :loading="!!loading"
          class="text-black font-bold"
          @click="emit('confirm')"
        />
      </div>
    </template>
  </BaseModal>
</template>
