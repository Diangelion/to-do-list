import React, { createContext, useEffect, useState } from "react";
import type {
  GlobalContextValue,
  GlobalProviderProps,
  GlobalState,
} from "./global.context.types";
import getEnv from "@/lib/env";

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState | object>({});
  const value = {
    globalState,
    setGlobalState,
  };

  useEffect(() => {
    try {
      getEnv();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
