<template>
  <card-layout class="problem-sibmissions">
    <div class="submissions-btn" @click="handleSubmissionsClick">
      <i class="el-icon-s-operation" style="margin-right: 10px;"></i>
      <span>{{ $t('problem.submissions.title') }}</span>
    </div>
  </card-layout>
</template>

<script>
export default {
  name: 'ProblemSubmissions',
  methods: {
    handleSubmissionsClick() {
      this.$router.push({
        name: 'Submission',
        query: {
          problem_id: this.$route.params.problem_id
        }
      })
      console.log('submissions')
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-sibmissions {
  text-align: left;
  user-select: none;

  .submissions-btn {
    padding: 0.5rem 1rem;
    height: 2rem;
    line-height: 2rem;

    &:hover {
      border-left: 3px solid #2d8cf0;
      color: #2d8cf0;
      background: #f8f8f9;
    }
  }

  /deep/ .el-card__body {
    padding: 0;
  }
}
</style>
