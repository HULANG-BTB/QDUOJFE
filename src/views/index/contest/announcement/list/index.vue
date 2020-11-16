<template>
  <card-layout class="contest-announcement-list">
    <template #title>
      {{ $t('announcements.list') }}
    </template>
    <template #toobar>
      <el-button type="primary" @click="fetchData">{{ $t('announcements.refresh') }}</el-button>
    </template>
    <div class="contest" v-if="grid.rows.length">
      <announcement-item v-for="item in grid.rows" :key="item.id" :announcement="item" @click.native="handleAnnouncementItemClick(item)"></announcement-item>
    </div>
    <div class="content" v-else>{{ $t('announcements.no') }}</div>
  </card-layout>
</template>

<script scoped>
import AnnouncementItem from './components/announcement-item'
import paggingMixin from '@/mixins/paggingMixin'
import gridMixin from '@/mixins/gridMixin'
export default {
  name: 'ContestAnnouncements',
  mixins: [gridMixin, paggingMixin],
  components: {
    AnnouncementItem
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  created() {
    const { _fetchData } = this
    _fetchData()
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { data } = await this.$api.getContestAnnouncementList({
        params: {
          contest_id: this.contest.id
        }
      })
      return { results: data }
    },

    // 公告点击
    handleAnnouncementItemClick(row) {
      this.$emit('show-detail', row)
    }
  }
}
</script>
