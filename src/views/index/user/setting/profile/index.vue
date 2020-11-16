<template>
  <div class="profile-setting">
    <div class="avatar">
      <div class="title">Avatar Setting</div>
      <div class="content">
        <el-upload class="upload-demo" accept=".jpg,.jpeg,.png,.bmp,.gif" :before-upload="handleSelectFile" drag action="">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </div>
    <div class="profile">
      <div class="title">Profile Setting</div>
      <div class="content">
        <el-form :model="profile">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Real Name">
                <el-input v-model="profile.real_name"></el-input>
              </el-form-item>
              <el-form-item label="School">
                <el-input v-model="profile.school"></el-input>
              </el-form-item>
              <el-form-item label="Major">
                <el-input v-model="profile.major"></el-input>
              </el-form-item>
              <el-form-item label="Language">
                <el-select v-model="profile.language" style="width: 100%">
                  <el-option v-for="lang in languages" :key="lang.value" :value="lang.value" :label="lang.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Mood">
                <el-input v-model="profile.mood" />
              </el-form-item>
              <el-form-item label="Blog">
                <el-input v-model="profile.blog" />
              </el-form-item>
              <el-form-item label="Github">
                <el-input v-model="profile.github" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="handleSaveClick" :loading="loading">Save All</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <avatar-cropper-dialog v-if="dialog.show" :dialog="dialog" @update-success="$store.dispatch('user/getProfile')"></avatar-cropper-dialog>
  </div>
</template>

<script>
import { languages } from '@/locales'
import AvatarCropperDialog from './components/avatar-cropper-dialog'
export default {
  name: 'ProfileSetting',
  components: {
    AvatarCropperDialog
  },
  data() {
    return {
      profile: {
        real_name: '',
        mood: '',
        major: '',
        blog: '',
        school: '',
        github: '',
        language: ''
      },
      languages: languages,
      loading: false,
      avatarOption: {
        img: '',
        outputSize: 0.8,
        outputType: 'png'
      },
      dialog: {
        show: false,
        data: null
      }
    }
  },
  mounted() {
    const profile = this.$store.getters['user/profile']
    Object.keys(this.profile).forEach((key) => {
      if (profile[key] !== undefined) {
        this.profile[key] = profile[key]
      }
    })
  },
  methods: {
    // 检查文件类型
    checkFileType(file) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.name)) {
        this.$notify.warning({
          title: 'File type not support',
          desc: 'The format of ' + file.name + ' is incorrect ，please choose image only.'
        })
        return false
      }
      return true
    },

    // 检查文件大小
    checkFileSize(file) {
      // max size is 2MB
      if (file.size > 2 * 1024 * 1024) {
        this.$notify.warning({
          title: 'Exceed max size limit',
          desc: 'File ' + file.name + ' is too big, you can upload a image up to 2MB in size'
        })
        return false
      }
      return true
    },

    // 选择文件
    handleSelectFile(file) {
      let isOk = this.checkFileType(file) && this.checkFileSize(file)
      if (!isOk) {
        return false
      }
      let reader = new window.FileReader()
      reader.onload = (e) => {
        this.avatarOption.img = e.target.result
        this.dialog.show = true
        this.dialog.data = this.avatarOption
      }
      reader.readAsDataURL(file)
      return false
    },

    // 保存
    async handleSaveClick() {
      try {
        this.loading = true
        const profile = JSON.parse(JSON.stringify(this.profile))
        Object.keys(profile).forEach((key) => {
          if (profile[key] === '' || profile[key] === null || profile[key] === undefined) {
            delete profile[key]
          }
        })
        await this.$store.dispatch('user/saveProfile', profile)
        this.$message.success('更新成功!')
      } catch (err) {
        err
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-setting {
  .avatar,
  .profile {
    .title {
      font-size: 1.3rem;
    }
    .content {
      padding: 0 1rem;
      margin: 1rem 0;
    }
  }
}
</style>
