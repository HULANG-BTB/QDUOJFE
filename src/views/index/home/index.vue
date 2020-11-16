<template>
  <div class="home-page">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <announcements></announcements>
      </el-col>
    </el-row>
  </div>
</template>

<script scoped>
import Announcements from './announcement'
export default {
  name: 'HomePage',
  components: {
    Announcements
  }
}
</script>
