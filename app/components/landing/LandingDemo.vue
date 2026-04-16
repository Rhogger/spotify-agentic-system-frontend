<script setup lang="ts">
import { ref } from 'vue';

// ── Demo Playground ───────────────────────────────────────────────
interface DemoTrack {
  id: number;
  spotify_id: string;
  name: string;
  artists: string;
  energy: number;
  danceability: number;
  valence: number;
  acousticness: number;
  explicit: boolean;
  image_url: string | null;
}

const demoFeatures = ref({
  energy: 0.7,
  danceability: 0.65,
  valence: 0.6,
  acousticness: 0.15,
  is_popular: true,
  explicit: false,
  decade: null as string | null,
});
const demoTracks = ref<DemoTrack[]>([]);
const demoLoading = ref(false);
const demoError = ref(false);

const decades = ['1970', '1980', '1990', '2000', '2010', '2020'];

function formatArtists(artists: string) {
  try {
    const parsed = JSON.parse(artists.replace(/'/g, '"'));
    return Array.isArray(parsed) ? parsed.join(', ') : artists;
  } catch {
    return artists;
  }
}

const config = useRuntimeConfig();

async function runDemo() {
  demoLoading.value = true;
  demoError.value = false;
  try {
    const base =
      (config.public.apiBaseUrl as string) || 'http://localhost:8000/api';
    const res = await fetch(`${base.replace(/\/$/, '')}/recommendations/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(demoFeatures.value),
    });
    if (!res.ok) throw new Error('failed');
    const data = await res.json();
    demoTracks.value = data.recommendations;
  } catch {
    demoError.value = true;
  } finally {
    demoLoading.value = false;
  }
}
</script>

<template>
  <section
    data-section="demo"
    class="relative z-10 px-6 md:px-14 py-24 min-h-screen flex flex-col justify-center"
  >
    <div class="max-w-5xl mx-auto w-full">
      <div class="reveal text-center mb-14">
        <p
          class="text-[11px] text-primary/70 font-bold tracking-[0.25em] uppercase mb-4"
        >
          Experimente ao vivo
        </p>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
        >
          Experimente a recomendação.
        </h2>
        <p class="mt-4 text-white/55 text-sm max-w-md mx-auto leading-relaxed">
          Ajuste como você quer ouvir e veja quais músicas aparecem. Sem
          precisar de conta.
        </p>
      </div>

      <!-- Controles -->
      <div class="reveal glass-card rounded-2xl p-6 md:p-8 mb-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <!-- Sliders -->
          <div
            v-for="feat in [
              { key: 'energy', label: 'Energia', icon: 'i-lucide-zap' },
              {
                key: 'danceability',
                label: 'Dançabilidade',
                icon: 'i-lucide-music-2',
              },
              { key: 'valence', label: 'Positividade', icon: 'i-lucide-smile' },
              {
                key: 'acousticness',
                label: 'Acústico',
                icon: 'i-lucide-guitar',
              },
            ]"
            :key="feat.key"
            class="flex flex-col gap-2"
          >
            <div class="flex items-center justify-between">
              <span
                class="flex items-center gap-1.5 text-xs font-semibold text-white/70"
              >
                <UIcon :name="feat.icon" class="w-3.5 h-3.5 text-primary/70" />
                {{ feat.label }}
              </span>
              <span class="text-xs font-bold text-primary tabular-nums">
                {{ demoFeatures[feat.key as 'energy' | 'danceability' | 'valence' | 'acousticness'].toFixed(2) }}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="demoFeatures[feat.key as 'energy' | 'danceability' | 'valence' | 'acousticness']"
              class="demo-slider"
              @input="
                demoFeatures[feat.key as 'energy' | 'danceability' | 'valence' | 'acousticness'] = parseFloat(
                  ($event.target as HTMLInputElement).value,
                )
              "
            />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4 mb-6">
          <!-- Toggles -->
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <div
              class="w-9 h-5 rounded-full transition-colors duration-200 relative"
              :class="demoFeatures.is_popular ? 'bg-primary' : 'bg-white/10'"
              @click="demoFeatures.is_popular = !demoFeatures.is_popular"
            >
              <div
                class="w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all duration-200"
                :class="demoFeatures.is_popular ? 'left-[19px]' : 'left-[3px]'"
              />
            </div>
            <span class="text-xs font-medium text-white/65">Popular</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <div
              class="w-9 h-5 rounded-full transition-colors duration-200 relative"
              :class="demoFeatures.explicit ? 'bg-primary' : 'bg-white/10'"
              @click="demoFeatures.explicit = !demoFeatures.explicit"
            >
              <div
                class="w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all duration-200"
                :class="demoFeatures.explicit ? 'left-[19px]' : 'left-[3px]'"
              />
            </div>
            <span class="text-xs font-medium text-white/65">Explícito</span>
          </label>

          <!-- Decade -->
          <div class="flex flex-wrap items-center gap-1.5 ml-auto">
            <span class="text-xs text-white/65 mr-1">Década:</span>
            <button
              v-for="d in decades"
              :key="d"
              class="px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150"
              :class="
                demoFeatures.decade === d
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-white/45 border-white/10 hover:border-primary/40 hover:text-white/70'
              "
              @click="
                demoFeatures.decade = demoFeatures.decade === d ? null : d
              "
            >
              {{ d }}s
            </button>
          </div>
        </div>

        <button
          class="w-full py-3.5 rounded-xl bg-primary text-black font-black text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_28px_rgba(56,224,123,0.35)]"
          :disabled="demoLoading"
          @click="runDemo"
        >
          <span v-if="!demoLoading">Recomendar agora</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Buscando...
          </span>
        </button>
      </div>

      <!-- Resultados -->
      <Transition name="demo-fade">
        <div v-if="demoTracks.length">
          <p
            class="text-xs text-white/35 text-center mb-6 font-medium tracking-wider uppercase"
          >
            {{ demoTracks.length }} músicas encontradas
          </p>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <a
              v-for="track in demoTracks"
              :key="track.id"
              :href="`https://open.spotify.com/track/${track.spotify_id}`"
              target="_blank"
              rel="noopener"
              class="group block bg-white/4 hover:bg-white/8 border border-white/5 hover:border-white/12 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.4)] cursor-pointer no-underline"
            >
              <!-- Capa -->
              <div
                class="relative aspect-square rounded-lg overflow-hidden mb-3 bg-white/5 shadow-lg"
              >
                <img
                  v-if="track.image_url"
                  :src="track.image_url"
                  :alt="track.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-music"
                    class="w-8 h-8 text-primary/30"
                  />
                </div>
                <!-- Overlay play -->
                <div
                  class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300"
                />
                <div
                  class="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_16px_rgba(56,224,123,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  <UIcon
                    name="i-heroicons-play-solid"
                    class="w-4 h-4 text-black ml-0.5"
                  />
                </div>
              </div>

              <!-- Info -->
              <p
                class="text-sm font-bold text-white/90 truncate group-hover:text-primary transition-colors duration-300"
              >
                {{ track.name }}
              </p>
              <p class="text-xs text-white/45 truncate mt-0.5">
                {{ formatArtists(track.artists) }}
              </p>
              <div v-if="track.explicit" class="mt-1.5">
                <span
                  class="text-[9px] uppercase tracking-widest font-bold text-white/25 px-1.5 py-0.5 rounded border border-white/8"
                  >E</span
                >
              </div>
            </a>
          </div>
        </div>
      </Transition>

      <div v-if="demoError" class="text-center py-8 text-white/35 text-sm">
        Não foi possível conectar ao servidor. Certifique-se de que o backend
        está rodando.
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Scroll reveal (estado inicial) ── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
}

/* ── Glassmorphism ── */
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* ── Demo slider ── */
.demo-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.08);
  outline: none;
  cursor: pointer;
}
.demo-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #38e07b;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(56, 224, 123, 0.5);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.demo-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 16px rgba(56, 224, 123, 0.7);
}
.demo-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #38e07b;
  cursor: pointer;
  border: none;
}

/* ── Demo fade transition ── */
.demo-fade-enter-active,
.demo-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.demo-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.demo-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
