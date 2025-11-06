import React, { createContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  navigationOpen: boolean;
  setNavigationOpen: (open: boolean) => void;
  navigationExpend: boolean;
  setNavigationExpend: (expend: boolean) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [navigationExpend, setNavigationExpend] = useState(false);

  const value: NavigationContextType = {
    navigationOpen,
    setNavigationOpen,
    navigationExpend,
    setNavigationExpend,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

