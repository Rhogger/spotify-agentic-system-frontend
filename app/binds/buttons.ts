import type { ButtonProps } from '#ui/types';

export const baseButton: Partial<ButtonProps & { class: string }> = {
  class:
    'rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all font-bold',
};

export const ghostButton: Partial<ButtonProps & { class: string }> = {
  ...baseButton,
  variant: 'ghost',
  color: 'neutral',
  class: `${baseButton.class} text-text-muted hover:text-white hover:bg-white/10 active:bg-white/10 focus:bg-transparent focus-visible:bg-transparent`,
};

export const primaryButton: Partial<ButtonProps & { class: string }> = {
  ...baseButton,
  variant: 'solid',
  color: 'primary',
  class: `${baseButton.class} text-black hover:scale-105 active:scale-95 shadow-lg`,
};

export const destructiveButton: Partial<ButtonProps & { class: string }> = {
  ...primaryButton,
  color: 'error',
  class: `${baseButton.class} bg-red-500 hover:bg-red-600 text-white hover:scale-105 active:scale-95 shadow-lg`,
};

export const iconButton: Partial<ButtonProps & { class: string }> = {
  ...ghostButton,
  class: `${ghostButton.class} p-0 flex items-center justify-center w-8 h-8`,
};
