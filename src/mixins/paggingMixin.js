const paggingMixin = {
  data() {
    return {
      search: {}, // 实现点1（非必要，列表查询条件）
      pagging: {
        paging: true,
        total: 0,
        offset: 0,
        limit: parseInt(this.$route.query.size) || 20,
        page: parseInt(this.$route.query.page) || 1
      }
    }
  },
  methods: {
    // 获取列表数据
    async _fetchData() {
      const { grid, fetchData, pagging } = this
      pagging.offset = (pagging.page - 1) * pagging.limit
      grid.loading = true
      let content = []
      let total = 0
      // let number = 1; let size = pagging.limit
      try {
        const data = await fetchData() // 实现点3（必要）
        content = data.results
        total = data.total
        // number = data.number
        // size = data.size
      } catch (error) {
        error
      }
      grid.rows = content
      pagging.total = total
      // pagging.offset = number
      // pagging.limit = size
      grid.loading = false
    },

    // 点击查询
    onQuery() {
      const { pagging, _fetchData } = this
      pagging.offset = 0
      pagging.page = 1
      _fetchData()
      this.handlePushRoute()
    },

    // 页码变化
    onChangeCurrentPage(page) {
      const { pagging, _fetchData } = this
      pagging.page = page
      _fetchData()
      this.handlePushRoute()
    },

    // 页容量变化
    onChangePageSize(limit) {
      const { pagging, _fetchData } = this
      pagging.offset = 0
      pagging.limit = limit
      _fetchData()
      this.handlePushRoute()
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.onQuery()
      this.handlePushRoute()
    },

    // 设置路由
    handlePushRoute() {
      const { pagging, search } = this
      const query = {}
      query.page = pagging.page
      if (pagging.limit !== 20) {
        query.size = pagging.limit
      }
      Object.keys(search).forEach((key) => {
        if (search[key]) {
          query[key] = search[key]
        }
      })
      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}

export default paggingMixin
