export const useChatDrawer = () => {
  const isOpen = useState<boolean>("chat-drawer-open", () => false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
