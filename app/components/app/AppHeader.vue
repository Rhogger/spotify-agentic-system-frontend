<script setup lang="ts">
import { baseDropdown } from '~/binds/dropdown';

const items = [
  [
    {
      label: 'Meu Perfil',
      to: 'https://www.spotify.com/account/overview/',
      target: '_blank',
    },
  ],
  [
    {
      label: 'Sair',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      to: 'http://localhost:3001/',
    },
  ],
];
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
          src="https://avatars.githubusercontent.com/u/83069922?v=4&size=64"
          alt="User"
          size="sm"
          class="cursor-pointer ring-2 ring-(--color-primary) hover:ring-opacity-80 transition-all"
        />
      </UDropdownMenu>
    </div>
  </header>
</template>
