export interface StorageService<T = string> {
  get: (key: string) => Promise<T | null>
  set: (key: string, value: T, options?: Object) => Promise<boolean>
  remove: (key: string) => Promise<boolean>
  clear: () => Promise<boolean>
}
