<template>
  <card-layout class="announcement-list">
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

    <template #pagination>
      <el-pagination background layout="total, sizes, prev, pager, next" :total="pagging.total" :page-size="pagging.limit" :current-page="pagging.page" @current-change="onChangeCurrentPage" @size-change="onChangePageSize"> </el-pagination>
    </template>
  </card-layout>
</template>

<script scoped>
import AnnouncementItem from './components/announcement-item'
import paggingMixin from '@/mixins/paggingMixin'
import gridMixin from '@/mixins/gridMixin'
export default {
  name: 'Announcements',
  mixins: [gridMixin, paggingMixin],
  components: {
    AnnouncementItem
  },
  created() {
    const { _fetchData } = this
    _fetchData()
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { search, pagging } = this
      const { data } = await this.$api.getAnnouncementList({
        params: {
          ...search,
          ...pagging
        }
      })
      return data
    },

    // 公告点击
    handleAnnouncementItemClick(row) {
      this.$emit('show-detail', row)
    }
  }
}
</script>
