const getEnv = (): ImportMetaEnv => {
  try {
    const env = import.meta.env
    if (!env.VITE_BASE_URL_API) throw new Error('Missing VITE_BASE_URL_API')
    if (!env.VITE_GOOGLE_CLIENT_ID)
      throw new Error('Missing VITE_GOOGLE_CLIENT_ID')
    if (!env.VITE_FACEBOOK_APP_ID)
      throw new Error('Missing VITE_FACEBOOK_APP_ID')
    if (!env.VITE_GITHUB_BASE_URL)
      throw new Error('Missing VITE_GITHUB_BASE_URL')
    if (!env.VITE_GITHUB_CLIENT_ID)
      throw new Error('Missing VITE_GITHUB_CLIENT_ID')
    if (!env.VITE_GITHUB_CALLBACK_URL)
      throw new Error('Missing VITE_GITHUB_CALLBACK_URL')

    return env
  } catch (error) {
    console.error('getEnv | Environment configuration error: ', error)
    throw error
  }
}

export default getEnv
