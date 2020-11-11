<template>
  <el-menu default-active="overview" class="contest-sidebar" @select="onMenuSelected">
    <el-menu-item v-for="item in menus" class="contest-sidebar-item" :key="item.title" :index="item.index" :disabled="item.access && !access && needPassword">
      <svg-icon :icon="item.icon" style="margin-right: 5px; font-size: 16px"></svg-icon>
      <span slot="title"> {{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'ContestMenu',
  data() {
    return {
      menus: [
        {
          icon: 'home',
          title: 'Overview',
          index: 'ContestInfo',
          access: false
        },
        {
          icon: 'message',
          title: 'Announcements',
          index: 'announcements',
          access: true
        },
        {
          icon: 'copy',
          title: 'Problems',
          index: 'ContestProblemList',
          access: true
        },
        {
          icon: 'list',
          title: 'Submissions',
          index: 'ContestSubmissionList',
          access: true
        },
        {
          icon: 'layers',
          title: 'Rankings',
          index: 'rankings',
          access: true
        }
      ]
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    },
    access: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    needPassword() {
      return this.contest?.contest_type === 'Password Protected'
    }
  },
  methods: {
    onMenuSelected(index) {
      this.$router.push({
        name: index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contest-sidebar {
  user-select: none;
  text-align: left;

  .contest-sidebar-item {
    line-height: 56px;
  }
}
</style>
