import storage from '@/utils/storage'
import i18n from '@/locales'
import STORAGE_KEY from '@/constants/storageKey'
import Vue from 'vue'

const createState = () => {
  return {}
}

const state = createState()

const mutations = {
  SET_PROFILE: (state, profile) => {
    // state = profile
    // 不允许直接修改rootState
    Object.keys(profile).forEach((key) => {
      Vue.set(state, key, profile[key])
    })
    if (profile.language) {
      i18n.locale = profile.language
    }
    storage.set(STORAGE_KEY.AUTHED, !!profile.user)
  }
}

const actions = {
  async getProfile({ commit }) {
    const data = await Vue.prototype.$api.getProfile()
    commit('SET_PROFILE', data.data || {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
