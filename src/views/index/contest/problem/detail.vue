<template>
  <div class="problem-list">
    <el-row :gutter="18">
      <el-col :span="20">
        <el-row>
          <problem-details v-if="problem" :problem="problem"></problem-details>
        </el-row>
        <el-row style="margin-top: 20px">
          <problem-submit v-if="problem" :problem="problem" :contest="contest"></problem-submit>
        </el-row>
      </el-col>
      <el-col :span="4">
        <!-- <el-row>
          <problem-submissions v-if="problem" :problem="problem"></problem-submissions>
        </el-row> -->
        <contest-nav :contest="contest"></contest-nav>
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
import ContestNav from '../nav'
import ProblemDetails from '@/views/index/problem/detail/components/problem-details'
import problemSubmit from '@/views/index/problem/detail/components/problem-submit'
// import ProblemSubmissions from '@/views/index/problem/detail/components/problem-submissions'
import problemInfo from '@/views/index/problem/detail/components/problem-info'
import problemStatistic from '@/views/index/problem/detail/components/problem-statistic'

export default {
  name: 'ContestProblemDetail',
  components: {
    ProblemDetails,
    problemSubmit,
    // ProblemSubmissions,
    problemInfo,
    problemStatistic,
    ContestNav
  },
  data() {
    return {
      problem: null
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$api.getContestProblem({
        params: {
          ...this.$route.params
        }
      })
      this.problem = data
    }
  }
}
</script>
