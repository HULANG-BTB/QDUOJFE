<template>
  <card-layout class="announcement-list">
    <template #title>
      {{ announcement.title }}
    </template>
    <template #toobar>
      <el-button type="primary" @click="handleBackClick">{{ $t('announcements.back') }}</el-button>
    </template>
    <div class="markdown-body">
      <div v-html="announcement.content"></div>
    </div>
  </card-layout>
</template>

<script>
export default {
  name: 'AnnouncementDetail',
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleBackClick() {
      this.$emit('back')
    }
  }
}
</script>
