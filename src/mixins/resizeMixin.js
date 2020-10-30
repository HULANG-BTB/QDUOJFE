import debounce from 'lodash/debounce'

const resizeMixin = {
  activated() {
    const { resize } = this
    resize() // 实现点（必要，布局逻辑）
  },
  mounted() {
    const { resize } = this
    resize()
    const _resize = debounce(resize, 100)
    window.addEventListener('resize', _resize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', _resize)
    })
  }
}

export default resizeMixin
