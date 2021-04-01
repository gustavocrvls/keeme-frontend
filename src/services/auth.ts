export const TOKEN_KEY = '@keeme:token';
export const USERID_KEY = '@keeme:user-id';
export const USER_PERFIL_KEY = '@keeme:user-perfil';
export const USER_NAME_KEY = '@keeme:user-name';
export const USER_COURSE_KEY = '@keeme:user-course';

export const isAuthenticated = (): boolean =>
  sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
export const login = (
  token: string,
  userId: string,
  userPerfil: string,
  userName: string,
  userCourse: string,
): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USERID_KEY, userId);
  sessionStorage.setItem(USER_PERFIL_KEY, userPerfil);
  sessionStorage.setItem(USER_NAME_KEY, userName);
  sessionStorage.setItem(USER_COURSE_KEY, userCourse);
};
export const logout = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
