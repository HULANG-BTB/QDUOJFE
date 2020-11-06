<template>
  <div class="nav-bar">
    <div class="logo">
      <span>{{ settings.logo }}</span>
    </div>
    <div class="oj-menu">
      <menu-list></menu-list>
    </div>
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
    <el-dialog :visible.sync="dialog.visiable" append-to-body width="400px">
      <template #title>{{ $t(`navigation.user.${dialog.mode}`) }}</template>
      <component v-if="dialog.visiable" :is="currentComponent" :dialog="dialog"> </component>
    </el-dialog>
  </div>
</template>

<script>
import MenuList from './menu/menu-list'
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
  components: {
    MenuList
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
    },
    routes() {
      return this.$router.options.routes
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

  .logo {
    margin-left: 2%;
    margin-right: 2%;
    font-size: 20px;
    float: left;
    line-height: 60px;
  }

  .oj-menu {
    float: left;
    background: #fdfdfd;
    overflow: auto;
  }

  .user {
    float: right;
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

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
