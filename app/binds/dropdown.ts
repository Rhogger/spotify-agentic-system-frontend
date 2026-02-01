import type { DropdownMenuProps } from '#ui/types';

export const baseDropdown: Pick<DropdownMenuProps, 'content' | 'ui'> = {
  content: {
    align: 'start',
    side: 'bottom',
    sideOffset: 8,
  },
  ui: {
    content:
      'bg-surface-dialog border border-white/10 p-1 min-w-48 shadow-xl rounded-md',
    item: 'group flex items-center gap-2 w-full text-text-muted hover:text-white hover:bg-white/10 data-[highlighted]:bg-white/10 data-[highlighted]:text-white data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  },
};
