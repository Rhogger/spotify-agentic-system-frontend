<script setup lang="ts">
import { ref } from 'vue';
import type { Track } from '~/models/track';
import { ghostButton, primaryButton } from '~/binds/buttons';
import MusicCard from '~/components/cards/MusicCard.vue';
import { usePlaylists } from '~/composables/usePlaylists';
import { useChatDrawer } from '~/composables/useChatDrawer';

const { playlists } = usePlaylists();
const isPlaylistModalOpen = ref(false);
const isSongSelectionModalOpen = ref(false);
const selectedPlaylistId = ref<number | string | null>(null);
const selectedSongsIds = ref<Set<number>>(new Set());

const baseRecommendations: Track[] = [
  {
    id: 1,
    title: 'Aurora Waves',
    artist: 'Stellar Echoes',
    genre: 'Chillwave, Ambient',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEQK8y29wgnOGo0eee1HZhtWC8qLRbj8iKVCgMDQn7xMO2uGDKq_qc9tH3ey-BVgj66_ui7_iElHJh6by6gJLtO1or3QeH6aacPZp9tKyk8tOMA6Jvx1BJg1If1HQu_TtVCQtfjxFVrIylvP64265jE8zn070SuhsrMjICfjFMsDkNY58vSFHvh9AN45WdEpTkZ6F8ejmHwXjK0LHijG_ReEEBKifkMRhgVzLN8H_9vhYBsHwWPePs_HT8RBXXvhT7zPijyCZohfTg',
  },
  {
    id: 2,
    title: 'Neon Boulevard',
    artist: 'Cyberdream',
    genre: 'Synthwave, Retro',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApqugEGXEVcQHs9bcA6KJElEJlDeQLwLfib18WOJq3rQ-9jxIeouK5picAVriOzm6f_CA84JePqK13Dcm78f4OtAdpGK3nHjH3vqKeuevLot8Y4woyPy7rjbdVd95-FnLrgv8yrT0EsdZL0Ynozdbjbs8s3jP9Ra7HK5lliKUNQmE7LbRCr1Dsx6yGpqO4e7A7K-1JqZMu-sOuBMZuDZ0rmD9SIfQ7ihkFfJ_Qb4yKHF8RsLg_5jVBBWNffETqNfb6kqOaQuDIvIwg',
  },
  {
    id: 3,
    title: 'Lost in Tokyo',
    artist: 'Nightfall Collective',
    genre: 'Lofi, Hip-Hop',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDchtrU0Jvv-6DkgX29sozxWrdJwJNEN8GU4mxlHhSSrduCmNXt-Lw86WykUQr7FzjUZN4xV_oy7QDkSKmnjqsiChDfsijd80qoeOnhlqYVpQBbKhVg_FPnQdXbR_dNcrfE2wZAvqJqE5u4VaPNwoDjDRXc5nrLZdlZBa-mSl09GDqgJAPt1Ei77Hvr9JEUvjSn2kLHWGuA5rkUy0453YHyghQTPO0wLk_6wOU8r_hSH5wP1Yn-xWCi8CW3Xaak_J6lzttM0T4ubVsk',
  },
  {
    id: 4,
    title: 'Coastal Drive',
    artist: 'Summer Haze',
    genre: 'Indie, Pop',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZiRv8PRdY4KSRcwq5LxA98JkSX5A2wWKRgr4YUMuqQhpppHMqaA57e8Yaq2i3EsJqKGaVKnwlSaB3qodA1RaYgNil7m94NVIMoEGvxoSjWHoACMa6EiW3alRnsBPlSHw3MC1eWOvqsRJHQ9loVpAiOJMwDfY4MNgBcsEzScLHAZaG4MhPAbY3pxfapFZiPoU2VVAHQAmZy5T_u2FZpQr0MtL9pOqRRaCjkru8bizL0VGbScyaMrbogssUYXtW14wOIlaM1fnOcP--',
  },
  {
    id: 5,
    title: 'Desert Moon',
    artist: 'Mirage',
    genre: 'Electronic, Downtempo',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7D0986KqUpSAjbR83Q0QoMZRs5h5y45DrJRoeTDve0iUxr-5M2QdC-2urMPX4rUTbNaql3xmltpcDajxj9tTa6Af7TOjfR7jHKRLO-irWoPNN9Ct5ykOl4sV5t3RRfCvP1zOb-i2t06mCZ-OJUMYWy9SB_qKG4OJxrcvUqn8g7VKF8heIciFjsPCwWKtlxqVsXhi-d0x_JmhzWUXncUuSUqg5u2m58fH2oz7EduGauwNlA4fDq6uVo34dLg_9YO9e3xH34bQvPcPV',
  },
  {
    id: 6,
    title: 'Rainy Afternoons',
    artist: 'The Chill Folks',
    genre: 'Acoustic, Folk',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNyfD0_GCgBVXexnBAX6gKNJACCijSmztdesoNvlz95iGPTWJw-vOg6Ux9LPTysFyVTsGl1dvmv3rsnT_YOTVaI4JqyeYkoOjEGtr80jfrmyJtqBq-0YDpeOsMLfk4MWbqhwDMb6JGpwzGkVVrbQoGhw0YsIl7tTxMbgo2Xj0DrXKANdGCwUjTPuUyisotUS9TmDy-QV7qKc2i5v_EeZru0mkSClrxIAcVkR8MLBTbux2Uqn_zlyw5kubi-jk0BgLKKW9jXPqiXXMB',
  },
  {
    id: 7,
    title: 'Metropolis Groove',
    artist: 'Urban Knights',
    genre: 'Funk, Soul',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQOgw4kzF0_axZr7RCk3LizHxJkdy5SZUvrSe1KAANy4hQMpcMCRzBfMke0CM4rZaL70G6Ollaa8kpQoX8J_SsTy2dMUQd0LjV2h8czRu4FRq2JzpIc4lgBOpTSKIEpbWsSlDKDu2tR-fjklKPGF3WHQHyy6_pRIJhE59CiBuK7jJlWT7FxPzmt_JjySCrapIcPERogNkawlVHrqBGsc-h3qyPKDasNRg5k7eQLwkpLDVNBJ4NpEcS4_Xy7sC2ZUv1SMDuCOuJqk3v',
  },
  {
    id: 8,
    title: 'Galactic Cruise',
    artist: 'Stardust Voyager',
    genre: 'Space Ambient',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoMoSPDQanKmeDtYdYLWejUiIKjKj6EZ2zPjmluTLtrCgsuaqr4ZDVcJ9QpkmkfEs7LPdSxj9sOJyh-pG0CBSQ0_-VooPY4LU68WgyJ1ZBrJXWYEZ3QifiwIgmcNYK98c-t7v0li3ZqQFxvus78IgO4q2rzUmgW5h0yjf6e9wIkeYnErhuCg1OLEZt7RbJFryc0Nm3AG3W3GcvtnpvMga1hJ1vixj1SLU6DMmvmk_S-ZJnWbiU5lO6qn_AghpWrdGbqQN6C5alyl5O',
  },
];

