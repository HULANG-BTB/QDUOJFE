<template>
  <div class="register">
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="username" v-model="formData.username">
          <template #prepend>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="email" v-model="formData.email">
          <template #prepend>
            <i class="el-icon-s-promotion"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="Password" v-model="formData.password" type="password">
          <template #prepend>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input placeholder="Password Again" v-model="formData.repassword" type="repassword">
          <template #prepend>
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captche">
        <el-input placeholder="captche" v-model="formData.captche">
          <template #append>验证码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" style="width: 100%" @click="onSave">login</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" style="width: 100%" @click="handleLogin">已有账号，现在登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin'
export default {
  name: 'Register',
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
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
      return 0
    },
    handleLogin() {
      this.dialog.mode = 'login'
    }
  }
}
</script>

<style lang="less" scoped></style>
