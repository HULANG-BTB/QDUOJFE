<template>
  <div class="announcement-item">
    <div class="title">
      {{ announcement.title }}
    </div>
    <div class="date">
      {{ announcement.create_time | dataTime }}
    </div>
    <div class="creator">
      {{ announcement.created_by.username }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AnnouncementItem',
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  filters: {
    dataTime(val) {
      return moment(val).format('LLL')
    }
  }
}
</script>

<style lang="scss" scoped>
.announcement-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  user-select: none;

  .title {
    flex-grow: 1;
    font-size: 1.4rem;
  }

  .date {
    padding: 0 2rem;
  }

  .creator {
    padding: 0 2rem;
  }

  &:hover {
    background-color: rgba($color: #555, $alpha: 0.1);
    transition: all 1s ease-out;
  }
}
</style>
