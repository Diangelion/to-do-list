import { loginApi } from "@/api/auth/auth.api";
import type {
  LoginServicesParams,
  LoginServicesReturn,
} from "./auth.services.types";

export const loginService = async (
  params: LoginServicesParams
): Promise<LoginServicesReturn | null> => {
  if (!params.token) Promise.reject(new Error("Token cannot be empty!"));

  try {
    const response = await loginApi;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
  return null;
};
