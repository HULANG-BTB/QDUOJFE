import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

import elementEnUSLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCNLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import elementZhTWLocale from 'element-ui/lib/locale/lang/zh-TW' // element-ui lang

Vue.use(VueI18n)

export const languages = [
  { value: 'en-US', label: 'English', el: elementEnUSLocale },
  { value: 'zh-CN', label: '简体中文', el: elementZhCNLocale },
  { value: 'zh-TW', label: '繁體中文', el: elementZhTWLocale }
]

export function getLanguage() {
  const chooseLanguage = store?.state?.settings?.language
  if (chooseLanguage) return chooseLanguage
  const language = navigator.language || navigator.browserLanguage
  return language
}

function loadLocaleMessages() {
  const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  languages.forEach((language) => {
    messages[language.value] = { ...language.el }
  })
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
  locale: getLanguage() || process.env.VUE_APP_I18N_LOCALE || 'en-US',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en-US',
  messages: loadLocaleMessages()
})
