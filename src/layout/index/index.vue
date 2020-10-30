<template>
  <el-container>
    <el-header>
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-main>
        <transition name="fadeInUp" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer>
        <div class="footer">
          <!-- <p v-html="website.website_footer"></p> -->
          <p>
            Powered by <a href="https://github.com/QingdaoU/OnlineJudge">OnlineJudge</a>
            <!-- <span v-if="version">&nbsp; Version: {{ version }}</span> -->
          </p>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script scoped>
import NavBar from './components/nav-bar'
export default {
  name: 'IndexLayout',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.el-main {
  margin-top: 20px;
  padding: 0 2%;
}
.el-footer {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: small;
}
.fadeInUp-enter-active {
  animation: fadeInUp 0.8s;
}
</style>
