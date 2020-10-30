import cookie from '@/utils/cookie'
import storage from '@/utils/storage'

const createState = () => {
  const language = storage.get('language') || 'zh-cn'
  const size = cookie.get('size') || storage.get('size') || 'mini'
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
    storage.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    cookie.set('size', size)
  }
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
  mutations,
  actions
}
