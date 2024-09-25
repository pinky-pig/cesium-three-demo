import { useStorage } from '@vueuse/core'

// bind object
export const appStorage = useStorage(
  'app-store',
  { token: 'Hello' },
  localStorage,
)
