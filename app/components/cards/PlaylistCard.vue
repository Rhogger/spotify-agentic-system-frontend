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
    <div class="shrink-0 shadow-sm transition-transform group-hover:scale-105">
      <PlaylistImage :src="image" :alt="name" size="sm" />
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
