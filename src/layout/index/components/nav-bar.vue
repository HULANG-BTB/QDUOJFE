<template>
  <div class="nav-bar">
    <el-menu :default-active="activeIndex" class="oj-menu" mode="horizontal" @select="handleRoute">
      <div class="logo">
        <span>{{ settings.logo }}</span>
      </div>
      <el-menu-item index="/home">
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
      </el-submenu>
      <div class="user">
        <template v-if="user">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link"> {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" style="min-width: 80px; text-align: center;">
              <el-dropdown-item command="/user/home" style="padding: 2px 16px;">{{ $t('navigation.user.user.home') }}</el-dropdown-item>
              <el-dropdown-item command="/user/submissions" style="padding: 2px 16px;">{{ $t('navigation.user.user.submissions') }}</el-dropdown-item>
              <el-dropdown-item command="/user/settings" style="padding: 2px 16px;">{{ $t('navigation.user.user.settings') }}</el-dropdown-item>
              <el-dropdown-item command="/user/logout" style="padding: 2px 16px;" divided>{{ $t('navigation.user.user.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button @click="handleLogin" round>{{ $t('navigation.user.login') }}</el-button>
          <el-button @click="handleRegister" round>{{ $t('navigation.user.register') }}</el-button>
        </template>
      </div>
    </el-menu>
    <el-dialog :visible.sync="dialog.visiable" append-to-body width="400px">
      <template #title>{{ $t(`navigation.user.${dialog.mode}`) }}</template>
      <component v-if="dialog.visiable" :is="currentComponent" :dialog="dialog"> </component>
    </el-dialog>
  </div>
</template>

<script>
const asyncComponentsMap = {
  login: () => import('@/components/user/login'),
  register: () => import('@/components/user/register')
}
export default {
  name: 'NavBar',
  data() {
    return {
      activeIndex: this.$route.path,
      dialog: {
        mode: 'login',
        visiable: false
      }
    }
  },
  methods: {
    handleRoute(route) {
      if (this.$route.path !== route) {
        this.$router.push({ path: route })
      }
    },
    handleLogin() {
      this.dialog.mode = 'login'
      this.dialog.visiable = true
    },
    handleRegister() {
      this.dialog.mode = 'register'
      this.dialog.visiable = true
    },
    handleCommand(command) {
      console.log(command)
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    currentComponent() {
      return asyncComponentsMap[this.dialog.mode]
    },
    user() {
      return this.$store.state.user.user
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  min-width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  z-index: 2000;
  background-color: #fff;
  user-select: none;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);

  .oj-menu {
    background: #fdfdfd;

    .logo {
      margin-left: 2%;
      margin-right: 2%;
      font-size: 20px;
      float: left;
      line-height: 60px;
    }

    .user {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      float: right;
      margin-right: 10px;
      border: none;

      &:focus {
        outline: none;
      }

      .el-dropdown {
        margin-right: 40px;

        .el-dropdown-link {
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
