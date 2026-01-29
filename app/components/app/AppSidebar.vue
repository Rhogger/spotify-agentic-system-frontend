<script setup lang="ts">
import { ref } from "vue";
import { iconButton } from "~/binds/buttons";

defineProps<{
  hideFilters?: boolean;
}>();

const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <aside
    class="flex-col gap-2 border-r border-border bg-background/50 overflow-y-auto hidden md:flex shrink-0 transition-all duration-300 ease-in-out"
    :class="[isCollapsed ? 'w-16' : 'w-80']"
  >
    <div class="flex-1 p-4 space-y-6 flex flex-col">
      <div class="flex justify-end pr-2">
        <UButton
          v-bind="iconButton"
          :icon="
            isCollapsed
              ? 'i-lucide-panel-left-open'
              : 'i-lucide-panel-left-close'
          "
          class="transition-colors"
          @click="toggleSidebar"
        />
      </div>

      <div class="flex flex-col shrink-0">
        <div v-if="!isCollapsed && !hideFilters" class="flex flex-col gap-4">
          <div class="px-1 text-lg font-bold text-text-main mb-2">Filters</div>

          <SidebarFilter />
        </div>
      </div>

      <div
        :class="[
          hideFilters ? 'flex-1 min-h-0' : 'mt-auto shrink-0',
          { 'pt-4 border-t border-border': !isCollapsed && !hideFilters },
        ]"
      >
        <div v-if="!isCollapsed" class="h-full">
          <SidebarPlaylists />
        </div>
      </div>
    </div>
  </aside>
</template>
