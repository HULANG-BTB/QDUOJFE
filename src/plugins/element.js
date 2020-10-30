import Vue from 'vue'
import store from '@/store'
import Element from 'element-ui'
import '../styles/element-variables.scss'

Vue.use(Element, { size: store.state.settings.size })
