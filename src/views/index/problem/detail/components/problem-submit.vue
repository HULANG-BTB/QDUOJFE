<template>
  <card-layout class="problem-submit">
    <editor v-model="code" :languages="languages" :language="language" :theme="theme" @theme-change="handleThemeChange" @language-change="handleLanguageChange"></editor>
    <div class="footer">
      <el-button type="primary" icon="el-icon-edit">{{ $t('problem.submit.submit') }}</el-button>
    </div>
  </card-layout>
</template>

<script>
import Editor from '@/components/editor'
export default {
  name: 'ProblemSubmit',
  components: {
    Editor
  },
  data() {
    return {
      language: this.problem?.languages?.[0],
      theme: 'solarized',
      languages: this.problem?.languages || [],
      code: ''
    }
  },
  props: {
    problem: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleThemeChange(theme) {
      this.theme = theme
    },
    handleLanguageChange(language) {
      this.language = language
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-submit {
  .footer {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
