<template>
  <el-dialog class="avatar-cropper-dialog" title="剪裁图片" :visible.sync="dialog.show" width="760px" :before-close="handleClose">
    <div class="content">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :fixedBox="option.fixedBox" @realTime="realTime"></vueCropper>
        </div>
      </div>
      <div class="toobar"></div>
      <div class="preview">
        <div :style="previewStyle">
          <div :style="preview.div">
            <img :src="preview.url" :style="preview.img" />
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleUploadImage">上 传</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'AvatarCropperDialog',
  components: {
    VueCropper
  },
  data() {
    return {
      preview: {},
      loading: false
    }
  },
  props: {
    dialog: {
      type: Object,
      default: () => ({ show: false, data: null })
    }
  },
  computed: {
    option() {
      const options = {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMove: true, // 图片可拖动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
      Object.assign(options, this.dialog.data)
      return options
    },
    previewStyle() {
      return {
        width: this.preview.w + 'px',
        height: this.preview.h + 'px',
        overflow: 'hidden',
        zoom: 300 / this.preview.w,
        borderRadius: this.preview.w / 2 + 'px'
      }
    }
  },
  methods: {
    // 关闭模态框
    handleClose(done) {
      this.$confirm('放弃本次修改？')
        .then(() => {
          this.dialog.show = false
          done()
        })
        .catch(() => {})
    },

    // 预览
    realTime(data) {
      this.preview = data
    },

    // 上传
    handleUploadImage() {
      this.$refs.cropper.getCropBlob(async (blob) => {
        try {
          this.loading = true
          let form = new window.FormData()
          let file = new window.File([blob], 'avatar.' + this.option.outputType)
          form.append('image', file)
          const data = await this.$api.saveAvatar({
            data: form,
            headers: { 'content-type': 'multipart/form-data' }
          })
          if (data.error === null) {
            this.$message.success('头像上传成功！')
            this.$emit('update-success')
            this.dialog.show = false
          } else {
            this.$message.error(data.error)
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.loading = false
        }
        // this.$http({
        //   method: 'post',
        //   url: 'upload_avatar',
        //   data: form,
        //   headers: {'content-type': 'multipart/form-data'}
        // }).then(res => {
        //   this.loadingUploadBtn = false
        //   this.$success('Successfully set new avatar')
        //   this.uploadModalVisible = false
        //   this.avatarOption.imgSrc = ''
        //   this.$store.dispatch('getProfile')
        // }, () => {
        //   this.loadingUploadBtn = false
        // })
      })
    }
  }
}
</script>

.<style lang="scss" scoped>
.avatar-cropper-dialog {
  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .cropper-content {
      .cropper {
        width: 400px;
        height: 300px;
      }
    }

    .toobar {
      width: 20px;
    }

    .preview {
      width: 300px;
      height: 300px;
      background-color: #888;
    }
  }
}
</style>
