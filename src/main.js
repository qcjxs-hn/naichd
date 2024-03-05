import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ECharts  from 'echarts'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(ECharts).use(Elementplus).mount('#app')
