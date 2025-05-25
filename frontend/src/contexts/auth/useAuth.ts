import { useContext } from "react";
import AuthContext from "./AuthContext";
import type { AuthContextValue } from "./auth.context.types";

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Error useAuth.ts");
  }

  return context;
};

export default useAuth;
