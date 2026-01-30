import type { User } from '~/models/user';
import { getApi } from '~/services/api';

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null);
  const token = useState<string | null>('spotify-token', () => null);

  const isAuthenticated = computed(() => !!user.value);

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const logout = () => {
    user.value = null;
    token.value = null;
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
    try {
      const cookieToken = useCookie('access_token');
      const tokenToUse = currentToken || token.value || cookieToken.value;

      if (!tokenToUse) return null;

      const { data } = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      user.value = data;
      return data;
    } catch (e) {
      console.error('Failed to fetch user', e);
      return null;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    fetchUser,
  };
};
