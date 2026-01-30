import type { User } from '~/models/user';
import { getApi } from '~/services/api';

export const useAuth = () => {
  const userCookie = useCookie<User | null>('auth-user-cache', {
    maxAge: 60 * 60 * 24,
    watch: true,
  });

  const user = useState<User | null>(
    'auth-user',
    () => userCookie.value || null,
  );
  const token = useState<string | null>('spotify-token', () => null);
  const isLoading = useState<boolean>('auth-loading', () => false);

  const isAuthenticated = computed(() => !!user.value);

  const setUser = (newUser: User) => {
    user.value = newUser;
    userCookie.value = newUser;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    userCookie.value = null;
    const accessCookie = useCookie('access_token');
    const refreshCookie = useCookie('refresh_token');
    const spotifyAccessCookie = useCookie('spotify_access_token');
    const spotifyRefreshCookie = useCookie('spotify_refresh_token');

    accessCookie.value = null;
    refreshCookie.value = null;
    spotifyAccessCookie.value = null;
    spotifyRefreshCookie.value = null;

    navigateTo('/');
  };

  const fetchUser = async (currentToken?: string) => {
    const api = getApi();
    isLoading.value = true;
    try {
      const cookieToken = useCookie('access_token');
      const tokenToUse = currentToken || token.value || cookieToken.value;

      if (!tokenToUse) {
        isLoading.value = false;
        return null;
      }

      const { data } = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      setUser(data);
      setToken(tokenToUse);
      return data;
    } catch (e) {
      console.error('Failed to fetch user', e);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    fetchUser,
  };
};
