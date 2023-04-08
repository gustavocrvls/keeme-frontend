import { useState, useContext, ReactNode, createContext } from 'react';

interface SessionContextData {
  userUsername: string;
  setUserUsername: (userUsername: string) => void;
}

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({
  children,
}: SessionProviderProps): JSX.Element {
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');

  return (
    <SessionContext.Provider value={{ userUsername, setUserUsername }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextData {
  return useContext(SessionContext);
}
