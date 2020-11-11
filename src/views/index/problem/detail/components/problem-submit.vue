<template>
  <card-layout class="problem-submit">
    <editor v-model="code" :languages="languages" :language="language" :theme="theme" @theme-change="handleThemeChange" @language-change="handleLanguageChange"></editor>
    <div class="footer">
      <div class="status">
        <template v-if="statusVisiable">
          <template v-if="realTimeStatusPermission">
            <el-alert :type="submissionStatus.type" show-icon :closable="false">
              <template #title>
                <span>{{ $t(`submission.status.${submissionStatus.text.replace(/ /g, '_')}`) }}</span>
              </template>
            </el-alert>
            <!-- <el-button>
            <span class="dot" :style="{ background: submissionStatus.color }"></span>
            {{ $t(`submission.status.${submissionStatus.text.replace(/ /g, '_')}`) }}
          </el-button> -->
          </template>
          <template v-else>
            <el-alert type="success" show-icon :closable="false">
              <template #title>
                <span>提交成功！</span>
              </template>
            </el-alert>
          </template>
        </template>
        <template v-else-if="contest.id && !realTimeStatusPermission && submissionExists">
          <el-alert type="success" show-icon :closable="false">
            <template #title>
              <span>答案已经提交</span>
            </template>
          </el-alert>
        </template>
        <template v-else-if="problem.my_status === 0">
          <el-alert type="success" show-icon :closable="false">
            <template #title>
              <span>已经解决了这个问题</span>
            </template>
          </el-alert>
        </template>
        <template v-else-if="contestEnded">
          <el-alert type="warning" show-icon :closable="false">
            <template #title>
              <span>比赛已经结束</span>
            </template>
          </el-alert>
        </template>

        <!-- <template v-else>
          <span style="margin-right: 1rem; line-height: 28px">{{ $t('problem.submit.status') }} </span>
          <el-button>
            <span class="dot" :style="{ color: submissionStatus.color }"></span>
            {{ $t(`submission.status.${submissionStatus.text.replace(/ /g, '_')}`) }}
          </el-button>
        </template> -->
      </div>
      <div class="submit">
        <el-button type="primary" icon="el-icon-edit" :disabled="submitDisabled" :loading="checking" @click="handleSubmitClick">{{ $t('problem.submit.submit') }}</el-button>
      </div>
    </div>
  </card-layout>
</template>

<script>
import moment from 'moment'
import { buildProblemCodeKey } from '@/utils/problem'
import Storage from '@/utils/storage'
import Editor from '@/components/editor'
import JUDGE_STATUS from '@/constants/judgeStatus'
import CONTEST_STATUS from '@/constants/contestStatus'
export default {
  name: 'ProblemSubmit',
  components: {
    Editor
  },
  data() {
    return {
      language: this.problem?.languages?.[0],
      theme: 'solarized',
      code: '',
      submissionId: '', // 提交ID
      timer: null, // 计时器
      checking: false, // 检查中
      result: {
        result: 9
      }, // 提交结果
      statusVisiable: false,
      submissionExists: false
    }
  },
  props: {
    problem: {
      type: Object,
      required: true
    },
    contest: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    languages() {
      return this.problem?.languages || []
    },

    submissionStatus() {
      return {
        text: JUDGE_STATUS[this.result.result]['name'] || '',
        color: JUDGE_STATUS[this.result.result]['color'] || '#e9eaec',
        type: JUDGE_STATUS[this.result.result]['type'] || 'info'
      }
    },

    // 比赛已经结束
    contestEnded() {
      return this.contestStatus === CONTEST_STATUS.ENDED
    },

    // 比赛状态
    contestStatus() {
      if (!this.contest.id) {
        return null
      }
      const startTime = moment(this.contest.start_time)
      const endTime = moment(this.contest.end_time)
      const currentTime = moment(this.contest.now)

      if (currentTime < startTime) {
        return CONTEST_STATUS.NOT_START
      } else if (currentTime < endTime) {
        return CONTEST_STATUS.UNDERWAY
      } else {
        return CONTEST_STATUS.ENDED
      }
    },

    // 实时查看结果 权限
    realTimeStatusPermission() {
      // 不在比赛中 允许
      if (!this.contest.id) {
        return true
      }
      // ACM赛制 允许
      if (this.contest.rule_type === 'ACM') {
        return true
      }
      // real_time_rank 模式 允许
      if (this.contest.real_time_rank) {
        return true
      }
      // 比赛结束 允许
      if (this.contestEnded) {
        return true
      }
      // todo 比赛管理员 允许
      return false
    },

    // 禁止提交
    submitDisabled() {
      // 比赛结束 禁止
      if (this.contestEnded) {
        return true
      }
      return false
    }
  },
  methods: {
    // 主题改变
    handleThemeChange(theme) {
      this.theme = theme
    },

    // 语言改变
    handleLanguageChange(language) {
      this.language = language
    },

    // 点击提交
    async handleSubmitClick() {
      try {
        const { data } = await this.$api.submitProblem({
          data: {
            code: this.code,
            language: this.language,
            problem_id: this.problem.id,
            contest_id: this.contest.id
          }
        })
        this.result.result = 9 // 正在提交
        this.statusVisiable = true
        this.submissionId = data.submission_id
        this.checkSubmissionStatus()
        this.saveStorageCode()
      } catch (error) {
        console.log(error)
      }
    },

    // 检查提交状态
    checkSubmissionStatus() {
      this.checking = true
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(async () => {
        const { data } = await this.$api.getSubmissionStatus({
          params: {
            id: this.submissionId
          }
        })
        this.result = data
        if (Object.keys(data.statistic_info).length !== 0) {
          this.checking = false
          clearInterval(this.timer)
          this.timer = null
        }
      }, 500)
    },

    // 保存本地代码
    saveStorageCode() {
      const key = buildProblemCodeKey(this.problem._id, this.language, this.contest?.id)
      Storage.set(key, this.code)
    },

    // 加载本地代码
    loadStorageCode() {
      const key = buildProblemCodeKey(this.problem._id, this.language, this.contest?.id)
      if (this.code === '') {
        this.code = Storage.get(key, false) ?? ''
      }
    },

    // 检查是否提交过
    async checkSubmissionExists() {
      const { data } = await this.$api.getSubmissionExists({
        params: {
          problem_id: this.problem.id,
          contest_id: this.contest.id
        }
      })
      this.submissionExists = data
    }
  },
  created() {
    this.checkSubmissionExists()
    this.loadStorageCode()
  }
}
</script>

<style lang="scss" scoped>
.problem-submit {
  .footer {
    margin-top: 1.2rem;

    .status {
      float: left;

      .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        background: #e9eaec;
        position: relative;
        top: 1px;
      }
    }
    .submit {
      float: right;
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
</style>
