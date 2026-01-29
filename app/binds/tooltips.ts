import type { TooltipProps } from '#ui/types';

export const baseTooltip: Partial<TooltipProps> = {
  content: {
    side: 'top',
    sideOffset: 5,
  },
  delayDuration: 0,
  ui: {
    content:
      'bg-surface-elevated text-text-main ring-1 ring-border shadow-lg px-2 py-1 text-xs rounded',
    arrow: 'fill-surface-elevated',
  },
};
