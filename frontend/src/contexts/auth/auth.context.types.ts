import type { ReactNode } from "react";

export type AuthState = {
  user: string | "";
  isLoggedIn: boolean;
};

export type AuthContextValue = {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

export type AuthProviderProps = {
  children: ReactNode;
};
