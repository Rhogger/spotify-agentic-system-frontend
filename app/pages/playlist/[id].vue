<script setup lang="ts">
import { ghostButton, destructiveButton, iconButton } from "~/binds/buttons";
import { baseDropdown } from "~/binds/dropdown";

const route = useRoute();
const playlistId = route.params.id;
const isDeleteModalOpen = ref(false);
const isShuffleActive = ref(false);

definePageMeta({
  layout: "playlist",
});

const playlist = computed(() => {
  return {
    id: playlistId,
    name: "Músicas Curtidas",
    description: "Playlist • 142 músicas",
    cover: "bg-gradient-to-br from-indigo-500 to-purple-600",
    icon: "i-heroicons-heart-solid",
    dominantColor: "#4f46e5",
  };
});

const tracks = ref([
  {
    id: 1,
    title: "Nightmare",
    artist: "Avenged Sevenfold",
    album: "Nightmare",
    duration: "6:15",
    addedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Afterlife",
    artist: "Avenged Sevenfold",
    album: "Avenged Sevenfold",
    duration: "5:52",
    addedAt: "5 days ago",
  },
  {
    id: 3,
    title: "Psychosocial",
    artist: "Slipknot",
    album: "All Hope Is Gone",
    duration: "4:43",
    addedAt: "1 week ago",
  },
  {
    id: 4,
    title: "Tears Don't Fall",
    artist: "Bullet For My Valentine",
    album: "The Poison",
    duration: "5:48",
    addedAt: "2 weeks ago",
  },
]);

const actionItems = [
  {
    label: "Integrar ao Spotify",
    icon: "i-simple-icons-spotify",
    onSelect: () => {
      console.log("Integate");
    },
  },
  {
    label: "Deletar",
    icon: "i-heroicons-trash",
    onSelect: () => (isDeleteModalOpen.value = true),
  },
];
</script>

<template>
  <div
    class="h-full overflow-y-auto custom-scrollbar"
    :style="{
      background: `linear-gradient(to bottom, ${playlist.dominantColor} 0%, var(--color-background) 100%)`,
    }"
  >
    <div class="p-6 pb-0">
      <UButton
        v-bind="iconButton"
        icon="i-heroicons-chevron-left"
        class="bg-black/40 hover:bg-black/60 backdrop-blur-md"
        @click="$router.back()"
        title="Voltar"
      />
    </div>

    <div class="flex items-end gap-6 p-6 pb-8 pt-4">
      <div
        class="w-52 h-52 shadow-2xl flex items-center justify-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-500"
        :class="playlist.cover"
      >
        <UIcon
          v-if="playlist.icon"
          :name="playlist.icon"
          class="w-20 h-20 text-white drop-shadow-md"
        />

        <span v-else class="text-6xl font-black text-white">
          {{ playlist.name[0] }}
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <span
          class="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm"
        >
          Playlist
        </span>
        <h1
          class="text-6xl/tight font-black text-white tracking-tight drop-shadow-lg"
        >
          {{ playlist.name }}
        </h1>

        <div
          class="flex items-center gap-2 text-sm text-white/90 font-medium mt-2"
        >
          <UserAvatar
            src="https://avatars.githubusercontent.com/u/83069922?v=4&size=64"
            size="xs"
          />

          <span class="hover:underline cursor-pointer font-bold">
            Rhogger
          </span>

          <span>•</span>

          <span> {{ tracks.length }} músicas </span>
        </div>
      </div>
    </div>

    <div class="bg-black/20 backdrop-blur-3xl min-h-full">
      <div class="px-6 py-6 flex items-center gap-6">
        <PlayButton size="xl" />

        <UButton
          variant="ghost"
          color="neutral"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative p-0"
          :class="[
            isShuffleActive
              ? 'text-primary'
              : 'text-text-muted hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary',
          ]"
          title="Ordem Aleatória"
          @click="isShuffleActive = !isShuffleActive"
        >
          <UIcon name="i-lucide-shuffle" class="w-6 h-6" />

          <div
            v-if="isShuffleActive"
            class="absolute bottom-0 w-1 h-1 bg-primary rounded-full"
          ></div>
        </UButton>

        <UDropdownMenu :items="actionItems" v-bind="baseDropdown">
          <UButton
            v-bind="iconButton"
            icon="i-heroicons-ellipsis-horizontal"
            class="w-10 h-10"
          />
        </UDropdownMenu>
      </div>

      <div class="px-6 pb-6">
        <div
          class="sticky top-0 border-b border-white/10 mb-4 py-2 text-sm text-text-muted uppercase tracking-wider grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4"
        >
          <span class="text-center">#</span>

          <span>Título</span>

          <span>Álbum</span>

          <span class="text-right pr-4">Adicionada em</span>

          <div class="flex justify-center w-12">
            <UIcon name="i-heroicons-clock" class="w-5 h-5" />
          </div>
        </div>

        <div class="space-y-1">
          <div
            v-for="(track, index) in tracks"
            :key="track.id"
            class="group grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4 items-center px-2 py-2 rounded-md hover:bg-white/10 transition-colors text-sm text-text-muted"
          >
            <span class="text-center group-hover:hidden w-4">
              {{ index + 1 }}
            </span>

            <UIcon
              name="i-heroicons-play-solid"
              class="w-4 h-4 text-white hidden group-hover:block mx-auto"
            />

            <div class="flex items-center gap-3 overflow-hidden">
              <div class="flex flex-col truncate">
                <span
                  class="text-white font-medium text-base truncate group-hover:text-primary transition-colors cursor-pointer"
                >
                  {{ track.title }}
                </span>

                <span
                  class="text-xs group-hover:text-white transition-colors cursor-pointer"
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

            <span class="whitespace-nowrap font-mono text-center w-12">
              {{ track.duration }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      v-model="isDeleteModalOpen"
      title="Deletar playlist?"
      @close="isDeleteModalOpen = false"
    >
      <div class="space-y-4">
        <p class="text-text-muted text-sm">
          Isso excluirá <strong>{{ playlist.name }}</strong> da sua biblioteca
          permanentemente.
        </p>

        <p class="text-text-muted text-sm font-bold">
          Esta ação não pode ser desfeita.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            v-bind="ghostButton"
            label="Cancelar"
            class="px-6"
            @click="isDeleteModalOpen = false"
          />

          <UButton
            v-bind="destructiveButton"
            label="Deletar"
            class="px-6"
            @click="isDeleteModalOpen = false"
          />
        </div>
      </template>
    </BaseModal>
  </div>
</template>
