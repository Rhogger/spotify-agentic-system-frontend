<script setup lang="ts">
// Simple static footer
</script>

<template>
  <footer
    class="relative z-10 px-6 md:px-14 py-12 border-t border-white/5 bg-[#080d0a]"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Top row: brand + social links -->
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5"
      >
        <!-- Brand -->
        <div class="flex flex-col items-center md:items-start gap-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-simple-icons-spotify" class="w-5 h-5 text-primary" />
            <span class="font-black text-lg text-white"
              >Spotify<span class="text-primary">Recs</span></span
            >
          </div>
          <p class="text-xs text-white/30 max-w-xs text-center md:text-left">
            Sistema de recomendação musical com IA generativa. Projeto acadêmico
            de pós-graduação em
            <strong class="text-white/50"
              >Data Science & Machine Learning</strong
            >
            na Unirv.
          </p>
        </div>

        <!-- Social links -->
        <div class="flex flex-col items-center md:items-end gap-4">
          <p
            class="text-[10px] text-white/25 font-medium tracking-wider uppercase"
          >
            Desenvolvido por
          </p>
          <div class="flex flex-col items-center md:items-end gap-3">
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-white/70"
                >Rhogger Freitas</span
              >
              <div class="flex items-center gap-2">
                <a href="#" class="footer-icon-link" title="LinkedIn - Rhogger">
                  <UIcon name="i-simple-icons-linkedin" class="w-4 h-4" />
                </a>
                <a href="#" class="footer-icon-link" title="GitHub - Rhogger">
                  <UIcon name="i-simple-icons-github" class="w-4 h-4" />
                </a>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-white/70"
                >Pedro Henrique</span
              >
              <div class="flex items-center gap-2">
                <a href="#" class="footer-icon-link" title="LinkedIn - Pedro">
                  <UIcon name="i-simple-icons-linkedin" class="w-4 h-4" />
                </a>
                <a href="#" class="footer-icon-link" title="GitHub - Pedro">
                  <UIcon name="i-simple-icons-github" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom row: copyright + tech stack -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-white/20"
      >
        <span
          >© {{ new Date().getFullYear() }} SpotifyRecs. Projeto
          acadêmico.</span
        >
        <div class="flex items-center gap-3">
          <span class="text-white/15">Feito com</span>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-simple-icons-nuxtdotjs"
              class="w-4 h-4 text-emerald-500/60"
              title="Nuxt"
            />
            <UIcon
              name="i-simple-icons-fastapi"
              class="w-4 h-4 text-teal-500/60"
            />
            <UIcon
              name="i-simple-icons-google"
              class="w-4 h-4 text-blue-400/60"
            />
            <UIcon
              name="i-simple-icons-spotify"
              class="w-4 h-4 text-primary/60"
              title="Spotify API"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ── Footer icon links ── */
.footer-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: all 0.25s ease;
}
.footer-icon-link:hover {
  border-color: rgba(56, 224, 123, 0.4);
  background: rgba(56, 224, 123, 0.1);
  color: #38e07b;
}
</style>
