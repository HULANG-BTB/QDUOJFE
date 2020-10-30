<template>
  <div class="problem-list">
    <el-row :gutter="18">
      <el-col :span="20">
        <el-row>
          <problem-details :problem="problem"></problem-details>
        </el-row>
        <el-row style="margin-top: 20px">
          <problem-submit :problem="problem"></problem-submit>
        </el-row>
      </el-col>
      <el-col :span="4">
        <!-- <tag-list></tag-list> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProblemDetails from './components/problem-details.vue'
import problemSubmit from './components/problem-submit.vue'
// import TagList from './components/tag-list'

export default {
  name: 'Layout',
  components: {
    ProblemDetails,
    problemSubmit
  },
  data() {
    return {
      problem: {},
      id: this.$route.params.id
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$api.getProblemInfo({
        params: {
          problem_id: this.id
        }
      })
      this.problem = data
    }
  }
}
</script>
