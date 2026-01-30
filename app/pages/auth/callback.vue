<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

definePageMeta({
  layout: 'public',
});

const route = useRoute();
const { setToken, fetchUser } = useAuth();

const processing = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  const token = route.query.token as string;
  const refresh = route.query.refresh as string;
  const errorParam = route.query.error as string;

  if (errorParam) {
    error.value = `Erro na autenticação: ${errorParam}`;
    processing.value = false;
    return;
  }

  if (!token) {
    error.value = 'Token de acesso não encontrado.';
    processing.value = false;
    return;
  }

  try {
    const accessTokenCookie = useCookie('access_token', { maxAge: 604800 });
    accessTokenCookie.value = token;

    if (refresh) {
      const refreshTokenCookie = useCookie('refresh_token', {
        maxAge: 2419200,
      });
      refreshTokenCookie.value = refresh;
    }

    setToken(token);
    await fetchUser(token);

    setTimeout(() => {
      navigateTo('/home');
    }, 1000);
  } catch (e) {
    console.error('Callback error:', e);
    error.value = 'Falha ao processar login.';
  } finally {
    processing.value = false;
  }
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4"
  >
    <div v-if="processing" class="flex flex-col items-center gap-4">
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-12 h-12 animate-spin text-primary"
      />
      <h1 class="text-2xl font-bold">Conectando ao Spotify...</h1>
    </div>

    <div v-else-if="error" class="flex flex-col items-center gap-4 text-center">
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="w-12 h-12 text-red-500"
      />
      <h1 class="text-2xl font-bold text-red-500">Erro</h1>
      <p class="text-text-muted">{{ error }}</p>
      <UButton
        to="/"
        color="neutral"
        variant="solid"
        label="Voltar para a Home"
        class="mt-4"
      />
    </div>

    <div v-else class="flex flex-col items-center gap-4">
      <UIcon name="i-heroicons-check-circle" class="w-12 h-12 text-green-500" />
      <h1 class="text-2xl font-bold text-white">Conectado!</h1>
      <p class="text-text-muted">Redirecionando...</p>
    </div>
  </div>
</template>
