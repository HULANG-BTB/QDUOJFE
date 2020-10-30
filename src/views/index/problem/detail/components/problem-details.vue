<template>
  <card-layout class="problem-details markdown-body">
    <template #title>
      {{ problem.title }}
    </template>
    <el-collapse v-model="currentActive">
      <el-collapse-item name="description">
        <template slot="title"> {{ $t('problem.detail.description') }} </template>
        <span v-html="problem.description"></span>
      </el-collapse-item>
      <el-collapse-item name="input">
        <template slot="title">
          {{ $t('problem.detail.input') }}
          <!-- <span v-if="problem.io_mode.io_mode == 'File IO'">({{ $t('m.ToFile') }}: {{ problem.io_mode.input }})</span> -->
        </template>
        <span v-html="problem.input_description"></span>
      </el-collapse-item>
      <el-collapse-item name="output">
        <template slot="title">
          {{ $t('problem.detail.output') }}
          <!-- <span v-if="problem.io_mode.io_mode == 'File IO'">({{ $t('m.ToFile') }}: {{ problem.io_mode.output }})</span> -->
        </template>
        <span v-html="problem.output_description"></span>
      </el-collapse-item>
      <div class="samples">
        <div class="sample" v-for="(sample, index) in problem.samples" :key="index">
          <el-row :gutter="50">
            <el-col :span="12">
              <el-collapse-item>
                <template slot="title">
                  {{ `${$t('problem.detail.sample.input')} #${index + 1}` }}
                  <i class="el-icon-document-copy" style="margin-left: 10px" v-clipboard:copy="sample.input" v-clipboard:success="handleOnCopy" v-clipboard:error="handleOnError"></i>
                </template>
                <pre>{{ sample.input }}</pre>
              </el-collapse-item>
            </el-col>
            <el-col :span="12">
              <el-collapse-item>
                <template slot="title">
                  {{ `${$t('problem.detail.sample.output')} #${index + 1}` }}
                  <i class="el-icon-document-copy" style="margin-left: 10px" v-clipboard:copy="sample.output" v-clipboard:success="handleOnCopy" v-clipboard:error="handleOnError"></i>
                </template>
                <pre>{{ sample.input }}</pre>
              </el-collapse-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <el-collapse-item v-if="problem.hint" name="hint">
        <template slot="title"> {{ $t('problem.detail.hint') }} </template>
        <span v-html="problem.hint"></span>
      </el-collapse-item>
      <el-collapse-item v-if="problem.source" name="source">
        <template slot="title"> {{ $t('problem.detail.source') }} </template>
        <span v-html="problem.source"></span>
      </el-collapse-item>
    </el-collapse>
  </card-layout>
</template>

<script>
export default {
  name: 'ProblemList',
  data() {
    return {
      currentActive: ['description', 'input', 'output', 'sample', 'hint', 'source']
    }
  },
  props: {
    problem: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 复制成功
    handleOnCopy() {
      this.$message.success('复制成功！')
    },

    // 复制失败
    handleOnError() {
      this.$message.error('复制失败！')
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-details {
  /deep/ {
    .el-collapse {
      border-top: none;
      border-bottom: none;
    }

    .el-collapse-item__wrap,
    .el-collapse-item__header {
      border-bottom: none;
      text-align: left;
    }

    .el-collapse-item__header {
      font-weight: bold;
      font-size: 1rem;
      color: #409eff;
    }
  }

  .sample {
    pre {
      margin: 15px auto;
      padding: 20px 15px;
      border: 1px solid #ddd;
      // background: #fbfbfb url(img/prebg.png) repeat;
      white-space: pre-wrap;
      word-wrap: break-word;
      letter-spacing: 1.5px;
      // font: 13px/25px 'Comic Sans MS', 'courier new';
      line-height: 1rem;
      background-size: 100% 44px;
    }
  }
}
</style>