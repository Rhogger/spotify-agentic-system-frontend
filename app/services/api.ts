import axios from 'axios';

let apiInstance: ReturnType<typeof axios.create>;

export const getApi = () => {
  if (!apiInstance) {
    const config = useRuntimeConfig();
    const baseURL =
      (config.public.apiBaseUrl as string) || 'http://localhost:8000/api';

    apiInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return apiInstance;
};
