export const TOKEN_KEY = '@gestor-de-accs:token';
export const USERID_KEY = '@gestor-de-accs:user-id';

export const isAuthenticated = (): boolean =>
  sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
export const login = (token: string, userId: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USERID_KEY, userId);
};
export const logout = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
