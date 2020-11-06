<template>
  <div class="problem-list">
    <el-row :gutter="18">
      <el-col :span="19">
        <problem-list ref="problemList"></problem-list>
      </el-col>
      <el-col :span="5">
        <tag-list @tag-click="onTagClick"></tag-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProblemList from './components/problem-list'
import TagList from './components/tag-list'

export default {
  name: 'Layout',
  components: {
    ProblemList,
    TagList
  },
  methods: {
    onTagClick(tag) {
      this.$refs.problemList.searchWithTag?.(tag)
    }
  }
}
</script>
