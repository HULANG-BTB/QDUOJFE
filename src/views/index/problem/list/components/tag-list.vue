<template>
  <card-layout class="tag-list">
    <template #title>
      {{ $t('problem.list.tags') }}
    </template>
    <div class="content" v-loading="loading">
      <el-button class="tag-btn" v-for="item in tagList" :key="item.id" round @click="handleTagClick(item.name)">{{ item.name }}</el-button>
    </div>
  </card-layout>
</template>

<script>
export default {
  name: 'TagList',
  data() {
    return {
      tagList: [],
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const { data } = await this.$api.getTagList()
        this.tagList = data
      } finally {
        this.loading = false
      }
    },
    handleTagClick(tag) {
      this.$emit('tag-click', tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-list {
  text-align: left;

  .content {
    min-height: 3rem;

    .tag-btn {
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
}
</style>
