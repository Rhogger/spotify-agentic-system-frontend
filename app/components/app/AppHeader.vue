<script setup lang="ts">
import { baseDropdown } from '~/binds/dropdown';
import { useAuth } from '~/composables/useAuth';

const { user, logout, isLoading } = useAuth();

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
      onSelect: logout,
    },
  ],
]);
</script>

<template>
  <header
    class="h-16 shrink-0 border-b border-border flex items-center px-4 bg-background/75 backdrop-blur-md z-20"
  >
    <div
      class="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
      @click="navigateTo('/home')"
    >
      <UIcon
        name="i-images-spotify-logo"
        class="w-8 h-8 text-(--color-primary)"
      />

      <div class="font-bold text-xl tracking-tight text-text-main">
        Spotify Recs
      </div>
    </div>

    <div class="ml-auto flex items-center gap-2">
      <template v-if="isLoading && !user">
        <AppHeaderSkeleton />
      </template>

      <UDropdownMenu
        v-else
        :items="items"
        v-bind="baseDropdown"
        :content="{ align: 'end', side: 'bottom' }"
      >
        <div class="flex items-center gap-3">
          <UBadge
            v-if="user?.spotify_profile?.product"
            :color="
              user.spotify_profile.product === 'premium' ? 'primary' : 'neutral'
            "
            variant="subtle"
            class="uppercase font-bold tracking-widest text-[10px] px-2 py-0.5 rounded-full"
          >
            {{ user.spotify_profile.product }}
          </UBadge>

          <UserAvatar
            :src="avatarUrl"
            :alt="displayName"
            size="sm"
            class="cursor-pointer ring-2 ring-(--color-primary) hover:ring-opacity-80 transition-all"
          />
        </div>
      </UDropdownMenu>
    </div>
  </header>
</template>
