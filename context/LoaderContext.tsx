// context/LoaderContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoaderContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
  loading: false,
  setLoading: () => {},
});

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
