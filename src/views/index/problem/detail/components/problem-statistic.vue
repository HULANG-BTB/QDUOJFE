<template>
  <card-layout class="problem-statistic">
    <template #title>
      <i class="el-icon-data-line" style="margin-right: 10px"></i>
      {{ $t('problem.statistic.title') }}
    </template>
    <template #toobar>
      <el-button @click="() => (dialogVisiable = true)">{{ $t('problem.statistic.detail') }}</el-button>
    </template>
    <e-charts class="chart-pie" ref="pie" :options="smallPieChartOptions"></e-charts>
    <el-dialog v-if="dialogVisiable" :visible.sync="dialogVisiable" width="640px">
      <template #title>
        <span>{{ $t('problem.statistic.title') }}</span>
      </template>

      <e-charts ref="detailPie" :options="largePieChartOptions"></e-charts>
    </el-dialog>
  </card-layout>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import JUDGE_STATUS from '@/constants/judgeStatus'
import { pie, largePie } from './chartData'
export default {
  name: 'ProblemInfo',
  components: {
    ECharts
  },
  data() {
    return {
      pie: pie,
      largePie: largePie,
      dialogVisiable: false
    }
  },
  props: {
    problem: {
      type: Object,
      required: true
    }
  },
  computed: {
    smallPieChartOptions() {
      let data = [
        { name: 'WA', value: this.problem.submission_number - this.problem.accepted_number },
        { name: 'AC', value: this.problem.accepted_number }
      ]
      const pie = this.pie
      pie.series[0].data = data
      return pie
    },
    largePieChartOptions() {
      let data = [
        { name: 'WA', value: this.problem.submission_number - this.problem.accepted_number },
        { name: 'AC', value: this.problem.accepted_number }
      ]
      data[1].selected = true
      const largePie = this.largePie
      largePie.series[1].data = data
      // 根据结果设置legend,没有提交过的legend不显示
      let legend = Object.keys(this.problem.statistic_info).map((ele) => JUDGE_STATUS[ele].short)
      if (legend.length === 0) {
        legend.push('AC', 'WA')
      }
      largePie.legend.data = legend

      // // 把ac的数据提取出来放在最后
      // let acCount = this.problem.statistic_info['0']
      // delete this.problem.statistic_info['0']

      let largePieData = []
      if (this.problem?.statistic_info) {
        console.log(this.problem?.statistic_info)
        Object.keys(this.problem.statistic_info).forEach((ele) => {
          largePieData.push({ name: JUDGE_STATUS[ele].short, value: this.problem?.statistic_info?.[ele] })
        })
      }
      // let largePieData = []
      // Object.keys(this.problemInfo.statistic_info).forEach((ele) => {
      //   largePieData.push({ name: JUDGE_STATUS[ele].short, value: this.problemInfo?.statistic_info?.[ele] })
      // })
      // largePieData.push({ name: 'AC', value: acCount })
      largePie.series[0].data = largePieData
      return largePie
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-statistic {
  .chart-pie {
    width: calc(100vw / 24 * 2);
    height: calc(100vw / 24 * 2 + 40px);
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
