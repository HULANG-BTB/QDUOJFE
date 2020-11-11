<template>
  <el-row :gutter="18">
    <el-col :span="20">
      <router-view v-if="contest.id" :contest="contest" v-bind="$attrs"></router-view>
    </el-col>
    <el-col :span="4">
      <contest-nav v-if="contest.id" :contest="contest"></contest-nav>
    </el-col>
  </el-row>
</template>

<script>
import ContestNav from '../nav/'
export default {
  name: 'ContestSubmission',
  components: {
    ContestNav
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  }
}
</script>
