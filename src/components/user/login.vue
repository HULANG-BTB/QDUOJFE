<template>
  <div class="login">
    <el-form ref="form" :model="formData" :rules="rules" @keyup.enter.native="onSave">
      <el-form-item prop="username">
        <el-input placeholder="username" v-model="formData.username">
          <template #prepend>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="password" v-model="formData.password" type="password">
          <template #prepend>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" style="width: 100%" @click="onSave">login</el-button>
      </el-form-item>
      <div class="footer">
        <el-link type="primary" @click="handleRegister">注册账号</el-link>
        <el-link type="primary" style="float: right" @click="handleForget">忘记密码</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin'
export default {
  name: 'Login',
  mixins: [formMixin],
  data() {
    return {
      rules: {
        username: [{ required: true }],
        password: [{ required: true }]
      }
    }
  },
  props: {
    dialog: {
      type: Object,
      require: true
    }
  },
  methods: {
    async saveData() {
      await this.$api
        .login({
          data: this.formData
        })
        .then(() => {
          this.dialog.visiable = false
          this.$store.dispatch('user/getProfile')
        })
        .catch(() => {})
    },
    handleRegister() {
      this.dialog.mode = 'register'
    },
    handleForget() {
      // Todo 忘记密码实现
    }
  }
}
</script>

<style lang="less" scoped></style>
