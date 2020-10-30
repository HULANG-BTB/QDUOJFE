<template>
  <card-layout class="tag-list">
    <template #title>
      {{ $t('problem.list.tags') }}
    </template>
    <div class="content">
      <el-button class="tag-btn" v-for="item in tagList" :key="item.id" round>{{ item.name }}</el-button>
    </div>
  </card-layout>
</template>

<script>
export default {
  name: 'TagList',
  data() {
    return {
      tagList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$api.getTagList()
      this.tagList = data
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-list {
  text-align: left;

  .tag-btn {
    margin-right: 5px;
    margin-bottom: 10px;
  }
}
</style>
