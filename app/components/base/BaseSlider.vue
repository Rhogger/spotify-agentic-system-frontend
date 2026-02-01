<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    color?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warning'
      | 'error'
      | 'neutral';
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    size: 'sm',
    disabled: false,
    color: 'primary',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <USlider
    v-model="value"
    :min="min"
    :max="max"
    :step="step"
    :size="size"
    :disabled="disabled"
    :color="color"
    class="cursor-pointer"
    :ui="{
      track: 'bg-surface-input cursor-pointer',
      range: 'bg-(--color-primary)',
      thumb: 'bg-white ring-2 ring-(--color-primary) cursor-pointer',
    }"
  />
</template>
