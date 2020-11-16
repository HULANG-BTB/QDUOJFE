import storage from '@/utils/storage'
import STORAGE_KEY from '@/constants/storageKey'
import Vue from 'vue'

const createState = () => {
  return {
    profile: {},
    dialog: {
      mode: 'login',
      visiable: false
    }
  }
}

const state = createState()

const mutations = {
  SET_PROFILE: (state, profile) => {
    // state = profile
    // 不允许直接修改rootState
    // Object.keys(profile).forEach((key) => {
    //   Vue.set(state, key, profile[key])
    // })
    state.profile = profile
    storage.set(STORAGE_KEY.AUTHED, !!profile.user)
  },
  SET_DIALOG: (state, { mode, visiable }) => {
    state.dialog.mode = mode
    state.dialog.visiable = visiable
  }
}

const getters = {
  profile: (state) => state.profile,
  user: (state) => state.profile?.user,
  language: (state) => state.profile?.language || 'en-US',
  dialog: (state) => state.dialog
}

const actions = {
  async getProfile({ commit, dispatch }) {
    const data = await Vue.prototype.$api.getProfile()
    if (!data.error && data.data) {
      commit('SET_PROFILE', data.data || {})
      dispatch('settings/setLanguage', data.data?.language, { root: true })
    }
  },
  async logout({ commit }) {
    const data = await Vue.prototype.$api.logout()
    commit('SET_PROFILE', data.data || {})
  },
  async saveProfile({ commit }, profile) {
    const data = await Vue.prototype.$api.saveProfile({
      data: profile
    })
    commit('SET_PROFILE', data.data || {})
  },
  async showLoginDialog({ commit }) {
    commit('SET_DIALOG', { mode: 'login', visiable: true })
  },
  async showRegisterDialog({ commit }) {
    commit('SET_DIALOG', { mode: 'register', visiable: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
