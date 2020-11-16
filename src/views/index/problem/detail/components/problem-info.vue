<template>
  <card-layout class="problem-info">
    <template #title>
      <i class="el-icon-info" style="margin-right: 10px"></i>
      {{ $t('problem.info.title') }}
    </template>
    <ul>
      <li>
        <span class="label">{{ $t('problem.info.id') }}</span>
        <span class="value">{{ problem._id }}</span>
      </li>
      <li>
        <span class="label">{{ $t('problem.info.time') }}</span>
        <span class="value">{{ problem.time_limit }} MS</span>
      </li>
      <li>
        <span class="label">{{ $t('problem.info.memory') }}</span>
        <span class="value">{{ problem.memory_limit }} MB</span>
      </li>
      <li v-if="problem.io_mode">
        <span class="label">{{ $t('problem.info.mode') }}</span>
        <span class="value">{{ problem.io_mode.io_mode }}</span>
      </li>
      <li v-if="problem.created_by">
        <span class="label">{{ $t('problem.info.create') }}</span>
        <span class="value">{{ problem.created_by.username }}</span>
      </li>
      <li v-if="problem.difficulty">
        <span class="label">{{ $t('problem.info.level') }}</span>
        <span class="value">{{ problem.difficulty }}</span>
      </li>
      <li v-if="problem.source">
        <span class="label">{{ $t('problem.info.source') }}</span>
        <span class="value">{{ problem.source }}</span>
      </li>
      <li v-if="problem.tags">
        <span class="label">{{ $t('problem.info.tag') }}</span>
        <span class="value">
          <el-popover placement="left" width="200" trigger="hover">
            <el-link type="primary" :underline="false" slot="reference">{{ $t('problem.info.show') }}</el-link>
            <el-tag v-for="tag in problem.tags" :key="tag"> {{ tag }}</el-tag>
          </el-popover>
        </span>
      </li>
    </ul>
  </card-layout>
</template>

<script>
export default {
  name: 'ProblemInfo',
  props: {
    problem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-info {
  ul {
    list-style: none;
    padding-inline-start: 5px;
    padding-inline-end: 5px;
    li {
      border-bottom: 1px dotted #e9eaec;
      margin-top: 0.5rem;
      .label {
        float: left;
      }
      .value {
        float: right;
      }
      &::after {
        content: ' ';
        clear: both;
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
    }
  }

  /deep/ .el-card__body {
    padding: 0.5rem;
  }
}
</style>
