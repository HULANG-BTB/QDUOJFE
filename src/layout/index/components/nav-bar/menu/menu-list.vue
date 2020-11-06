<template>
  <el-menu :default-active="activeMenu" router class="menu" mode="horizontal">
    <template v-for="route in routes">
      <menu-item :key="route.path" :item="route" :base-path="route.path"></menu-item>
    </template>

    <!-- <el-menu-item index="/home">
      <template #title>
        <i class="el-icon-s-home"></i>
        {{ $t('navigation.home') }}
      </template>
    </el-menu-item>
    <el-menu-item index="/problem">
      <template #title>
        <i class="el-icon-s-grid"></i>
        {{ $t('navigation.problem') }}
      </template>
    </el-menu-item>
    <el-menu-item index="/contest">
      <template #title>
        <i class="el-icon-s-platform"></i>
        {{ $t('navigation.contest') }}
      </template>
    </el-menu-item>
    <el-menu-item index="/status">
      <template #title>
        <i class="el-icon-s-shop"></i>
        {{ $t('navigation.status') }}
      </template>
    </el-menu-item>
    <el-submenu index="/rank">
      <template #title>
        <i class="el-icon-s-marketing"></i>
        {{ $t('navigation.rank.rank') }}
      </template>
      <el-menu-item index="/rank/acm">{{ $t('navigation.rank.acm') }}</el-menu-item>
      <el-menu-item index="/rank/oi">{{ $t('navigation.rank.oi') }}</el-menu-item>
    </el-submenu>
    <el-submenu index="/about">
      <template #title>
        <i class="el-icon-info"></i>
        {{ $t('navigation.about.about') }}
      </template>
      <el-menu-item index="/about/judger">{{ $t('navigation.about.judger') }}</el-menu-item>
      <el-menu-item index="/about/faq">{{ $t('navigation.about.faq') }}</el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
import MenuItem from './menu-item'
export default {
  name: 'MenuList',
  computed: {
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  components: {
    MenuItem
  }
}
</script>

<style lang="scss" scoped>
.menu {
  float: left;
}
</style>
