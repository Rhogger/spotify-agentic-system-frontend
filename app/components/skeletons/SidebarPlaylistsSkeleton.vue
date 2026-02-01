<template>
  <div class="space-y-1">
    <div v-for="i in 5" :key="i" class="flex items-center gap-3 p-2 rounded-md">
      <USkeleton class="w-12 h-12 rounded-md bg-white/5" />

      <div class="flex-1 space-y-2">
        <USkeleton class="h-4 w-3/4 bg-white/5" />
        <USkeleton class="h-3 w-1/2 bg-white/5" />
      </div>
    </div>
  </div>
</template>
