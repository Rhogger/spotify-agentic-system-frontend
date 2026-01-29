<script setup lang="ts">
import { ghostButton, baseButton } from "~/binds/buttons";
const recommendations = [
  {
    id: 1,
    title: "Aurora Waves",
    artist: "Stellar Echoes",
    genre: "Chillwave, Ambient",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQK8y29wgnOGo0eee1HZhtWC8qLRbj8iKVCgMDQn7xMO2uGDKq_qc9tH3ey-BVgj66_ui7_iElHJh6by6gJLtO1or3QeH6aacPZp9tKyk8tOMA6Jvx1BJg1If1HQu_TtVCQtfjxFVrIylvP64265jE8zn070SuhsrMjICfjFMsDkNY58vSFHvh9AN45WdEpTkZ6F8ejmHwXjK0LHijG_ReEEBKifkMRhgVzLN8H_9vhYBsHwWPePs_HT8RBXXvhT7zPijyCZohfTg",
  },
  {
    id: 2,
    title: "Neon Boulevard",
    artist: "Cyberdream",
    genre: "Synthwave, Retro",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApqugEGXEVcQHs9bcA6KJElEJlDeQLwLfib18WOJq3rQ-9jxIeouK5picAVriOzm6f_CA84JePqK13Dcm78f4OtAdpGK3nHjH3vqKeuevLot8Y4woyPy7rjbdVd95-FnLrgv8yrT0EsdZL0Ynozdbjbs8s3jP9Ra7HK5lliKUNQmE7LbRCr1Dsx6yGpqO4e7A7K-1JqZMu-sOuBMZuDZ0rmD9SIfQ7ihkFfJ_Qb4yKHF8RsLg_5jVBBWNffETqNfb6kqOaQuDIvIwg",
  },
  {
    id: 3,
    title: "Lost in Tokyo",
    artist: "Nightfall Collective",
    genre: "Lofi, Hip-Hop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDchtrU0Jvv-6DkgX29sozxWrdJwJNEN8GU4mxlHhSSrduCmNXt-Lw86WykUQr7FzjUZN4xV_oy7QDkSKmnjqsiChDfsijd80qoeOnhlqYVpQBbKhVg_FPnQdXbR_dNcrfE2wZAvqJqE5u4VaPNwoDjDRXc5nrLZdlZBa-mSl09GDqgJAPt1Ei77Hvr9JEUvjSn2kLHWGuA5rkUy0453YHyghQTPO0wLk_6wOU8r_hSH5wP1Yn-xWCi8CW3Xaak_J6lzttM0T4ubVsk",
  },
  {
    id: 4,
    title: "Coastal Drive",
    artist: "Summer Haze",
    genre: "Indie, Pop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZiRv8PRdY4KSRcwq5LxA98JkSX5A2wWKRgr4YUMuqQhpppHMqaA57e8Yaq2i3EsJqKGaVKnwlSaB3qodA1RaYgNil7m94NVIMoEGvxoSjWHoACMa6EiW3alRnsBPlSHw3MC1eWOvqsRJHQ9loVpAiOJMwDfY4MNgBcsEzScLHAZaG4MhPAbY3pxfapFZiPoU2VVAHQAmZy5T_u2FZpQr0MtL9pOqRRaCjkru8bizL0VGbScyaMrbogssUYXtW14wOIlaM1fnOcP--",
  },
  {
    id: 5,
    title: "Desert Moon",
    artist: "Mirage",
    genre: "Electronic, Downtempo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7D0986KqUpSAjbR83Q0QoMZRs5h5y45DrJRoeTDve0iUxr-5M2QdC-2urMPX4rUTbNaql3xmltpcDajxj9tTa6Af7TOjfR7jHKRLO-irWoPNN9Ct5ykOl4sV5t3RRfCvP1zOb-i2t06mCZ-OJUMYWy9SB_qKG4OJxrcvUqn8g7VKF8heIciFjsPCwWKtlxqVsXhi-d0x_JmhzWUXncUuSUqg5u2m58fH2oz7EduGauwNlA4fDq6uVo34dLg_9YO9e3xH34bQvPcPV",
  },
  {
    id: 6,
    title: "Rainy Afternoons",
    artist: "The Chill Folks",
    genre: "Acoustic, Folk",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNyfD0_GCgBVXexnBAX6gKNJACCijSmztdesoNvlz95iGPTWJw-vOg6Ux9LPTysFyVTsGl1dvmv3rsnT_YOTVaI4JqyeYkoOjEGtr80jfrmyJtqBq-0YDpeOsMLfk4MWbqhwDMb6JGpwzGkVVrbQoGhw0YsIl7tTxMbgo2Xj0DrXKANdGCwUjTPuUyisotUS9TmDy-QV7qKc2i5v_EeZru0mkSClrxIAcVkR8MLBTbux2Uqn_zlyw5kubi-jk0BgLKKW9jXPqiXXMB",
  },
  {
    id: 7,
    title: "Metropolis Groove",
    artist: "Urban Knights",
    genre: "Funk, Soul",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQOgw4kzF0_axZr7RCk3LizHxJkdy5SZUvrSe1KAANy4hQMpcMCRzBfMke0CM4rZaL70G6Ollaa8kpQoX8J_SsTy2dMUQd0LjV2h8czRu4FRq2JzpIc4lgBOpTSKIEpbWsSlDKDu2tR-fjklKPGF3WHQHyy6_pRIJhE59CiBuK7jJlWT7FxPzmt_JjySCrapIcPERogNkawlVHrqBGsc-h3qyPKDasNRg5k7eQLwkpLDVNBJ4NpEcS4_Xy7sC2ZUv1SMDuCOuJqk3v",
  },
  {
    id: 8,
    title: "Galactic Cruise",
    artist: "Stardust Voyager",
    genre: "Space Ambient",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoMoSPDQanKmeDtYdYLWejUiIKjKj6EZ2zPjmluTLtrCgsuaqr4ZDVcJ9QpkmkfEs7LPdSxj9sOJyh-pG0CBSQ0_-VooPY4LU68WgyJ1ZBrJXWYEZ3QifiwIgmcNYK98c-t7v0li3ZqQFxvus78IgO4q2rzUmgW5h0yjf6e9wIkeYnErhuCg1OLEZt7RbJFryc0Nm3AG3W3GcvtnpvMga1hJ1vixj1SLU6DMmvmk_S-ZJnWbiU5lO6qn_AghpWrdGbqQN6C5alyl5O",
  },
];
</script>

