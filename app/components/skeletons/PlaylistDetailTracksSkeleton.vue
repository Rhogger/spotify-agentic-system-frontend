<template>
  <div class="space-y-1">
    <div
      class="grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4 mb-4 py-2 border-b border-white/5"
    >
      <USkeleton class="h-4 w-4 bg-white/5 mx-auto" />
      <USkeleton class="h-4 w-24 bg-white/5" />
      <USkeleton class="h-4 w-24 bg-white/5" />
      <USkeleton class="h-4 w-20 bg-white/5 ml-auto mr-4" />
      <USkeleton class="h-5 w-5 bg-white/5 mx-auto" />
    </div>

    <PlaylistTrackSkeleton v-for="i in 10" :key="i" />
  </div>
</template>
