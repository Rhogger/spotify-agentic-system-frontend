<script setup lang="ts">
import { ref, computed } from 'vue';
import { primaryButton } from '~/binds/buttons';
import { useSpotifyPlayer } from '~/composables/useSpotifyPlayer';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    trackUri?: string;
  }>(),
  {
    size: 'xl',
    trackUri: '',
  },
);

const { play, togglePlay, currentTrack, isPaused, playerState } =
  useSpotifyPlayer();
const { isPlayerVisible } = usePlayerState();
const { user } = useAuth();
const isPremium = computed(
  () => user.value?.spotify_profile?.product === 'premium',
);

const isCurrentTrack = computed(() => {
  if (!props.trackUri || !isPremium.value) return false;

  if (
    props.trackUri.includes(':playlist:') ||
    props.trackUri.includes(':album:')
  ) {
    return playerState.value?.context?.uri === props.trackUri;
  }

  return currentTrack.value?.uri === props.trackUri;
});

const isPlaying = computed(() => {
  return isCurrentTrack.value && !isPaused.value;
});

async function toggle(e: Event) {
  e.stopPropagation();

  if (!isPremium.value) return;

  if (!props.trackUri) {
    console.warn('No track URI provided');
    return;
  }

  isPlayerVisible.value = true;

  if (isCurrentTrack.value) {
    await togglePlay();
    return;
  }

  if (
    props.trackUri.includes(':playlist:') ||
    props.trackUri.includes(':album:')
  ) {
    await play({ context_uri: props.trackUri });
  } else {
    await play({ uris: [props.trackUri] });
  }
}
</script>

<template>
  <UTooltip
    :text="
      isPremium
        ? isPlaying
          ? 'Pausar'
          : 'Reproduzir'
        : 'O player só está disponível para usuários com plano Premium'
    "
    :popper="{ placement: 'top' }"
  >
    <UButton
      v-bind="primaryButton"
      class="aspect-square flex items-center justify-center p-0 rounded-full shadow-[0_8px_20px_rgba(56,224,123,0.4)] hover:shadow-[0_12px_28px_rgba(56,224,123,0.5)] z-20"
      :class="{
        'w-14 h-14': size === 'xl',
        'w-12 h-12': size === 'lg',
        'w-10 h-10': size === 'md',
        'w-8 h-8': size === 'sm',
        'opacity-50 grayscale cursor-not-allowed shadow-none hover:shadow-none':
          !isPremium,
      }"
      @click="toggle"
    >
      <UIcon
        :name="
          isPlaying ? 'i-heroicons-pause-20-solid' : 'i-heroicons-play-20-solid'
        "
        class="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
        :class="{ 'ml-0.5': !isPlaying }"
      />
    </UButton>
  </UTooltip>
</template>