<template>
  <UPage class="h-full overflow-y-auto custom-scrollbar">
    <UPageBody>
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
      >
        <h2 class="text-2xl font-bold text-text-main">Recomendação Gerada</h2>

        <UButton
          v-bind="ghostButton"
          icon="i-heroicons-plus-circle"
          label="Adicionar tudo à playlist"
          class="px-4"
        />
      </div>

      <UPageGrid>
        <UPageCard
          v-for="track in recommendations"
          :key="track.id"
          class="group cursor-pointer hover:bg-surface-highlight transition-colors duration-300"
        >
          <div class="flex flex-col gap-4">
            <div class="relative w-full aspect-square shadow-lg">
              <img
                :src="track.image"
                :alt="track.title"
                class="w-full h-full object-cover rounded-md"
              />

              <UButton
                v-bind="baseButton"
                icon="i-heroicons-plus"
                color="neutral"
                variant="solid"
                class="absolute top-2 right-2 size-10 bg-black/60 hover:bg-primary hover:text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10"
                title="Adicionar à playlist"
              />

              <PlayButton
                size="xl"
                class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl hover:scale-105 pl-1"
              />
            </div>

            <div class="flex flex-col min-w-0">
              <h3
                class="font-bold text-text-main truncate text-base hover:underline"
              >
                {{ track.title }}
              </h3>

              <p class="text-sm text-text-muted truncate hover:underline">
                {{ track.artist }}
              </p>

              <p class="text-xs text-primary/80 truncate mt-1">
                {{ track.genre }}
              </p>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>
