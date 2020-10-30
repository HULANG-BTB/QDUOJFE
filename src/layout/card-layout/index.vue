<template>
  <el-card class="card-layout">
    <template #header v-if="$slots.title || $slots.toobar">
      <div class="box">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="toobar">
          <slot name="toobar"></slot>
        </div>
        <div style="clear: both"></div>
      </div>
    </template>
    <slot></slot>
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
  .box {
    .title {
      float: left;
      text-align: left;
    }

    .toobar {
      float: right;
    }
  }

  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
