<template>
  <el-card class="card-layout">
    <template #header v-if="$slots.title || $slots.toobar">
      <div class="card-layout-header">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="toobar">
          <slot name="toobar"></slot>
        </div>
        <div style="clear: both"></div>
      </div>
    </template>
    <div class="card-layout-body">
      <slot></slot>
    </div>
    <div v-if="$slots.pagination" class="pagination">
      <slot name="pagination"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'card-layout'
}
</script>

<style lang="scss" scoped>
.card-layout {
  /deep/ .el-card__header {
    padding: 0.5rem 1rem;
  }
  .card-layout-header {
    .title {
      float: left;
      text-align: left;
      line-height: 28px;
    }

    .toobar {
      line-height: 28px;
      float: right;
    }
  }

  .card-layout-body {
    text-align: left;
  }

  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
