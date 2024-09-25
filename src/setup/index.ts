import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import type { App } from 'vue'

export function setupPrimeVue(app: App) {
  app.use(PrimeVue, {
    locale: {
      // prettier-ignore
      monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    theme: {
      options: {
        cssLayer: false,
        darkModeSelector: 'system',
        prefix: 'p',
      },
      preset: Aura,
    },

    zIndex: {
      menu: 1000, //overlay menus
      modal: 1100, //dialog, drawer
      overlay: 1000, //select, popover
      tooltip: 1100, //tooltip
    },
  })
}
