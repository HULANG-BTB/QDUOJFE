<template>
  <div class="judge-staus-dict">
    <el-alert v-if="alert" center :type="type" :title="title" :closable="false" effect="dark"> </el-alert>
    <template v-else>{{ title }}</template>
  </div>
</template>

<script>
import JUDGE_STATUS from '@/constants/judgeStatus'
export default {
  name: 'JudgeStausDict',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    alert: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    type() {
      return JUDGE_STATUS[this.value].type || 'info'
    },
    title() {
      return JUDGE_STATUS[this.value].name || 'unknown'
    }
  }
}
</script>

<style lang="scss" scoped>
.judge-staus-dict {
  user-select: none;
  display: flex;
  justify-content: center;

  /deep/ {
    .el-alert {
      width: max-content;
      padding: 0.2rem 1rem;
    }
  }
}
</style>
