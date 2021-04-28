import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

interface SidebarContextData {
  isSidebarOpen: boolean;
  isSidebarAwaysShowed: boolean;
  windowWidth: number;
  sidebarRef: any;
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
  const sidebarRef = useRef<any>();

  function toggleSidebarOpen() {
    setIsSidebarOpen(!isSidebarOpen);
  }

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

  useEffect(() => {
    document.addEventListener('mousedown', event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    });
  }, [sidebarRef]);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        isSidebarAwaysShowed,
        windowWidth,
        toggleSidebarOpen,
        sidebarRef,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
