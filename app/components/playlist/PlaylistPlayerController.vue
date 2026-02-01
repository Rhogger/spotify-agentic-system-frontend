<script setup lang="ts">
import { PlayButton } from '#components';
import { ghostButton } from '~/binds/buttons';
import type { Playlist } from '~/models/playlist';

const props = defineProps<{
  playlist: Playlist;
  isFollowing: boolean;
  isFollowingLoading: boolean;
  isShuffleActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-shuffle'): void;
  (e: 'follow'): void;
  (e: 'unfollow'): void;
  (e: 'play'): void;
}>();
</script>

<template>
  <div class="px-6 py-6 flex items-center gap-4">
    <PlayButton
      size="xl"
      :track-uri="`spotify:playlist:${playlist.id}`"
      @click="emit('play')"
    />

    <UButton
      variant="ghost"
      color="neutral"
      class="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative p-0"
      :class="[
        isShuffleActive
          ? 'text-primary'
          : 'text-text-muted hover:text-white hover:bg-white/10',
      ]"
      title="Ordem Aleatória"
      @click="emit('toggle-shuffle')"
    >
      <UIcon name="i-lucide-shuffle" class="w-6 h-6" />

      <div
        v-if="isShuffleActive"
        class="absolute bottom-0 w-1 h-1 bg-primary rounded-full"
      ></div>
    </UButton>

    <UButton
      v-if="isFollowing"
      variant="ghost"
      class="w-10 h-10 rounded-full flex items-center justify-center p-0 bg-primary hover:bg-primary/80 hover:scale-105 transition-all"
      title="Seguindo - Clique para remover"
      @click="emit('unfollow')"
    >
      <UIcon name="i-heroicons-check-20-solid" class="w-6 h-6 text-black" />
    </UButton>

    <UButton
      v-else
      variant="ghost"
      :loading="isFollowingLoading"
      v-bind="ghostButton"
      class="w-10 h-10 rounded-full flex items-center justify-center p-0 border-2 border-white/40 hover:border-white hover:scale-105 transition-all text-white/70 hover:text-white"
      title="Seguir playlist"
      @click="emit('follow')"
    >
      <UIcon
        v-if="!isFollowingLoading"
        name="i-heroicons-plus"
        class="w-6 h-6"
      />
    </UButton>
  </div>
</template>
