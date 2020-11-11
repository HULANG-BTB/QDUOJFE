<template>
  <div class="contest-nav">
    <el-row>
      <contest-menu :contest="contest" :access="access"></contest-menu>
    </el-row>
    <el-row v-if="needPassword && !access" style="margin-top: 20px">
      <contest-password :contest="contest" @access-change="handleAccessChange"></contest-password>
    </el-row>
    <el-row v-if="contest" style="margin-top: 20px">
      <contest-meta :contest="contest"></contest-meta>
    </el-row>
  </div>
</template>

<script>
import ContestMeta from './components/contest-meta'
import ContestMenu from './components/contest-menu'
import ContestPassword from './components/contest-password'
export default {
  name: 'ContestNav',
  components: {
    ContestMeta,
    ContestMenu,
    ContestPassword
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      access: false
    }
  },
  computed: {
    needPassword() {
      return this.contest?.contest_type === 'Password Protected'
    }
  },
  created() {
    this.getContestAccess()
  },
  methods: {
    // 获取竞赛权限
    async getContestAccess() {
      const { data } = await this.$api.getContestAccess({
        params: {
          contest_id: this.contest.id
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
