<template>
  <div
    class="grid grid-cols-[16px_4fr_3fr_2fr_min-content] gap-4 items-center px-2 py-2 rounded-md"
  >
    <USkeleton class="h-4 w-4 bg-white/5 mx-auto" />

    <div class="flex items-center gap-3 overflow-hidden">
      <USkeleton class="w-10 h-10 rounded shrink-0 bg-white/5" />
      <div class="flex flex-col gap-1 w-full overflow-hidden">
        <USkeleton class="h-4 w-3/4 bg-white/5" />
        <USkeleton class="h-3 w-1/2 bg-white/5" />
      </div>
    </div>

    <USkeleton class="h-4 w-2/3 bg-white/5" />

    <USkeleton class="h-4 w-1/2 ml-auto bg-white/5 mr-4" />

    <USkeleton class="h-4 w-8 bg-white/5 mx-auto" />
  </div>
</template>
