<template>
  <card-layout class="problem-list">
    <template #title>
      {{ $t('problem.list.problems') }}
    </template>
    <el-table :data="grid.rows" highlight-current-row v-loading="grid.loading" @row-dblclick="handleDbClick">
      <el-table-column align="center" prop="_id" :label="$t('problem.list.table.index')" width="140"></el-table-column>
      <el-table-column prop="title" :label="$t('problem.list.table.title')"></el-table-column>
      <el-table-column width="200" prop="submission_number" :label="$t('problem.list.table.total')"></el-table-column>
      <el-table-column width="200" prop="accepted_number" :label="$t('problem.list.table.rate')" #default="{row}">
        {{ `${getAcceptedRate(row.accepted_number, row.submission_number)}` }}
      </el-table-column>
    </el-table>
  </card-layout>
</template>

<script>
import gridMixin from '@/mixins/gridMixin'
import { getAcceptedRate } from '@/utils/problem'

export default {
  name: 'ContestProblemList',
  mixins: [gridMixin],
  data() {
    return {
      search: {
        difficulty: '',
        keyword: ''
      },
      showTags: false
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  created() {
    const { _featchData } = this
    _featchData()
  },
  methods: {
    // 获取数据
    async featchData() {
      const { data } = await this.$api.getContestProblem({
        params: {
          contest_id: this.contest.id
        }
      })
      return { results: data }
    },

    // 计算通过率
    getAcceptedRate(accepted, submited) {
      return getAcceptedRate(accepted, submited)
    },

    // 表格行双击
    handleDbClick(row) {
      this.$router.push({ name: 'ContestProblemDetail', params: { pid: row._id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-list {
  .card-box {
    .title {
      text-align: left;
    }
  }
}
</style>
