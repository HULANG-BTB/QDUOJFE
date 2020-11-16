<template>
  <card-layout shadow="hover" class="session-item">
    <template #title>
      <span class="title">{{ session.ip }}</span>
    </template>
    <template #toobar>
      <el-button v-if="session.current_session" type="success" @click.stop>Current</el-button>
      <el-popconfirm v-else title="确定移除当前Session吗?" @onConfirm="handleRevokeClick">
        <el-button slot="reference" type="warning">Revoke</el-button>
      </el-popconfirm>
    </template>
    <div class="content">
      <el-form :model="session" label-width="100px">
        <el-form-item label="OS:">
          <span>{{ session.user_agent | platform }}</span>
        </el-form-item>
        <el-form-item label="Browser:">
          <span>{{ session.user_agent | browser }}</span>
        </el-form-item>
        <el-form-item label="Last Activity:">
          <span>{{ session.last_activity | dateTime }}</span>
        </el-form-item>
      </el-form>
    </div>
  </card-layout>
</template>

<script>
import browserDetector from 'browser-detect'
import moment from 'moment'

const browsers = {}
const loadBrowser = (userAgent) => {
  let browser = {}
  if (userAgent in Object.keys(browsers)) {
    browser = browsers[userAgent]
  } else {
    browser = browserDetector(userAgent)
    browsers[userAgent] = browser
  }
  return browser
}
export default {
  name: 'SessionItem',
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRevokeClick() {
      this.$emit('revoke', this.session)
    }
  },
  filters: {
    browser(value) {
      let b = loadBrowser(value)
      if (b.name && b.version) {
        return b.name + ' ' + b.version
      } else {
        return 'Unknown'
      }
    },
    platform(value) {
      let b = loadBrowser(value)
      return b.os ? b.os : 'Unknown'
    },
    dateTime(value) {
      return moment(value).format('LLL')
    }
  }
}
</script>

<style lang="scss" scoped>
.session-item {
  /deep/ {
    .el-card__body {
      padding: 0.5rem;
    }
  }

  .title {
    font-size: 0.7rem;
  }
  .content {
    font-size: 0.7rem;

    /deep/ {
      .el-form-item__label,
      .el-form-item__content {
        font-size: inherit;
      }

      .el-form-item:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
