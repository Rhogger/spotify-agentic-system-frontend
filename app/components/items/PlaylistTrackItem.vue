<script setup lang="ts">
import type { Track } from '~/models/playlist';
import { useAuth } from '~/composables/useAuth';

const props = defineProps<{
  track: Track;
  index: number;
  playlistId?: string;
  isOwner?: boolean;
}>();

const emit = defineEmits<{
  (e: 'play', track: Track, index: number): void;
  (e: 'remove', track: Track, index: number): void;
}>();

const { user } = useAuth();
const isPremium = computed(
  () => user.value?.spotify_profile?.product === 'premium',
);

const showActions = ref(false);

const handlePlay = () => {
  if (isPremium.value) {
    emit('play', props.track, props.index);
  }
};
</script>

<template>
  <div
    class="group grid grid-cols-[16px_4fr_3fr_2fr_4rem] gap-4 items-center px-2 py-2 rounded-md transition-colors text-sm text-text-muted"
    :class="{
      'hover:bg-white/10': isPremium,
      'opacity-60 grayscale-[0.5]': !isPremium,
    }"
    role="button"
    @dblclick="handlePlay"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
  >
    <span class="text-center group-hover:hidden w-4">
      {{ index + 1 }}
    </span>

    <UTooltip
      :text="isPremium ? 'Reproduzir' : 'Premium necessário'"
      :popper="{ placement: 'top' }"
      class="hidden group-hover:block mx-auto"
    >
      <UIcon
        name="i-heroicons-play-solid"
        class="w-4 h-4 text-white cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': !isPremium }"
        @click.stop="handlePlay"
      />
    </UTooltip>

    <div class="flex items-center gap-3 overflow-hidden">
      <img
        v-if="track.image"
        :src="track.image"
        class="w-10 h-10 rounded shrink-0 object-cover"
        :alt="track.title"
      />
      <div class="flex flex-col truncate">
        <span
          class="text-white font-medium text-base truncate group-hover:text-primary transition-colors cursor-pointer"
        >
          {{ track.title }}
        </span>

        <span
          class="text-xs group-hover:text-white transition-colors cursor-pointer truncate"
        >
          {{ track.artist }}
        </span>
      </div>
    </div>

    <span
      class="truncate group-hover:text-white transition-colors cursor-pointer"
    >
      {{ track.album }}
    </span>
    <span class="text-right pr-4 truncate">
      {{ track.addedAt }}
    </span>

    <div class="flex items-center justify-center w-full">
      <span
        v-if="!playlistId || !showActions"
        class="whitespace-nowrap font-mono text-center"
      >
        {{ track.duration }}
      </span>

      <UTooltip
        v-else
        :text="
          isOwner
            ? 'Remover da playlist'
            : 'Você não pode remover músicas desta playlist'
        "
        :popper="{ placement: 'top' }"
      >
        <UButton
          variant="ghost"
          class="w-8 h-8 rounded-full flex items-center justify-center p-0 text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
          :class="{
            'opacity-50 cursor-not-allowed hover:text-text-muted hover:bg-transparent':
              !isOwner,
          }"
          :disabled="!isOwner"
          @click.stop="isOwner ? emit('remove', track, index) : null"
        >
          <UIcon name="i-heroicons-trash" class="w-5 h-5" />
        </UButton>
      </UTooltip>
    </div>
  </div>
</template>
