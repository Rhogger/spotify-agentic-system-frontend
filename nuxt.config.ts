// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/mdc'],

  future: {
    compatibilityVersion: 4,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
        commaDangle: 'always-multiline',
        braceStyle: '1tbs',
      },
    },
  },

  icon: {
    customCollections: [
      {
        prefix: 'images',
        dir: './app/assets/images',
      },
    ],
  },
});