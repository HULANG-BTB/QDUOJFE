<template>
  <card-layout class="problem-statistic">
    <template #title>
      <i class="el-icon-data-line" style="margin-right: 10px"></i>
      {{ $t('problem.statistic.title') }}
    </template>
    <template #toobar>
      <el-button>{{ $t('problem.statistic.detail') }}</el-button>
    </template>
    <e-charts class="chart-pie" ref="pie" :options="smallPieChartOptions"></e-charts>
  </card-layout>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import { pie } from './chartData'
export default {
  name: 'ProblemInfo',
  components: {
    ECharts
  },
  data() {
    return {
      pie: pie
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
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-statistic {
  .chart-pie {
    width: calc(100vw / 24 * 2);
    height: calc(100vw / 24 * 2 + 40px);
  }
}
</style>
