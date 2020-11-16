<template>
  <el-row :gutter="18">
    <el-col :span="20">
      <component :is="currentView" :contest="contest"></component>
    </el-col>
    <el-col :span="4">
      <contest-nav v-if="contest.id" :contest="contest"></contest-nav>
    </el-col>
  </el-row>
</template>

<script>
const syncComponents = {
  ACM: () => import('./components/rank-acm'),
  OI: () => import('./components/rank-oi')
}
import ContestNav from '../nav/'
export default {
  name: 'ContestRank',
  components: {
    ContestNav
  },
  data() {
    return {
      currentView: syncComponents[this.contest.rule_type]
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  }
}
</script>
