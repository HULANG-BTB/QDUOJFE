<template>
  <div class="contest-item" @dblclick="onContestItemDbClick">
    <div class="contest-thumbnail">
      <svg-icon icon="cup"></svg-icon>
    </div>
    <div class="contest-info">
      <div class="title">
        {{ data.title }}
        <i v-if="needPassWord" class="el-icon-lock" style="margin-left: 5px"></i>
      </div>
      <div class="meta">
        <div class="date">
          <i class="el-icon-date" style="margin-right: 5px;"></i>
          {{ data.start_time | dateTime }}
        </div>
        <div class="time">
          <i class="el-icon-time" style="margin-right: 5px;"></i>
          {{ durantion }}
        </div>
        <div class="mode">
          <el-tag effect="plain" type="info">
            {{ this.data.rule_type }}
          </el-tag>
        </div>
      </div>
    </div>
    <div class="contest-status">
      <el-tag effect="plain">
        <span class="dot" :style="{ backgroundColor: statusColor }"></span>
        {{ statusName }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import time from '@/utils/time'
import contestStatusReverse from '@/constants/contestStatusReverse'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusColor() {
      return contestStatusReverse[this.data.status].color
    },
    statusName() {
      return contestStatusReverse[this.data.status].name
    },
    needPassWord() {
      return this.data.contest_type === 'Password Protected'
    },
    durantion() {
      return time.duration(this.data.start_time, this.data.end_time)
      // return moment(this.data.end_time).diff(moment(this.data.start_time), 'hours', true)
    }
  },
  filters: {
    dateTime(val) {
      return moment(val).format('LLL')
    }
  },
  methods: {
    onContestItemDbClick() {
      this.$router.push({ name: 'ContestDetail', params: { id: this.data.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.contest-item {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  transition: 0.7s ease-in-out;
  user-select: none;

  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }

  .contest-thumbnail {
    font-size: 48px;
    margin: 0 20px;
  }

  .contest-info {
    flex-grow: 1;
    .title {
      font-size: 1.2rem;
    }
    .meta {
      margin-top: 1rem;
      font-size: 0.8rem;
      display: flex;
      flex-direction: row;
      line-height: 20px;

      div:not(:first-child) {
        margin-left: 1.2rem;
      }
    }
  }

  .contest-status {
    width: 200px;
    text-align: center;

    .dot {
      display: inline-block;
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.5rem;
      border-radius: 50%;
      background: #e9eaec;
      position: relative;
      top: 0.1rem;
    }
  }
}
</style>
