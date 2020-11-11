<template>
  <div class="problem-list">
    <el-row :gutter="18">
      <el-col :span="21">
        <el-row>
          <problem-details v-if="problem" :problem="problem"></problem-details>
        </el-row>
        <el-row style="margin-top: 20px">
          <problem-submit v-if="problem" :problem="problem"></problem-submit>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-row>
          <problem-submissions v-if="problem" :problem="problem"></problem-submissions>
        </el-row>
        <el-row style="margin-top: 20px">
          <problem-info v-if="problem" :problem="problem"></problem-info>
        </el-row>
        <el-row style="margin-top: 20px">
          <problem-statistic v-if="problem" :problem="problem"></problem-statistic>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProblemDetails from './components/problem-details'
import problemSubmit from './components/problem-submit'
import ProblemSubmissions from './components/problem-submissions'
import problemInfo from './components/problem-info'
import problemStatistic from './components/problem-statistic'

export default {
  name: 'Layout',
  components: {
    ProblemDetails,
    problemSubmit,
    ProblemSubmissions,
    problemInfo,
    problemStatistic
  },
  data() {
    return {
      problem: null,
      contest: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$api.getProblemInfo({
        params: {
          problem_id: this.$route.params.problem_id
        }
      })
      this.problem = data
    }
  }
}
</script>
