import cookie from '@/utils/cookie'
import storage from '@/utils/storage'
import i18n from '@/locales'

const createState = () => {
  let language = storage.get('language')
  if (language === 'undefined' || size === 'null') {
    language = 'en-US'
    storage.set('language', language)
  }
  let size = cookie.get('size') || storage.get('size')
  if (size === 'undefined' || size === 'null' || !size) {
    size = 'mini'
    storage.set('size', size)
  }
  return {
    logo: 'OnlineJudge',
    language,
    size
  }
}

const state = createState()

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    i18n.locale = language
    storage.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    cookie.set('size', size)
  }
}

const getters = {
  language: (state) => state.language
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
