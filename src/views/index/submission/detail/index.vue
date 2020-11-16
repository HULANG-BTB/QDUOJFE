<template>
  <div class="submission-detail" v-if="submission.id">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-row>
          <el-alert :type="type" :closable="false" show-icon>
            <template #title>
              {{ title }}
            </template>
            <span>Time: {{ submission.statistic_info.time_cost | timeFormat }} </span>
            <span>Memory: {{ submission.statistic_info.memory_cost | memoryFormat }}</span>
            <span>Lang: {{ submission.language }} </span>
            <span>Author: {{ submission.username }} </span>
          </el-alert>
        </el-row>
        <el-row v-if="submission.info" style="margin-top: 1rem">
          <el-table :data="submission.info.data">
            <el-table-column align="center" :label="$t('submission.list.id')" prop="id" type="index"></el-table-column>
            <el-table-column align="center" :label="$t('submission.list.status')" prop="result">
              {{ title }}
            </el-table-column>
            <el-table-column align="center" :label="$t('submission.list.memory')" prop="memory" #default="{row}">{{ row.memory | memoryFormat }}</el-table-column>
            <el-table-column align="center" :label="$t('submission.list.time')" prop="cpu_time" #default="{row}">{{ row.cpu_time | timeFormat }}</el-table-column>
            <el-table-column align="center" :label="$t('submission.list.real_time')" prop="real_time" #default="{row}">{{ row.real_time | timeFormat }}</el-table-column>
            <el-table-column align="center" :label="$t('submission.list.signal')" prop="signal"></el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-top: 1rem">
          <highlight-code :code="submission.code" :language="submission.language" :border-color="color"></highlight-code>
        </el-row>
        <el-row style="margin-top: 1rem">
          <div class="share-code">
            <el-button v-if="submission.shared" type="warning" :loading="loading" @click="handleShareClick">{{ $t('submission.list.unshare') }}</el-button>
            <el-button v-else type="primary" :loading="loading" @click="handleShareClick">{{ $t('submission.list.share') }}</el-button>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HighlightCode from '@/components/highlight-code'
import JUDGE_STATUS from '@/constants/judgeStatus'
// import JudgeStatusDict from '@/components/dict/judge-status'
export default {
  name: 'SubmissionDetail',
  data() {
    return {
      submission: {},
      tableData: [],
      loading: false
    }
  },
  components: {
    HighlightCode
  },
  computed: {
    submission_id() {
      return this.$route.params.submission_id
    },
    type() {
      return JUDGE_STATUS[this.submission.result].type || 'info'
    },
    title() {
      return JUDGE_STATUS[this.submission.result].name || 'unknown'
    },
    color() {
      return JUDGE_STATUS[this.submission.result].color || 'info'
    }
  },
  created() {
    this.getSubmissionInfo()
  },
  methods: {
    async getSubmissionInfo() {
      const { data } = await this.$api.getSubmissionStatus({
        params: {
          id: this.submission_id
        }
      })
      this.submission = data
      this.tableData.push({
        result: data.result,
        time: data.statistic_info.time_cost,
        memory: data.statistic_info.memory_cost
      })
    },

    // 点击分享按钮
    async handleShareClick() {
      try {
        this.loading = true
        await this.$api
          .changeShareStatus({
            data: {
              id: this.submission_id,
              shared: !this.submission.shared
            }
          })
          .then(() => {
            this.submission.shared = !this.submission.shared
          })
          .catch((err) => {
            err
          })
      } catch (err) {
        err
      } finally {
        this.loading = false
      }
    }
  },
  filters: {
    memoryFormat(memory) {
      if (memory === undefined) return '--'
      // 1048576 = 1024 * 1024
      let t = parseInt(memory) / 1048576
      return String(t.toFixed(0)) + 'MB'
    },

    timeFormat(time) {
      if (time === undefined) return '--'
      return time + 'ms'
    }
  }
}
</script>

<style lang="scss" scoped>
.submission-detail {
  /deep/ {
    .el-alert {
      padding: 1rem;

      .el-alert__content {
        margin-left: 1rem;
        text-align: left;

        .el-alert__title {
          color: #1c2438;
          font-size: 1.3rem;
        }

        .el-alert__description {
          color: #1c2438;
          font-size: 0.8rem;
          margin: 0.8rem 0 0 0;

          span {
            &:not(:first-child) {
              margin-left: 0.5rem;
            }
          }
        }
      }
    }
  }

  .share-code {
    text-align: right;
  }
}
</style>
