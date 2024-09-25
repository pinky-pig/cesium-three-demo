import { defineStore } from 'pinia'
import { SetupStoreId } from '~/store'

export const useBusinessStore = defineStore(SetupStoreId.Business, () => {
  const test = ref<string>(useDateFormat(useNow(), 'YYYY-MM').value)

  function setTest(date: string) {
    test.value = date
  }
  return {
    setTest,
    test,
  }
})
