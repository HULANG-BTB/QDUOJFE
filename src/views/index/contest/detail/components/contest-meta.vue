<template>
  <card-layout class="contest-meta">
    <template #title>
      <i class="el-icon-info" style="margin-right: 10px"></i>
      比赛信息
    </template>
    <ul>
      <li>
        <span class="label">{{ $t('contest.meta.start') }}</span>
        <span class="value">{{ contest.start_time | dateTime }}</span>
      </li>
      <li>
        <span class="label">{{ $t('contest.meta.end') }}</span>
        <span class="value">{{ contest.end_time | dateTime }}</span>
      </li>
      <li>
        <span class="label">{{ $t('contest.meta.type') }}</span>
        <span class="value">{{ contest.contest_type }}</span>
      </li>
      <li v-if="contest.io_mode">
        <span class="label">{{ $t('contest.meta.rule') }}</span>
        <span class="value">{{ contest.io_mode.rule_type }}</span>
      </li>
      <li v-if="contest.created_by">
        <span class="label">{{ $t('contest.meta.creater') }}</span>
        <span class="value">{{ contest.created_by.username }}</span>
      </li>
    </ul>
  </card-layout>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ContestMeta',
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  filters: {
    dateTime(val) {
      return moment(val).format('LLL')
    }
  }
}
</script>

<style lang="scss" scoped>
.contest-meta {
  ul {
    list-style: none;
    padding-inline-start: 5px;
    padding-inline-end: 5px;
    li {
      border-bottom: 1px dotted #e9eaec;
      margin-top: 1rem;

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
