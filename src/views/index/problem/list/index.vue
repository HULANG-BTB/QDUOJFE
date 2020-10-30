<template>
  <div class="problem-list">
    <el-row :gutter="18">
      <el-col :span="19">
        <problem-list></problem-list>
      </el-col>
      <el-col :span="5">
        <tag-list></tag-list>
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
  }
}
</script>
