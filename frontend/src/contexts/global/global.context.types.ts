import type { ReactNode } from "react";

export type GlobalState = {
  env: ImportMetaEnv;
};

export type GlobalContextValue = {
  globalState: GlobalState | object;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

export type GlobalProviderProps = {
  children: ReactNode;
};