const recommendations = ref<Track[]>(
  Array.from({ length: 20 }, (_, i) => {
    const base = baseRecommendations[i % baseRecommendations.length]!;
    return {
      ...base,
      id: i + 1,
    };
  }),
);

function openPlaylistSelection() {
  isPlaylistModalOpen.value = true;
}

function selectPlaylist(id: number | string) {
  selectedPlaylistId.value = id;
  isPlaylistModalOpen.value = false;
  selectedSongsIds.value = new Set(recommendations.value.map((t) => t.id));
  isSongSelectionModalOpen.value = true;
}

function confirmAddSongs() {
  console.log(
    `Adicionando ${selectedSongsIds.value.size} músicas à playlist ${selectedPlaylistId.value}`,
  );
  isSongSelectionModalOpen.value = false;
  selectedPlaylistId.value = null;
}

function toggleSong(id: number) {
  if (selectedSongsIds.value.has(id)) {
    selectedSongsIds.value.delete(id);
  } else {
    selectedSongsIds.value.add(id);
  }
}
</script>

<template>
  <UPage class="h-full overflow-y-auto custom-scrollbar">
    <UPageBody class="p-8">
      <div v-if="recommendations.length > 0">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
        >
          <h2 class="text-2xl font-bold text-text-main">
            Músicas Recomendadas
          </h2>

          <UButton
            v-bind="ghostButton"
            icon="i-heroicons-plus-circle"
            label="Adicionar à playlist"
            class="px-4"
            @click="openPlaylistSelection"
          />
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto max-w-screen-2xl"
        >
          <MusicCard
            v-for="track in recommendations"
            :key="track.id"
            :track="track"
          />
        </div>
      </div>

      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12"
      >
        <div class="relative w-64 h-64 flex items-center justify-center">
          <div
            class="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse"
            style="animation-duration: 4s"
          ></div>
          <div
            class="absolute inset-10 bg-primary/10 blur-2xl rounded-full"
          ></div>

          <div
            class="absolute inset-0 border border-white/5 rounded-full animate-[spin_12s_linear_infinite]"
          ></div>
          <div
            class="absolute inset-0 border-t border-primary/20 rounded-full animate-[spin_12s_linear_infinite]"
          ></div>

          <div
            class="absolute inset-8 border border-white/10 rounded-full animate-[spin_8s_linear_infinite]"
            style="animation-direction: reverse"
          ></div>
          <div
            class="absolute inset-8 border-b border-primary/40 rounded-full animate-[spin_8s_linear_infinite]"
            style="animation-direction: reverse"
          ></div>

          <div
            class="relative w-32 h-32 rounded-full bg-linear-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] group hover:scale-110 transition-transform duration-500"
          >
            <UIcon
              name="i-heroicons-sparkles"
              class="w-14 h-14 text-primary drop-shadow-[0_0_15px_rgba(var(--color-primary-DEFAULT),0.8)] animate-pulse"
              style="animation-duration: 3s"
            />
          </div>

          <div
            class="absolute top-4 right-12 w-2 h-2 bg-primary rounded-full blur-[1px] animate-ping"
            style="animation-duration: 3s"
          />
          <div
            class="absolute bottom-12 left-6 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px] animate-pulse"
          />
        </div>

        <div class="space-y-4 max-w-lg px-4 relative z-10">
          <h3
            class="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-primary/50 to-white/60 drop-shadow-sm"
          >
            Descubra novos sons
          </h3>
          <p class="text-xl text-text-muted/80 font-light leading-relaxed">
            O silêncio está prestes a acabar. <br />
            <span class="text-primary/80 font-medium"
              >Peça uma recomendação</span
            >
            e deixe a mágica acontecer.
          </p>
        </div>
      </div>

      <BaseModal v-model="isPlaylistModalOpen" title="Salvar na playlist">
        <div class="space-y-2">
          <p class="text-sm text-text-muted mb-4">
            Escolha em qual playlist você deseja salvar as recomendações.
          </p>
          <div class="grid gap-2">
            <button
              v-for="playlist in playlists"
              :key="playlist.id"
              class="flex items-center gap-4 p-3 rounded-md hover:bg-surface-highlight transition-colors text-left w-full group"
              @click="selectPlaylist(playlist.id)"
            >
              <div
                class="w-12 h-12 rounded flex items-center justify-center shrink-0 shadow-sm"
                :class="
                  playlist.gradient || playlist.color || 'bg-surface-elevated'
                "
              >
                <UIcon
                  v-if="playlist.icon"
                  :name="playlist.icon"
                  class="text-white w-6 h-6"
                />
              </div>
              <div class="flex flex-col min-w-0">
                <span
                  class="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors"
                >
                  {{ playlist.name }}
                </span>
                <span class="text-xs text-text-muted">
                  {{ playlist.count }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </BaseModal>

      <BaseModal v-model="isSongSelectionModalOpen" title="Selecionar músicas">
        <div class="space-y-4">
          <p class="text-sm text-text-muted">
            Selecione quais músicas você deseja adicionar à playlist.
          </p>

          <div
            class="max-h-[400px] overflow-y-auto custom-scrollbar pr-2 space-y-2"
          >
            <div
              v-for="track in recommendations"
              :key="track.id"
              class="flex items-center gap-3 p-2 rounded-md hover:bg-surface-highlight transition-colors cursor-pointer"
              @click="toggleSong(track.id)"
            >
              <UCheckbox
                :model-value="selectedSongsIds.has(track.id)"
                color="primary"
                @click.stop="toggleSong(track.id)"
              />
              <img :src="track.image" class="w-10 h-10 rounded object-cover" />
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-bold text-text-main truncate">{{
                  track.title
                }}</span>
                <span class="text-xs text-text-muted truncate">{{
                  track.artist
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton
              v-bind="ghostButton"
              label="Cancelar"
              @click="isSongSelectionModalOpen = false"
            />
            <UButton
              v-bind="primaryButton"
              :label="`Adicionar ${selectedSongsIds.size} músicas`"
              :disabled="selectedSongsIds.size === 0"
              class="text-black font-bold"
              @click="confirmAddSongs"
            />
          </div>
        </template>
      </BaseModal>
    </UPageBody>
  </UPage>
</template>
