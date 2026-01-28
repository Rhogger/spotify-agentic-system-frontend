<script setup lang="ts">
// AppMain Component (Content Wrapper + Footer content)
</script>

<template>
  <main
    class="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[var(--color-background)]"
  >
    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto scroll-smooth p-6">
      <div class="max-w-7xl mx-auto w-full pb-20">
        <!-- Added padding bottom for player overlap if needed -->
        <slot />

        <!-- Footer inside content (Copyright/Links) - distinct from Player -->
        <footer
          class="mt-16 py-8 border-t border-[var(--color-border)] text-[var(--color-text-dim)] text-sm"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p>&copy; 2026 Spotify Agentic System</p>
            <div class="flex gap-4">
              <a
                href="#"
                class="hover:text-[var(--color-text-main)] transition-colors"
                >Privacy</a
              >
              <a
                href="#"
                class="hover:text-[var(--color-text-main)] transition-colors"
                >Terms</a
              >
            </div>
          </div>
        </footer>
      </div>
    </div>
  </main>
</template>
