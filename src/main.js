import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './layout/index.js'
import i18n from './locales'
import VueClipboard from 'vue-clipboard2'

import 'normalize.css/normalize.css'
import './styles/app.scss'

import xaxios from './plugins/x-axios'
import apiConfig from './config/apiConfig'
Vue.use(xaxios, apiConfig)

Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.config.productionTip = false

Vue.use(VueClipboard)

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
