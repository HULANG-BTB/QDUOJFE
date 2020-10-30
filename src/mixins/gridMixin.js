const gridMixin = {
  data() {
    return {
      grid: {
        rows: [],
        height: null,
        loading: false,
        currentRow: null,
        selectedRows: []
      }
    }
  },
  methods: {
    // 获取列表数据
    async _featchData() {
      const { grid, featchData } = this
      let content = []
      grid.loading = true
      try {
        const data = await featchData() // 实现点1（必要，列表数据获取）
        content = data.content
      } catch (error) {
        console.log(error)
      }
      grid.rows = content
      grid.loading = false
    }
  }
}
export default gridMixin
