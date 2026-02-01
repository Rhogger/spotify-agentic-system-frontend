<script setup lang="ts">
import { primaryButton } from '~/binds/buttons';

defineProps<{
  loading?: boolean;
}>();

defineEmits(['generate']);
</script>

<template>
  <div
    class="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12"
  >
    <div class="relative w-64 h-64 flex items-center justify-center">
      <div
        class="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse"
        style="animation-duration: 4s"
      ></div>
      <div class="absolute inset-10 bg-primary/10 blur-2xl rounded-full"></div>

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

    <div
      class="space-y-6 max-w-lg px-4 relative z-10 flex flex-col items-center"
    >
      <div class="space-y-4">
        <h3
          class="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-primary/50 to-white/60 drop-shadow-sm"
        >
          Descubra novos sons
        </h3>
        <p class="text-xl text-text-muted/80 font-light leading-relaxed">
          O silêncio está prestes a acabar. <br />
          <span class="text-primary/80 font-medium">Peça uma recomendação</span>
          e deixe a mágica acontecer.
        </p>
      </div>

      <UButton
        v-bind="primaryButton"
        label="Gerar Recomendação"
        size="xl"
        :loading="loading"
        class="px-8 py-3 text-lg font-bold min-w-[200px]"
        @click="$emit('generate')"
      />
    </div>
  </div>
</template>
