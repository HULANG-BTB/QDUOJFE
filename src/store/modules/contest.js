import Vue from 'vue'

const createState = () => {
  return {
    contest: {}, // 比赛信息
    timer: null, // 计时器
    now: null // 当前时间
  }
}

const state = createState()

const mutations = {
  SET_CONTEST: (state, contest) => {
    state.contest = contest
  },
  SET_NOW: (state, now) => {
    state.now = now
  }
}

const getters = {
  contest: (state) => state.contest,
  now: (state) => state.now
}

const actions = {
  async getContestInfo({ commit }, contest_id) {
    const { data } = await Vue.prototype.$api.getContestInfo({
      params: {
        id: contest_id
      }
    })
    commit('SET_CONTEST', data || {})
    if (data.now) {
      commit('SET_NOW', data.now)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
