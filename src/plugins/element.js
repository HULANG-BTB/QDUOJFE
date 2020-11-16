import Vue from 'vue'
import store from '@/store'
import Element from 'element-ui'
import '../styles/element-variables.scss'
import i18n from '../locales'

Vue.use(Element, {
  size: store.state.settings.size,
  i18n: (key, value) => {
    return i18n.t(key, value)
  }
})
