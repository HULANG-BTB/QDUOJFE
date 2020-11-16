<template>
  <div class="security-setting">
    <div class="sessions-setting">
      <div class="title">Sessions</div>
      <div class="list">
        <el-row :gutter="20">
          <el-col v-for="item in grid.rows" :key="item.session_key" :span="6">
            <session-item :session="item" @revoke="onRevokeSession"></session-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import gridMixin from '@/mixins/gridMixin'
import SessionItem from './components/session-item'
export default {
  name: 'SessionSetting',
  mixins: [gridMixin],
  components: {
    SessionItem
  },
  created() {
    const { _fetchData } = this
    _fetchData()
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { data } = await this.$api.getSessionList()
      data.sort((a, b) => {
        if (a.current_session) {
          return -1
        } else if (b.current_session) {
          return 1
        } else {
          return moment(a.last_activity) - moment(b.last_activity)
        }
      })
      return { results: data }
    },

    async onRevokeSession(session) {
      await this.$api.removeSession({
        params: {
          session_key: session.session_key
        }
      })
      this._fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.security-setting {
  .sessions-setting {
    .title {
      font-size: 1.3rem;
    }
    .list {
      margin-top: 1rem;
    }
  }
}
</style>
