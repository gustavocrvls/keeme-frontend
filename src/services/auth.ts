export const TOKEN_KEY = '@gestor-de-accs:token';
export const USERID_KEY = '@gestor-de-accs:user-id';
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const login = (token: string, userId: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USERID_KEY, userId);
};
export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};
