export const TOKEN_KEY = '@gestor-de-accs:token';
export const USERID_KEY = '@gestor-de-accs:user-id';
export const USER_PERFIL_KEY = '@gestor-de-accs:user-perfil';

export const isAuthenticated = (): boolean =>
  sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
export const login = (
  token: string,
  userId: string,
  userPerfil: string,
): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USERID_KEY, userId);
  sessionStorage.setItem(USER_PERFIL_KEY, userPerfil);
};
export const logout = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
