<template>
  <div class="user-setting">
    <el-row type="flex" justify="center">
      <el-col :span="19">
        <card-layout>
          <div class="content">
            <div class="side-bar">
              <el-menu default-active="profile" @select="handleMenuSelect">
                <div class="avatar">
                  <el-avatar :src="user.avatar" :size="100"></el-avatar>
                </div>
                <el-menu-item index="profile">Profile</el-menu-item>
                <el-menu-item index="account">Account</el-menu-item>
                <el-menu-item index="security">Security</el-menu-item>
              </el-menu>
            </div>
            <div class="main-content">
              <transition name="fadeInUp" mode="out-in">
                <component :is="currentComponent"></component>
              </transition>
            </div>
          </div>
        </card-layout>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const syncComponents = {
  profile: () => import('./profile'),
  account: () => import('./account'),
  security: () => import('./security')
}
export default {
  name: 'UserSetting',
  data() {
    return {
      view: 'profile'
    }
  },
  computed: {
    currentComponent() {
      return syncComponents[this.view]
    },
    user() {
      return this.$store.getters['user/profile'] || {}
    }
  },
  methods: {
    handleMenuSelect(index) {
      this.view = index
    }
  }
}
</script>

<style lang="scss" scoped>
.user-setting {
  .content {
    display: flex;
    flex-direction: row;
    justify-content: left;

    .side-bar {
      width: 160px;
      text-align: center;
    }

    .divider {
      width: 1px;
      background-color: #000;
    }

    .main-content {
      flex-grow: 1;
      padding: 1rem;

      .fadeInUp-enter-active {
        animation: fadeInUp 0.8s;
      }
    }
  }
}
</style>
