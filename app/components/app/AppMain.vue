<script setup lang="ts"></script>

<template>
  <main
    class="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-background"
  >
    <div class="flex-1 overflow-y-auto scroll-smooth p-6">
      <div class="max-w-7xl mx-auto w-full pb-20">
        <slot />
      </div>
    </div>
  </main>
</template>
