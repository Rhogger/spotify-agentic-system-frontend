export const usePlayerState = () => {
  const isPlayerVisible = useState('isPlayerVisible', () => false);

  return { isPlayerVisible };
};
