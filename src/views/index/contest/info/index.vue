<template>
  <el-row :gutter="18">
    <el-col :span="20">
      <card-layout class="contest-info">
        <template #title>
          {{ contest.title }}
        </template>
        <template #toobar>
          {{ contest.title }}
        </template>
        <div class="contest-description" v-html="contest.description"></div>
      </card-layout>
    </el-col>
    <el-col :span="4">
      <contest-nav v-if="contest.id" :contest="contest"></contest-nav>
      <!-- <el-row>
        <contest-menu :contest="contest"></contest-menu>
      </el-row> -->
      <!-- <el-row v-if="needPassword && !access" style="margin-top: 20px">
        <contest-password :contest="contest" @access-change="handleAccessChange"></contest-password>
      </el-row>
      <el-row v-if="contest" style="margin-top: 20px">
        <contest-meta :contest="contest"></contest-meta>
      </el-row> -->
    </el-col>
  </el-row>
</template>

<script>
import ContestNav from '../nav/'
export default {
  name: 'ContestInfo',
  components: {
    ContestNav
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  computed: {
    contest_id() {
      return this.$route.params.contest_id
    }
  }
}
</script>

<style lang="scss" scoped></style>
