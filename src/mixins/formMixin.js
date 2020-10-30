const formMixin = {
  data() {
    return {
      formData: {},
      loading: false,
      rules: {} // 实现点1 验证规则
    }
  },
  methods: {
    // 保存前校验
    async validate() {
      const { validateBeforeSave } = this
      await this.$refs.form.validate()
      return validateBeforeSave?.() || Promise.resolve() // 实现点5（非必要）
    },
    // 保存操作
    async onSave() {
      const { validate, saveData } = this
      try {
        await validate()
        this.loading = true
        await saveData?.() // 实现点 保存数据操作
        this.$emit('save-success')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}

export default formMixin
