<template>
  <card-layout class="problem-submit">
    <editor v-model="code" :languages="languages" :language="language" :theme="theme" @theme-change="handleThemeChange" @language-change="handleLanguageChange"></editor>
    <div class="footer">
      <div class="status" v-if="result">
        <template v-if="result === true">
          <el-button>
            <span class="dot" :style="{ color: submissionStatus.color }"></span>
            {{ $t(`submission.status.${submissionStatus.text.replace(/ /g, '_')}`) }}
          </el-button>
        </template>
        <template v-else>
          <span style="margin-right: 1rem; line-height: 28px">{{ $t('problem.submit.status') }} </span>
          <el-button>
            <span class="dot" :style="{ color: submissionStatus.color }"></span>
            {{ $t(`submission.status.${submissionStatus.text.replace(/ /g, '_')}`) }}
          </el-button>
        </template>
      </div>
      <div class="submit">
        <el-button type="primary" icon="el-icon-edit" :loading="checking" @click="handleSubmitClick">{{ $t('problem.submit.submit') }}</el-button>
      </div>
    </div>
  </card-layout>
</template>

<script>
import Editor from '@/components/editor'
import JUDGE_STATUS from '@/constants/judgeStatus'
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
      submissionId: '',
      timer: null,
      checking: false, // 检查中
      result: null
    }
  },
  props: {
    problem: {
      type: Object,
      required: true
    }
  },
  computed: {
    languages() {
      return this.problem?.languages || []
    },
    submissionStatus() {
      return {
        text: JUDGE_STATUS[this.result?.result]?.['name'] ?? '',
        color: JUDGE_STATUS[this.result?.result]?.['color'] ?? ''
      }
    }
  },
  methods: {
    handleThemeChange(theme) {
      this.theme = theme
    },
    handleLanguageChange(language) {
      this.language = language
    },
    async handleSubmitClick() {
      try {
        const { data } = await this.$api.submitProblem({
          data: {
            code: this.code,
            language: this.language,
            problem_id: this.problem.id
          }
        })
        this.submissionId = data.submission_id
        this.checkSubmissionStatus()
      } catch (error) {
        console.log(error)
      }
    },
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
        console.log(data)
        if (data.statistic_info.length) {
          this.checking = false
          clearInterval(this.timer)
          this.timer = null
        }
      }, 2000)
    }
  },
  async created() {
    const { data } = await this.$api.getSubmissionExists({
      params: {
        problem_id: this.problem.id
      }
    })
    console.log(data)
    this.result = data
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
