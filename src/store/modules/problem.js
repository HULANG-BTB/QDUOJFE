import storage from '@/utils/storage'
import STORAGE_KEY from '@/constants/storageKey'
import Vue from 'vue'

const createState = () => {
  return {
    problem: storage.set(STORAGE_KEY.problem) ?? {}
  }
}

const state = createState()

const mutations = {
  SET_PROBLEM: (state, problem) => {
    state.problem = problem
    storage.set(STORAGE_KEY.problem, problem)
  }
}

const actions = {
  async getProblemInfo({ commit }, problem_id) {
    const data = await Vue.prototype.$api.getProblemInfo({
      params: {
        problem_id
      }
    })
    commit('SET_PROBLEM', data.data || {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
