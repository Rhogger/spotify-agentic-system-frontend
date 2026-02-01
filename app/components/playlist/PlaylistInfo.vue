<script setup lang="ts">
import type { Playlist } from '~/models/playlist';

defineProps<{
  playlist: Playlist;
}>();
</script>

<template>
  <div class="flex items-end gap-6 p-6 pb-8 pt-4">
    <div
      class="shadow-2xl rounded-md overflow-hidden hover:scale-105 transition-transform duration-500"
    >
      <PlaylistImage :src="playlist.image" :alt="playlist.name" size="xl" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <span
          class="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm"
        >
          Playlist
        </span>

        <span
          v-if="playlist.privacy"
          class="text-xs font-medium px-2 py-0.5 rounded-full"
          :class="
            playlist.privacy === 'Public'
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-white/70'
          "
        >
          <UIcon
            :name="
              playlist.privacy === 'Public'
                ? 'i-heroicons-globe-alt'
                : 'i-heroicons-lock-closed'
            "
            class="w-3 h-3 mr-1 inline-block"
          />
          {{ playlist.privacy === 'Public' ? 'Pública' : 'Privada' }}
        </span>
      </div>

      <h1
        class="text-6xl/tight font-black text-white tracking-tight drop-shadow-lg line-clamp-2"
      >
        {{ playlist.name }}
      </h1>

      <p
        v-if="playlist.description"
        class="text-white/80 text-sm max-w-2xl line-clamp-2 [&_a]:text-white [&_a]:font-bold [&_a]:underline hover:[&_a]:text-primary transition-colors"
        v-html="playlist.description"
      ></p>

      <div
        class="flex items-center gap-2 text-sm text-white/90 font-medium mt-2"
      >
        <img
          v-if="playlist.owner_image"
          :src="playlist.owner_image"
          :alt="playlist.owner_name || 'User'"
          class="w-6 h-6 rounded-full object-cover"
        />

        <UserAvatar
          v-else-if="playlist.owner_name"
          :initials="playlist.owner_name[0]"
          size="2xs"
        />

        <span class="hover:underline cursor-pointer font-bold">
          {{ playlist.owner_name || 'Spotify' }}
        </span>

        <span>•</span>

        <span> {{ playlist.count }} </span>

        <span v-if="playlist.formatted_duration">•</span>

        <span v-if="playlist.formatted_duration">
          {{ playlist.formatted_duration }}
        </span>
      </div>
    </div>
  </div>
</template>
