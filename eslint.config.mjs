// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  ignores: ['.nuxt/**', 'dist/**'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  },
});
