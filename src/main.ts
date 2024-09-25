import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './styles/global.css'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupPrimeVue } from './setup'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import 'animate.css';

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupPrimeVue(app)

app.mount('#app')
