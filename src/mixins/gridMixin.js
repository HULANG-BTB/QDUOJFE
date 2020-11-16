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
    async _fetchData() {
      const { grid, fetchData } = this
      let content = []
      grid.loading = true
      try {
        const data = await fetchData() // 实现点1（必要，列表数据获取）
        content = data.results
      } catch (error) {
        console.log(error)
      }
      grid.rows = content
      grid.loading = false
    }
  }
}
export default gridMixin
