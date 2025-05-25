const getEnv = (): ImportMetaEnv => {
  try {
    const env = import.meta.env;
    if (!env.VITE_GOOGLE_CLIENT_ID) throw new Error("Missing GOOGLE CLIENT ID");
    if (!env.VITE_GOOGLE_CLIENT_SECRET)
      throw new Error("Missing GOOGLE CLIENT SECRET");
    if (!env.VITE_GITHUB_CLIENT_ID) throw new Error("Missing GITHUB CLIENT ID");
    if (!env.VITE_GITHUB_CLIENT_SECRET)
      throw new Error("Missing GITHUB CLIENT SECRET");
    if (!env.VITE_BASE_URL_API) throw new Error("Missing BASE URL API");

    return env;
  } catch (error) {
    console.error("Environment configuration error: ", error);
    throw error;
  }
};

export default getEnv;
