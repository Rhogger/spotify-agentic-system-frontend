<script setup lang="ts">
import type { Playlist } from '~/models/playlist';
import { ghostCard } from '~/binds/cards';
import { usePlaylists } from '~/composables/usePlaylists';

const props = defineProps<Playlist>();
const { selectPlaylist } = usePlaylists();

function selectAndNavigate() {
  selectPlaylist(props);
  navigateTo('/playlist/' + props.id);
}
</script>

<template>
  <UCard
    v-bind="ghostCard"
    tabindex="0"
    role="button"
    @click="selectAndNavigate"
    @keydown.enter="selectAndNavigate"
    @keydown.space.prevent="selectAndNavigate"
  >
    <div
      class="w-12 h-12 rounded flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 overflow-hidden"
      :class="[
        !image && !color && !gradient
          ? 'bg-green-950/30 backdrop-blur-md border border-white/5'
          : '',
        !image && gradient ? gradient : '',
      ]"
      :style="{ backgroundColor: !image && color ? color : undefined }"
    >
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="w-full h-full object-cover"
      />
      <UIcon
        v-else-if="icon"
        :name="icon"
        class="text-primary w-6 h-6 drop-shadow-sm"
        :class="{ 'fill-current': name === 'Músicas Curtidas' }"
      />
    </div>

    <div class="flex flex-col min-w-0">
      <span
        class="text-sm font-bold text-text-main truncate group-hover:text-white transition-colors"
      >
        {{ name }}
      </span>
      <span
        class="text-xs text-text-muted truncate group-hover:text-text-dim transition-colors"
      >
        {{ type }} • {{ count }}
      </span>
    </div>
  </UCard>
</template>
