<template>
  <card-layout class="problem-list">
    <template #title>
      {{ $t('problem.list.problems') }}
    </template>
    <template #toobar>
      <el-form :model="search" ref="search" inline>
        <el-form-item prop="difficulty">
          <el-select v-model="search.difficulty" @change="onQuery">
            <el-option v-for="item in difficult" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tags">
          <el-switch v-model="showTags"></el-switch>
        </el-form-item>
        <el-form-item prop="keyword">
          <el-input v-model="search.keyword" @keyup.enter.native="onQuery">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="onQuery"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset('search')">Reset</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="grid.rows" highlight-current-row v-loading="grid.loading" @row-dblclick="handleDbClick">
      <el-table-column prop="_id" :label="$t('problem.list.table.index')" width="80"></el-table-column>
      <el-table-column prop="title" :label="$t('problem.list.table.title')" width="400"></el-table-column>
      <el-table-column prop="difficulty" :label="$t('problem.list.table.level')"></el-table-column>
      <el-table-column prop="submission_number" :label="$t('problem.list.table.total')"></el-table-column>
      <el-table-column prop="accepted_number" :label="$t('problem.list.table.rate')" #default="{row}">
        {{ `${getAcceptedRate(row.accepted_number, row.submission_number)}` }}
      </el-table-column>
      <el-table-column v-if="showTags" prop="submission_number" :label="$t('problem.list.table.tag')" align="center" #default="{row}">
        <el-tag v-for="tag in row.tags" :key="tag" style="margin-right: 8px">
          {{ tag }}
        </el-tag>
      </el-table-column>
    </el-table>
    <template #pagination>
      <el-pagination background layout="total, sizes, prev, pager, next" :total="pagging.total" :page-size="pagging.limit" :current-page="pagging.page" @current-change="onChangeCurrentPage" @size-change="onChangePageSize"> </el-pagination>
    </template>
  </card-layout>
</template>

<script>
import paggingMixin from '@/mixins/paggingMixin'
import gridMixin from '@/mixins/gridMixin'
import problemDifficult from '@/constants/problemDifficult'
import { getAcceptedRate } from '@/utils/problem'

export default {
  name: 'ProblemList',
  mixins: [gridMixin, paggingMixin],
  data() {
    return {
      search: {
        difficulty: '',
        keyword: ''
      },
      showTags: false
    }
  },
  created() {
    const { _featchData } = this
    _featchData()
  },
  computed: {
    difficult() {
      let ret = []
      Object.keys(problemDifficult).forEach((key) => {
        ret.push({ key: key, label: problemDifficult[key], value: key === 'ALL' ? undefined : problemDifficult[key] })
      })
      return ret
    }
  },
  methods: {
    // 获取数据
    async featchData() {
      const { search, pagging } = this
      const { data } = await this.$api.getProblemList({
        params: {
          ...search,
          ...pagging
        }
      })
      return data
    },

    // 计算通过率
    getAcceptedRate(accepted, submited) {
      return getAcceptedRate(accepted, submited)
    },

    // 表格行双击
    handleDbClick(row) {
      this.$router.push({ name: 'ProblemDetail', params: { id: row._id } })
    },

    // 搜索标签
    searchWithTag(tag) {
      this.search.tag = tag
      this.onQuery()
    },

    // 重置表单
    handleReset(form) {
      delete this.search.tag
      this.resetForm(form)
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
