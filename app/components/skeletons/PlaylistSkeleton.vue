<template>
  <div class="h-full bg-background flex flex-col">
    <div
      class="h-[340px] bg-linear-to-b from-white/5 to-background p-6 flex items-end gap-6"
    >
      <USkeleton class="min-w-52 w-52 h-52 shadow-2xl rounded-md bg-white/5" />

      <div class="flex flex-col gap-4 w-full max-w-2xl">
        <USkeleton class="h-4 w-24 bg-white/5" />
        <USkeleton class="h-16 w-3/4 bg-white/5" />
        <USkeleton class="h-4 w-full bg-white/5" />

        <div class="flex items-center gap-2">
          <USkeleton class="w-6 h-6 rounded-full bg-white/5" />
          <USkeleton class="h-4 w-32 bg-white/5" />
        </div>
      </div>
    </div>

    <div class="p-6">
      <div
        class="grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4 mb-4 py-2 border-b border-white/5"
      >
        <USkeleton class="h-4 w-4 bg-white/5 mx-auto" />
        <USkeleton class="h-4 w-24 bg-white/5" />
        <USkeleton class="h-4 w-24 bg-white/5" />
        <USkeleton class="h-4 w-20 bg-white/5 ml-auto mr-4" />
        <USkeleton class="h-5 w-5 bg-white/5 mx-auto" />
      </div>

      <div class="space-y-1">
        <PlaylistTrackSkeleton v-for="i in 10" :key="i" />
      </div>
    </div>
  </div>
</template>
