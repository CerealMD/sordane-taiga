// src/contexts/SpinnerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Spinner from './spinner';

interface SpinnerContextType {
  isVisible: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showSpinner = () => setIsVisible(true);
  const hideSpinner = () => setIsVisible(false);

  return (
    <SpinnerContext.Provider value={{ isVisible, showSpinner, hideSpinner }}>
      {children}
      {isVisible && <Spinner />}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (context === undefined) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return context;
};
