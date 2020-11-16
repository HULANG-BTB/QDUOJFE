<template>
  <card-layout class="contest-submission-list">
    <template #title>
      {{ $t('submission.list.title') }}
    </template>
    <template #toobar>
      <el-form :model="search" ref="search" inline>
        <el-form-item prop="result">
          <el-select v-model="search.result" @change="onQuery">
            <el-option v-for="item in JudgeStatus" :key="item.key" :label="item.name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="myself">
          <el-switch v-model="search.myself" active-value="1" inactive-value="0" :active-text="$t('submission.list.my')" :inactive-text="$t('submission.list.all')" @change="onQuery"></el-switch>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="search.username" @keyup.enter.native="onQuery">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="onQuery"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset('search')">{{ $t('submission.list.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="grid.rows" v-loading="grid.loading">
      <el-table-column align="center" prop="create_time" :label="$t('submission.list.submit_time')" #default="{row}">{{ row.create_time | dataTime }}</el-table-column>
      <el-table-column align="center" prop="id" :label="$t('submission.list.id')" #default="{row}">
        <el-link v-if="row.show_link" type="primary" :underline="false" @click="handleIdClick(row.id)">{{ row.id | hashId }}</el-link>
        <span v-else>{{ row.id | hashId }}</span>
      </el-table-column>
      <el-table-column align="center" prop="result" :label="$t('submission.list.status')" #default="{row}">
        <judge-status-dict alert :value="row.result"></judge-status-dict>
      </el-table-column>
      <el-table-column align="center" prop="problem" :label="$t('submission.list.problem')" #default="{row}">
        <el-link type="primary" :underline="false" @click="handleProblemClick(row.problem)">
          {{ row.problem }}
        </el-link>
      </el-table-column>
      <el-table-column align="center" prop="result" :label="$t('submission.list.time')" #default="{row}">{{ row.statistic_info.time_cost | timeFormat }}</el-table-column>
      <el-table-column align="center" prop="result" :label="$t('submission.list.memory')" #default="{row}">{{ row.statistic_info.memory_cost | memoryFormat }}</el-table-column>
      <el-table-column align="center" prop="language" :label="$t('submission.list.language')"></el-table-column>
      <el-table-column align="center" prop="username" :label="$t('submission.list.author')" #default="{row}">
        <el-link type="primary" :underline="false" href="#">
          {{ row.username }}
        </el-link>
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
import moment from 'moment'
import JUDGE_STATUS from '@/constants/judgeStatus'
import JudgeStatusDict from '@/components/dict/judge-status'

export default {
  name: 'ContestSubmissionList',
  mixins: [gridMixin, paggingMixin],
  components: {
    JudgeStatusDict
  },
  data() {
    return {
      search: {
        result: this.$route.query.result || '',
        username: this.$route.query.username || '',
        problem_id: this.$route.query.problem_id
      }
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  created() {
    const { _fetchData } = this
    _fetchData()
  },
  computed: {
    JudgeStatus() {
      let ret = []
      ret.push({ name: 'All', key: null })
      Object.keys(JUDGE_STATUS).forEach((key) => {
        ret.push({ ...JUDGE_STATUS[key], key: key })
      })
      return ret
    }
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { search, pagging } = this
      const { data } = await this.$api.getContestSubmissionList({
        params: {
          ...search,
          ...pagging,
          contest_id: this.contest.id
        }
      })
      return data
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
    },

    // 点击题目
    handleProblemClick(id) {
      this.$router.push({ name: 'ContestProblemDetail', params: { problem_id: id } })
    },

    // 点击ID
    handleIdClick(id) {
      this.$router.push({ name: 'ContestSubmissionDetail', params: { submission_id: id } })
    }
  },

  filters: {
    dataTime(val) {
      return moment(val).format('LLL')
    },

    hashId(val) {
      return val.substr(0, 12)
    },
    memoryFormat(memory) {
      if (memory === undefined) return '--'
      // 1048576 = 1024 * 1024
      let t = parseInt(memory) / 1048576
      return String(t.toFixed(0)) + 'MB'
    },

    timeFormat(time) {
      if (time === undefined) return '--'
      return time + 'ms'
    }
  }
}
</script>

<style lang="scss" scoped>
.contest-submission-list {
  .card-box {
    .title {
      text-align: left;
    }
  }
}
</style>
