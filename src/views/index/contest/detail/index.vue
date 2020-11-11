<template>
  <router-view v-if="contest" :contest="contest"></router-view>
</template>

<script>
export default {
  name: 'ContestDetail',
  data() {
    return {
      contest: null
    }
  },
  computed: {
    params() {
      return this.$route.params
    }
  },
  created() {
    this.getContestInfo()
  },
  methods: {
    // 获取竞赛信息
    async getContestInfo() {
      const { data } = await this.$api.getContestInfo({
        params: {
          id: this.params.contest_id
        }
      })
      this.contest = data
    }
  }
}
// const asyncComponent = {
//   detail: () => import('./components/contest-detail'),
//   problems: () => import('./components/contest-problems')
// }
// import ContestMeta from './components/contest-meta'
// import ContestNav from './components/contest-nav'
// import ContestPassword from './components/contest-password'
// export default {
//   name: 'ContestDetail',
//   components: {
//     // ContestNav,
//     // ContestMeta,
//     // ContestPassword
//   },
//   data() {
//     return {
//       contest: null,
//       component: 'detail',
//       access: false
//     }
//   },
//   computed: {
//     params() {
//       return this.$route.params
//     },
//     // currentComponent() {
//     //   return asyncComponent[this.component]
//     // },
//     needPassword() {
//       return this.contest?.contest_type === 'Password Protected'
//     }
//   },
//   created() {
//     this.getContestInfo()
//     this.getContestAccess()
//   },
//   methods: {
//     onCurrentChange(component) {
//       this.component = component
//     },

//     // 获取竞赛信息
//     async getContestInfo() {
//       const { data } = await this.$api.getContestInfo({
//         params: {
//           id: this.params.contest_id
//         }
//       })
//       this.contest = data
//     },

//     // 获取竞赛权限
//     async getContestAccess() {
//       const { data } = await this.$api.getContestAccess({
//         params: {
//           contest_id: this.params.contest_id
//         }
//       })
//       this.access = data.access
//     },

//     // 权限改变
//     handleAccessChange() {
//       this.getContestAccess()
//     }
//   }
// }
</script>

<style lang="scss" scoped></style>
