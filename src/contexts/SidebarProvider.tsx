import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface SidebarContextData {
  isSidebarOpen: boolean;
  isSidebarAwaysShowed: boolean;
  windowWidth: number;
  toggleSidebarOpen: () => void;
}

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarContext = createContext({} as SidebarContextData);

export function SidebarProvider({
  children,
}: SidebarProviderProps): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarAwaysShowed, setIsSidebarAwaysShowed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (windowWidth > 750) setIsSidebarAwaysShowed(true);
    else setIsSidebarAwaysShowed(false);
  }, [windowWidth]);

  function toggleSidebarOpen() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        isSidebarAwaysShowed,
        windowWidth,
        toggleSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
