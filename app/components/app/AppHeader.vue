<script setup lang="ts">
import { baseDropdown } from '~/binds/dropdown';
import { useAuth } from '~/composables/useAuth';

const { user, logout } = useAuth();

const profileUrl = computed(
  () =>
    user.value?.spotify_profile?.external_urls?.spotify ||
    'https://www.spotify.com/account/overview/',
);

const avatarUrl = computed(() => user.value?.spotify_profile?.images?.[0]?.url);

const displayName = computed(() => user.value?.display_name || 'User');

const items = computed(() => [
  [
    {
      label: 'Meu Perfil',
      to: profileUrl.value,
      target: '_blank',
    },
  ],
  [
    {
      label: 'Sair',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: logout,
    },
  ],
]);
</script>

<template>
  <header
    class="h-16 shrink-0 border-b border-border flex items-center px-4 bg-background/75 backdrop-blur-md z-20"
  >
    <div class="flex items-center gap-2">
      <UIcon
        name="i-images-spotify-logo"
        class="w-8 h-8 text-(--color-primary)"
      />

      <div class="font-bold text-xl tracking-tight text-text-main">
        Spotify Recs
      </div>
    </div>

    <div class="ml-auto flex items-center gap-2">
      <UDropdownMenu
        :items="items"
        v-bind="baseDropdown"
        :content="{ align: 'end', side: 'bottom' }"
      >
        <UserAvatar
          :src="avatarUrl"
          :alt="displayName"
          size="sm"
          class="cursor-pointer ring-2 ring-(--color-primary) hover:ring-opacity-80 transition-all"
        />
      </UDropdownMenu>
    </div>
  </header>
</template>
