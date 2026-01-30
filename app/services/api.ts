import axios from 'axios';
import { toastError } from '~/binds/toasts';

let apiInstance: ReturnType<typeof axios.create>;

export const getApi = () => {
  if (!apiInstance) {
    const config = useRuntimeConfig();
    const baseURL =
      (config.public.apiBaseUrl as string) || 'http://localhost:8000/api';

    const toast = useToast();

    apiInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response ? error.response.status : null;

        if (status && (status < 200 || status >= 300)) {
          const message =
            error.response.data?.message ||
            error.response.data?.error ||
            `Erro ${status}: Falha na requisição`;
          toast.add(toastError(message));
        } else if (!status) {
          toast.add(toastError('Erro de conexão ou servidor indisponível.'));
        }

        return Promise.reject(error);
      },
    );
  }
  return apiInstance;
};
