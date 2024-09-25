import { defineStore } from 'pinia'
import { SetupStoreId } from '~/store'
import * as Cesium from 'cesium'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const appName = ref('Starter Vue')
  const appTitle = ref('城市一体化作战推演平台')

  const appStatus = ref(['综合态势', '目标优选', '路径规划', '传播推演'])
  const currentAppStatus = ref('综合态势')
  const appCesiumViewer = ref<Cesium.Viewer | null>(null)

  const currentSelectTarget = ref<any>(null)

  const appLeftShowIndex = ref(0)
  const appRightBottomShowIndex = ref(-1)
  // 展示调度中心的 iframe
  const appShowDDZXIframe = ref(false)
  // 展示变电站的 iframe
  const appShowBDZIframe = ref(false)
  return {
    appName,
    appTitle,
    appStatus,
    appCesiumViewer,
    currentAppStatus,
    appLeftShowIndex,
    currentSelectTarget,
    appRightBottomShowIndex,
    appShowDDZXIframe,
    appShowBDZIframe,
  }
})
