<template>
  <div class="account-setting">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="password-setting">
          <div class="title">Change Password</div>
          <div class="content">
            <el-form :model="password" ref="passwordForm" :rules="rules">
              <el-form-item label="Old Password" prop="old_password">
                <el-input type="password" v-model="password.old_password"></el-input>
              </el-form-item>
              <el-form-item label="New Password" prop="new_password">
                <el-input type="password" v-model="password.new_password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm New Password" prop="again_password">
                <el-input type="password" v-model="password.again_password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading.password" @click="handleUpdatePasswordClick">Update Passowrd</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="12" style="border-left: 1px #aaa dashed">
        <div class="email-setting">
          <div class="title">Change Email</div>
          <div class="content">
            <el-form :model="email" ref="emailForm" :rules="rules">
              <el-form-item label="Old Email" prop="old_email">
                <el-input v-model="email.old_email" disabled></el-input>
              </el-form-item>
              <el-form-item label="New Email" prop="new_email">
                <el-input v-model="email.new_email"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input v-model="email.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading.email" @click="handleUpdateEmailClick">Update Email</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AccountSetting',
  data() {
    const CheckAgainPassword = (rule, value, callback) => {
      if (value !== this.password.new_password) {
        callback(new Error('password does not match'))
      }
      callback()
    }
    const CheckNewPassword = (rule, value, callback) => {
      if (this.password.old_password !== '') {
        if (this.password.old_password === this.password.new_password) {
          callback(new Error("The new password doesn't change"))
        } else {
          // 对第二个密码框再次验证
          this.$refs.passwordForm.validateField('again_password')
        }
      }
      callback()
    }
    return {
      password: {
        old_password: '',
        new_password: '',
        again_password: ''
      },
      email: {
        old_email: '',
        new_email: '',
        password: ''
      },
      rules: {
        old_password: [{ required: true, trigger: 'blur', min: 6, max: 20 }],
        new_password: [{ required: true, validator: CheckNewPassword, trigger: 'blur' }],
        again_password: [{ required: true, validator: CheckAgainPassword, trigger: 'change' }],
        new_email: [{ required: true, type: 'email', trigger: 'change' }],
        password: [{ required: true, trigger: 'blur', min: 6, max: 20 }]
      },
      loading: {
        password: false,
        email: false
      }
    }
  },
  mounted() {
    this.email.old_email = this.$store.getters['user/user'].email || ''
  },
  methods: {
    async handleUpdatePasswordClick() {
      try {
        this.loading.password = true
        await this.$refs.passwordForm.validate()
        await this.$api.savePassword({
          data: {
            ...this.password
          }
        })
      } catch (err) {
        err
      } finally {
        this.loading.password = false
      }

      //
    },
    async handleUpdateEmailClick() {
      try {
        this.loading.email = true
        await this.$refs.emailForm.validate()
        await this.$api.saveEmail({
          data: {
            ...this.email
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading.email = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-setting {
  .password-setting,
  .email-setting {
    padding: 0 1rem;

    .title {
      font-size: 1.3rem;
    }
    .content {
      padding: 0 1rem;
      margin-top: 1rem;
    }
  }
}
</style>
