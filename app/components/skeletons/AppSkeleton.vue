<template>
  <div class="flex flex-col h-screen w-full overflow-hidden bg-background">
    <div
      class="h-16 w-full flex items-center px-6 gap-4 shrink-0 bg-background/95 border-b border-border"
    >
      <USkeleton class="w-8 h-8 rounded-full bg-surface-elevated" />
      <USkeleton class="w-32 h-6 rounded bg-surface-elevated" />
      <div class="flex-1"></div>
      <USkeleton class="w-9 h-9 rounded-full bg-surface-elevated" />
    </div>

    <div class="flex flex-1 overflow-hidden relative">
      <div
        class="w-80 hidden md:flex flex-col gap-4 p-4 border-r border-border bg-background/50"
      >
        <div class="flex justify-end">
          <USkeleton class="w-8 h-8 rounded bg-surface-elevated" />
        </div>

        <div class="space-y-4">
          <USkeleton class="h-12 w-full rounded-lg bg-surface-elevated" />
          <USkeleton class="h-12 w-full rounded-lg bg-surface-elevated" />
        </div>
      </div>

      <div class="flex-1 m-2 rounded-lg p-8 space-y-8 overflow-hidden relative">
        <USkeleton class="h-8 w-64 rounded bg-surface-elevated" />

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <USkeleton
            v-for="i in 20"
            :key="i"
            class="aspect-square bg-surface-elevated rounded-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>
