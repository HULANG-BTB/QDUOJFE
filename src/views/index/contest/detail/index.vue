<template>
  <el-row :gutter="18">
    <el-col :span="20">
      <router-view v-if="contest" :contest="contest" :access="access"></router-view>
      <!-- <component v-if="contest" :is="currentComponent" :contest="contest" :access="access"></component> -->
      <!-- <contest-info v-if="contest" ref="contestInfo" :contest="contest"></contest-info> -->
    </el-col>
    <el-col :span="4">
      <el-row>
        <contest-nav :contest="contest" :access="access"></contest-nav>
      </el-row>
      <el-row v-if="needPassword && !access" style="margin-top: 20px">
        <contest-password :contest="contest" @access-change="handleAccessChange"></contest-password>
      </el-row>
      <el-row v-if="contest" style="margin-top: 20px">
        <contest-meta :contest="contest"></contest-meta>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// const asyncComponent = {
//   detail: () => import('./components/contest-detail'),
//   problems: () => import('./components/contest-problems')
// }
import ContestMeta from './components/contest-meta'
import ContestNav from './components/contest-nav'
import ContestPassword from './components/contest-password'
export default {
  name: 'ContestDetail',
  components: {
    ContestNav,
    ContestMeta,
    ContestPassword
  },
  data() {
    return {
      contest: null,
      component: 'detail',
      access: false
    }
  },
  computed: {
    params() {
      return this.$route.params
    },
    // currentComponent() {
    //   return asyncComponent[this.component]
    // },
    needPassword() {
      return this.contest?.contest_type === 'Password Protected'
    }
  },
  created() {
    this.getContestInfo()
    this.getContestAccess()
  },
  methods: {
    onCurrentChange(component) {
      this.component = component
    },

    // 获取竞赛信息
    async getContestInfo() {
      const { data } = await this.$api.getContestInfo({
        params: {
          id: this.params.id
        }
      })
      this.contest = data
    },

    // 获取竞赛权限
    async getContestAccess() {
      const { data } = await this.$api.getContestAccess({
        params: {
          contest_id: this.params.id
        }
      })
      this.access = data.access
    },

    // 权限改变
    handleAccessChange() {
      this.getContestAccess()
    }
  }
}
</script>

<style lang="scss" scoped></style>
