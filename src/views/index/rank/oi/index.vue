<template>
  <div class="rank-oi">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <card-layout>
          <template #title>OI 排名</template>
          <e-charts :options="chartOptions" ref="chart" auto-resize style="width: 100%"></e-charts>
          <el-table :data="grid.rows" highlight-current-row v-loading="grid.loading">
            <el-table-column align="center" type="index" label="#" width="80"></el-table-column>
            <el-table-column align="center" prop="user" :label="$t('rank.user')" #default="{row}">
              {{ row.user.username }}
            </el-table-column>
            <el-table-column align="center" prop="mood" :label="$t('rank.mood')"></el-table-column>
            <el-table-column align="center" prop="total_score" :label="$t('rank.score')"></el-table-column>
            <el-table-column align="center" prop="accepted_number" :label="$t('rank.accepted')"></el-table-column>
            <el-table-column align="center" prop="submission_number" :label="$t('rank.submit')"></el-table-column>
            <el-table-column align="center" prop="accepted_number" :label="$t('rank.accepted_rate')" #default="{row}">
              {{ `${getAcceptedRate(row.accepted_number, row.submission_number)}` }}
            </el-table-column>
          </el-table>
          <template #pagination>
            <el-pagination background layout="total, sizes, prev, pager, next" :total="pagging.total" :page-size="pagging.limit" :current-page="pagging.page" @current-change="onChangeCurrentPage" @size-change="onChangePageSize"> </el-pagination>
          </template>
        </card-layout>
      </el-col>
    </el-row>
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

export default {
  name: 'ACM-RANK',
  mixins: [gridMixin, paggingMixin],
  created() {
    const { _fetchData } = this
    _fetchData()
  },
  mounted() {
    this.fetchChartData()
  },
  components: {
    ECharts
  },
  data() {
    return {
      chartOptions: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$i18n.t('m.Score')]
        },
        grid: {
          x: '3%',
          x2: '3%'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
          },
          right: '10%'
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['root'],
            boundaryGap: true,
            axisLabel: {
              interval: 0,
              showMinLabel: true,
              showMaxLabel: true,
              align: 'center',
              formatter: (value) => {
                return breakLongWords(value, 14)
              }
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$t('rank.score'),
            type: 'bar',
            data: [0],
            barMaxWidth: '80',
            markPoint: {
              data: [{ type: 'max', name: 'max' }]
            }
          }
        ]
      }
    }
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { search, pagging } = this
      const { data } = await this.$api.getRankList({
        params: {
          ...search,
          ...pagging,
          rule: 'OI'
        }
      })
      return data
    },

    // 获取图表数据
    async fetchChartData() {
      let bar = this.$refs.chart
      try {
        bar.showLoading({ maskColor: 'rgba(250, 250, 250, 0.8)' })
        const { data } = await this.$api.getRankList({
          params: {
            offset: 0,
            limit: 10,
            rule: 'OI'
          }
        })

        let [usernames, scores] = [[], []]
        data.results.forEach((ele) => {
          usernames.push(ele.user.username)
          scores.push(ele.total_score)
        })
        this.chartOptions.xAxis[0].data = usernames
        this.chartOptions.series[0].data = scores
      } finally {
        bar.hideLoading()
      }
    },

    // 计算通过率
    getAcceptedRate(accepted, submited) {
      return getAcceptedRate(accepted, submited)
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
.rank-oi {
  .card-box {
    .title {
      text-align: left;
    }
  }
}
</style>
