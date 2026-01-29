<script setup lang="ts">
/**
 * UserAvatar Component
 *
 * Displays user avatar or fallback initials with consistent styling.
 *
 * Props:
 * - src: Image URL (optional)
 * - alt: Alt text (optional, default "User")
 * - size: Avatar size (default "sm") - compatible with UAvatar
 * - initials: Text to display if no image (optional)
 */

interface Props {
  src?: string;
  alt?: string;
  size?: "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  initials?: string;
}

withDefaults(defineProps<Props>(), {
  alt: "User",
  size: "sm",
  initials: "",
});
</script>

<template>
  <UAvatar
    :src="src"
    :alt="alt"
    :size="size"
    :text="initials"
    class="cursor-pointer bg-primary/20 text-black font-bold ring-2 ring-transparent transition-all group-hover:ring-primary/50"
    :ui="{
      root: 'relative inline-flex items-center justify-center flex-shrink-0 rounded-full select-none overflow-hidden',
      image: 'h-full w-full object-cover rounded-full',
      fallback:
        'font-bold leading-none text-black truncate flex items-center justify-center bg-primary',
    }"
  >
    <template #fallback v-if="!src">
      <div
        class="h-full w-full flex items-center justify-center bg-primary text-black font-bold"
      >
        {{ initials }}
      </div>
    </template>
  </UAvatar>
</template>
