<script setup lang="ts">
import { primaryButton } from '~/binds/buttons';
import InfoButton from '~/components/buttons/InfoButton.vue';
import { useFilters } from '~/composables/useFilters';

const { filters } = useFilters();

const decadeOptions = [
  '2020s',
  '2010s',
  '2000s',
  '1990s',
  '1980s',
  '1970s',
  '1960s',
  '1950s',
  '1940s',
  '1930s',
  '1920s',
];

const sliderLabels = {
  energy: 'Energia',
  danceability: 'Dançabilidade',
  valence: 'Valência',
  speechiness: 'Vocalidade',
  acousticness: 'Acusticidade',
  instrumentalness: 'Instrumentalidade',
};

type FilterKey = keyof typeof sliderLabels;

const tooltips: Record<string, string> = {
  energy: 'Medida de intensidade e atividade.',
  danceability: 'O quão adequada a faixa é para dançar.',
  valence: 'Positividade musical transmitida pela faixa.',
  speechiness: 'Presença de palavras faladas na faixa.',
  acousticness: 'Confiança se a faixa é acústica.',
  instrumentalness: 'Prevê se a faixa não contém vocais.',
};
</script>

<template>
  <div class="px-2 space-y-6">
    <div v-for="(label, key) in sliderLabels" :key="key" class="space-y-2">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-1">
          <span class="text-sm font-medium text-text-muted">{{ label }}</span>
          <InfoButton :text="tooltips[key] ?? ''" />
        </div>

        <span class="text-xs font-mono text-(--color-primary)"
          >{{ filters[key as FilterKey] }}%</span
        >
      </div>

      <USlider
        v-model="filters[key as FilterKey]"
        :min="0"
        :max="100"
        size="sm"
        class="cursor-pointer"
        :ui="{
          track: 'bg-surface-input cursor-pointer',
          range: 'bg-(--color-primary)',
          thumb: 'bg-white ring-2 ring-(--color-primary) cursor-pointer',
        }"
      />
    </div>

    <UCheckbox
      v-model="filters.explicit"
      color="primary"
      class="border-border cursor-pointer"
      :ui="{
        root: 'flex flex-row-reverse justify-between w-full items-center',
        label: 'text-sm font-medium text-text-muted cursor-pointer',
        wrapper: 'ms-0',
      }"
    >
      <template #label>
        <div class="flex items-center gap-1 cursor-pointer">
          <span class="text-sm font-medium text-text-muted">Explícito</span>
          <InfoButton text="Permitir músicas com conteúdo explícito" />
        </div>
      </template>
    </UCheckbox>

    <UCheckbox
      v-model="filters.popular"
      color="primary"
      class="border-border cursor-pointer"
      :ui="{
        root: 'flex flex-row-reverse justify-between w-full items-center',
        label: 'text-sm font-medium text-text-muted cursor-pointer',
        wrapper: 'ms-0',
      }"
    >
      <template #label>
        <div class="flex items-center gap-1 cursor-pointer">
          <span class="text-sm font-medium text-text-muted">Popular</span>
          <InfoButton text="Buscar apenas músicas populares" />
        </div>
      </template>
    </UCheckbox>

    <div class="space-y-2">
      <div class="flex items-center gap-1">
        <label class="text-sm font-medium text-text-muted">Década</label>
        <InfoButton text="Filtrar recomendações por década de lançamento" />
      </div>

      <USelectMenu
        v-model="filters.decade"
        :items="decadeOptions"
        variant="none"
        class="w-full flex items-center justify-between h-9 px-3 rounded-md bg-white/5 text-text-main border border-white/10 shadow-sm ring-0 hover:bg-white/10 focus:ring-1 focus:ring-primary transition-colors text-sm cursor-pointer"
        :ui="{
          content:
            'bg-surface-elevated border-border ring-border min-w-[var(--reka-popper-anchor-width)]',
          item: 'text-text-main hover:bg-surface-highlight data-[highlighted]:bg-surface-highlight cursor-pointer',
        }"
      />
    </div>

    <UButton
      v-bind="primaryButton"
      label="Gerar recomendação"
      block
      class="my-4 font-bold text-black"
    />
  </div>
</template>
