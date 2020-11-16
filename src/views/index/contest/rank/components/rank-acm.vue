<template>
  <div class="contest-rank-acm">
    <card-layout>
      <template #title>
        {{ contest.title }}
      </template>
      <div v-if="showChart">
        <e-charts :options="chartOptions" style="width: 100%"></e-charts>
      </div>
      <el-table :data="grid.rows" highlight-current-row v-loading="grid.loading">
        <el-table-column align="center" type="index" label="#" width="80" fixed="left"></el-table-column>
        <el-table-column align="center" prop="user" :label="$t('rank.user')" #default="{row}" fixed="left" width="150">
          {{ row.user.username }}
        </el-table-column>
        <el-table-column align="center" prop="accepted_number" :label="`${$t('rank.accepted')}/${$t('rank.submit')}`" width="100">
          <template #default="{row}">
            {{ row.accepted_number }} /
            <el-link :underline="false" type="primary" @click="handleTotalSubmissionClick(row.user.username)">
              {{ row.submission_number }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="total_time" :label="$t('rank.total_time')" #default="{row}">
          {{ row.total_time | time }}
        </el-table-column>
        <el-table-column min-width="150" v-for="column in problemColumns" :key="column.prop" align="center" :prop="column.prop" :label="column.label">
          <template #header="{column}">
            <el-link :underline="false" @click="handleTableHeaderClick(column.label)">
              {{ column.label }}
            </el-link>
          </template>
          <template #default="{row}">
            <template v-if="row[column.prop]">
              <div v-if="row[column.prop].is_ac" class="rank-status ac" :class="{ first: row[column.prop].is_first_ac }">
                <span>
                  {{ row[column.prop].ac_time | time }}
                  <template v-if="row[column.prop].error_number">(-{{ row[column.prop].error_number }})</template>
                </span>
              </div>
              <div v-else-if="row[column.prop].error_number" class="rank-status wa">
                <span>(-{{ row[column.prop].error_number }})</span>
              </div>
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="accepted_number" label="通过率" #default="{row}">
          {{ `${getAcceptedRate(row.accepted_number, row.submission_number)}` }}
        </el-table-column> -->
      </el-table>
      <template #pagination>
        <el-pagination background layout="total, sizes, prev, pager, next" :total="pagging.total" :page-size="pagging.limit" :current-page="pagging.page" @current-change="onChangeCurrentPage" @size-change="onChangePageSize"> </el-pagination>
      </template>
    </card-layout>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markPoint'

import paggingMixin from '@/mixins/paggingMixin'
import gridMixin from '@/mixins/gridMixin'
import { getAcceptedRate } from '@/utils/problem'
import { breakLongWords } from '@/utils/index'
import moment from 'moment'

export default {
  name: 'ContestRankACM',
  components: {
    ECharts
  },
  mixins: [gridMixin, paggingMixin],
  data() {
    return {
      showChart: true,
      chartOptions: {
        title: {
          text: this.$t('rank.top10'),
          left: 'center'
        },
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true, title: this.$t('rank.save_image') }
          },
          right: '5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            axis: 'x'
          }
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: 0,
          data: [],
          formatter: (value) => {
            return breakLongWords(value, 16)
          },
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          x: 80,
          x2: 200
        },
        xAxis: [
          {
            type: 'time',
            splitLine: false,
            axisPointer: {
              show: true,
              snap: true
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [0]
          }
        ],
        series: []
      },
      contestProblems: [],
      problemColumns: []
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.fetchChartData()
  },
  async created() {
    const { _fetchData, getContestProblemList } = this
    await getContestProblemList()
    _fetchData()
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { search, pagging } = this
      const { data } = await this.$api.getContestRankList({
        params: {
          ...search,
          ...pagging,
          contest_id: this.contest.id
        }
      })
      data.results.forEach((val, index) => {
        Object.keys(data.results[index].submission_info).forEach((problemId) => {
          const problem = this.contestProblems.find((val) => {
            return val.id === parseInt(problemId)
          })
          data.results[index][problem._id] = data.results[index].submission_info[problemId]
        })
      })
      return data
    },

    // 获取图表数据
    async fetchChartData() {
      const { data } = await this.$api.getContestRankList({
        params: {
          offset: 0,
          limit: 10,
          contest_id: this.contest.id
        }
      })
      this.buildChartData(data)
    },

    // 构建图表纵坐标 分类
    buildChartYAxis() {
      let category = []
      for (let i = 0; i <= this.contestProblems.length; ++i) {
        category.push(i)
      }
      this.chartOptions.yAxis[0].data = category
    },

    // 构建图表数据
    buildChartData(data) {
      let [users, seriesData] = [[], []]
      data.results.forEach((rank) => {
        users.push(rank.user.username)
        let info = rank.submission_info
        // 提取出已AC题目的时间
        let timeData = []
        Object.keys(info).forEach((problemID) => {
          if (info[problemID].is_ac) {
            timeData.push(info[problemID].ac_time)
          }
        })
        timeData.sort((a, b) => {
          return a - b
        })

        let data = []
        data.push([this.contest.start_time, 0])
        // index here can be regarded as stacked accepted number count.
        for (let [index, value] of timeData.entries()) {
          let realTime = moment(this.contest.start_time)
            .add(value, 'seconds')
            .format()
          data.push([realTime, index + 1])
        }
        seriesData.push({
          name: rank.user.username,
          type: 'line',
          data
        })
      })
      this.chartOptions.legend.data = users
      this.chartOptions.series = seriesData
    },

    // 获取题目列表
    async getContestProblemList() {
      const { data } = await this.$api.getContestProblem({
        params: {
          contest_id: this.$route.params.contest_id
        }
      })
      this.contestProblems = data
    },

    // 计算通过率
    getAcceptedRate(accepted, submited) {
      return getAcceptedRate(accepted, submited)
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

    // 表头题目序号点击
    handleTableHeaderClick(problem_id) {
      this.$router.push({ name: 'ContestProblemDetail', params: { problem_id } })
    },

    // 提交总数 点击
    handleTotalSubmissionClick(username) {
      this.$router.push({ name: 'ContestSubmissionList', query: { username } })
    }
  },

  filters: {
    time(totalTime) {
      let m = moment.duration(totalTime, 's')
      return [Math.floor(m.asHours()), m.minutes(), m.seconds()].join(':')
    }
  },

  watch: {
    contestProblems(nVal) {
      const columns = []
      Object.keys(nVal).forEach((key) => {
        columns.push({
          prop: nVal[key]._id,
          label: nVal[key]._id
        })
      })
      columns.sort((a, b) => {
        if (a.prop === b.prop) {
          return 0
        } else if (a.prop < b.prop) {
          return -1
        } else {
          return 1
        }
      })
      this.problemColumns = columns
      this.buildChartYAxis()
    }
  }
}
</script>

<style lang="scss" scoped>
.contest-rank-acm {
  .rank-status {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    &.ac {
      background-color: #dff0d8;
      color: #3c763d;

      &.first {
        background-color: #3c9;
      }
    }

    &.wa {
      color: #a94442;
      background-color: #f2dede;
    }

    span {
      top: 50%;
      position: absolute;
      left: 50%;
      width: 100%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>
