<script setup lang="ts">
import { primaryButton } from '~/binds/buttons';
</script>

<template>
  <div
    class="relative h-full w-full flex flex-col items-center justify-center overflow-hidden"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
    ></div>

    <UIcon
      name="i-heroicons-musical-note"
      class="absolute text-[30rem] text-white/2 -rotate-12 pointer-events-none select-none"
    />

    <div class="relative z-10 flex flex-col items-center text-center p-8">
      <div class="mb-8 relative group">
        <div
          class="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500"
        ></div>

        <UIcon
          name="i-heroicons-exclamation-circle"
          class="relative w-24 h-24 text-primary drop-shadow-[0_0_15px_rgba(var(--color-primary),0.5)] animate-pulse"
        />
      </div>

      <h1 class="text-5xl font-black text-white mb-4 tracking-tight">
        Playlist não encontrada
      </h1>

      <p class="text-lg text-text-muted mb-10 max-w-md leading-relaxed">
        Não conseguimos encontrar essa playlist. Ela pode ter sido removida,
        tornada privada ou o link está incorreto.
      </p>

      <div class="flex items-center gap-4">
        <UButton
          v-bind="primaryButton"
          label="Voltar para o Início"
          to="/home"
          size="xl"
          class="px-10 font-bold hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/20"
        />
      </div>
    </div>
  </div>
</template>
