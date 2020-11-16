<template>
  <card-layout class="contest-list">
    <template #title>
      {{ $t(`contest.contests`) }}
    </template>
    <template #toobar>
      <el-form :model="search" ref="search" inline>
        <el-form-item prop="contestMode" label="Rule">
          <el-select v-model="search.rule_type" @change="onQuery" style="width: 120px">
            <el-option v-for="item in contestMode" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contestStatus" label="Status">
          <el-select v-model="search.status" @change="onQuery" style="width: 120px">
            <el-option v-for="item in contestStatus" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="Tags">
          <el-switch v-model="showTags"></el-switch>
        </el-form-item> -->
        <el-form-item prop="keyword">
          <el-input v-model="search.keyword" @keyup.enter.native="onQuery" clearable>
            <i slot="suffix" class="el-input__icon el-icon-search" @click="onQuery"></i>
          </el-input>
        </el-form-item>
      </el-form>
    </template>
    <div class="list" v-loading="grid.loading">
      <contest-item v-for="item in grid.rows" :data="item" :key="item.id"></contest-item>
    </div>
    <template #pagination>
      <el-pagination background layout="total, sizes, prev, pager, next" :total="pagging.total" :page-size="pagging.limit" :current-page="pagging.page" @current-change="onChangeCurrentPage" @size-change="onChangePageSize"> </el-pagination>
    </template>
  </card-layout>
</template>

<script>
import paggingMixin from '@/mixins/paggingMixin'
import gridMixin from '@/mixins/gridMixin'
import contestMode from '@/constants/contestMode'
import contestStatus from '@/constants/contestStatus'
import { getAcceptedRate } from '@/utils/problem'
import ContestItem from './components/contest-item'

export default {
  name: 'ContestList',
  mixins: [gridMixin, paggingMixin],
  components: {
    ContestItem
  },
  data() {
    return {
      search: {
        contestMode: this.$route.query.contestMode || '',
        contestStatus: this.$route.query.contestStatus || '',
        keyword: this.$route.query.keyword || ''
      }
    }
  },
  created() {
    const { _fetchData } = this
    _fetchData()
  },
  computed: {
    contestMode() {
      let ret = []
      Object.keys(contestMode).forEach((key) => {
        ret.push({ key: key, label: key, value: key === 'ALL' ? '' : contestMode[key] })
      })
      return ret
    },
    contestStatus() {
      let ret = []
      Object.keys(contestStatus).forEach((key) => {
        ret.push({ key: key, label: key, value: key === 'ALL' ? '' : contestStatus[key] })
      })
      return ret
    }
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { search, pagging } = this
      const { data } = await this.$api.getContestList({
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
.contest-list {
  .card-box {
    .title {
      text-align: left;
    }
  }
}
</style>
