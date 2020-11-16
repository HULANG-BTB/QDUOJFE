import Vue from 'vue'
import storage from '@/utils/storage'
import STORAGE_KEY from '@/constants/storageKey'

const createState = () => {
  return {
    languages: storage.get(STORAGE_KEY.languages, true) || [] // 语言列表
  }
}

const state = createState()

const mutations = {
  SET_LANGUAGE: (state, languages) => {
    state.languages = languages
    storage.set(STORAGE_KEY.languages, languages, true)
  }
}

const getters = {
  languages: (state) => {
    return state.languages.languages
  }
}

const actions = {
  async getLanguageList({ commit }) {
    const { data } = await Vue.prototype.$api.getLanguageList()
    commit('SET_LANGUAGE', data || {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
