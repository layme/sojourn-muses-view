import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import elementUI from 'element-ui'
import './assets/css/common.scss'
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import './theme/index.css'

Vue.config.productionTip = false

// 按需引入element-ui
Vue.use(elementUI)

Vue.prototype.$message = elementUI.Message

// 根据环境变量决定是否引入mock
if (process.env.VUE_APP_USE_MOCK || (process.env.NODE_ENV !== 'production' && !process.env.VUE_APP_BACK_END_URL)) {
  const Mock = require('./mock/index').default
  Mock.mockData()
}

/* vue-i18n */
Vue.use(VueI18n)
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
