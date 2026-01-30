<script setup lang="ts">
import { ref, computed } from 'vue';
import { iconButton } from '~/binds/buttons';

const props = defineProps<{
  hideFilters?: boolean;
}>();

const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

const accordionItems = computed(() => {
  const items = [];

  if (!props.hideFilters) {
    items.push({
      label: 'Filtros',
      icon: 'i-heroicons-adjustments-horizontal',
      slot: 'filters',
    });
  }

  items.push({
    label: 'Sua Biblioteca',
    icon: 'i-heroicons-book-open',
    slot: 'playlists',
  });

  return items;
});
</script>

<template>
  <aside
    class="flex-col gap-2 border-r border-border bg-background/50 overflow-y-auto hidden md:flex shrink-0 transition-all duration-300 ease-in-out"
    :class="[isCollapsed ? 'w-16' : 'w-80']"
  >
    <div class="flex-1 flex flex-col p-4">
      <div class="flex justify-end mb-4">
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

      <div v-show="!isCollapsed" class="flex-1 flex flex-col min-h-0">
        <UAccordion
          :items="accordionItems"
          :ui="{
            root: 'flex flex-col gap-4',
            item: 'border-none',
            trigger: 'cursor-pointer',
          }"
          multiple
        >
          <template #filters>
            <SidebarFilter />
          </template>

          <template #playlists>
            <SidebarPlaylists />
          </template>
        </UAccordion>
      </div>
    </div>
  </aside>
</template>
