const paggingMixin = {
  data() {
    return {
      search: {}, // 实现点1（非必要，列表查询条件）
      pagging: {
        paging: true,
        total: 0,
        offset: 0,
        limit: 20,
        page: parseInt(this.$route.query.page) || 1
      }
    }
  },
  methods: {
    // 获取列表数据
    async _featchData() {
      this.handlePushRoute()
      const { grid, featchData, pagging } = this
      pagging.offset = (pagging.page - 1) * pagging.limit
      grid.loading = true
      let content = []
      let total = 0
      // let number = 1; let size = pagging.limit
      try {
        const data = await featchData() // 实现点3（必要）
        content = data.results
        total = data.total
        // number = data.number
        // size = data.size
      } catch (error) {
        console.log(error)
      }
      grid.rows = content
      pagging.total = total
      // pagging.offset = number
      // pagging.limit = size
      grid.loading = false
    },

    // 点击查询
    onQuery() {
      const { pagging, _featchData } = this
      pagging.offset = 0
      pagging.page = 1
      _featchData()
    },

    // 页码变化
    onChangeCurrentPage(page) {
      const { pagging, _featchData } = this
      pagging.page = page
      _featchData()
    },

    // 页容量变化
    onChangePageSize(limit) {
      const { pagging, _featchData } = this
      pagging.offset = 0
      pagging.limit = limit
      _featchData()
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.onQuery()
    },

    // 设置路由
    handlePushRoute() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.search,
          page: this.pagging.page
        }
      })
    }
  }
}

export default paggingMixin
