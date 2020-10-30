import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

Vue.use(VueI18n)

export function getLanguage() {
  const chooseLanguage = store?.state?.settings?.language
  if (chooseLanguage) return chooseLanguage
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  return language
}

function loadLocaleMessages() {
  const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {
    'en-us': {
      ...elementEnLocale
    },
    'zh-cn': {
      ...elementZhLocale
    }
  }
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = { ...messages[locale], ...locales(key) }
    }
  })
  return messages
}

export default new VueI18n({
  locale: getLanguage() || process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
