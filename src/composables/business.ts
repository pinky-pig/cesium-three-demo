import { useStorage } from '@vueuse/core'

// bind object
export const businessStorage = useStorage(
  'business-store',
  { homeData: {} },
  localStorage,
)
