export const toastSuccess = (description: string) => ({
  title: 'Sucesso!',
  description,
  color: 'success' as const,
  icon: 'i-heroicons-check-circle',
});

export const toastError = (description: string) => ({
  title: 'Erro!',
  description,
  color: 'error' as const,
  icon: 'i-heroicons-x-circle',
});

export const toastWarning = (description: string) => ({
  title: 'Atenção!',
  description,
  color: 'warning' as const,
  icon: 'i-heroicons-exclamation-triangle',
});

export const toastInfo = (description: string) => ({
  title: 'Info',
  description,
  color: 'info' as const,
  icon: 'i-heroicons-information-circle',
});
