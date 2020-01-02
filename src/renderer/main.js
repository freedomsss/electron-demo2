import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
// eslint-disable-next-line camelcase
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
// eslint-disable-next-line camelcase
import video_en from 'video.js/dist/lang/en.json'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import common from './utils/common' // 引入common

Vue.use(common)

Vue.prototype.$video = Video
Video.addLanguage('zh-CN', video_zhCN)
Video.addLanguage('en', video_en)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI, { locale, size: 'small' })

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
