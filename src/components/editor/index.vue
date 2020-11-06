<template>
  <div class="editor">
    <div class="toolbar">
      <div class="left">
        {{ $t('problem.submit.language') }} :
        <el-select :value="language" style="margin-left: 10px" @change="onLanguageChange">
          <el-option v-for="(language, index) in languages" :key="index" :label="language" :value="language"></el-option>
        </el-select>
        <el-popconfirm placement="right" :title="$t('problem.submit.reset')" @onConfirm="onResetCode">
          <el-button slot="reference" icon="el-icon-refresh" style="margin-left: 10px"></el-button>
        </el-popconfirm>
      </div>
      <div class="right">
        {{ $t('problem.submit.theme') }} :
        <el-select :value="theme" style="margin-left: 10px" @change="onThemeChange">
          <el-option v-for="(theme, index) in themes" :key="index" :label="theme.label" :value="theme.value"></el-option>
        </el-select>
      </div>
      <div style="clear: both;"></div>
    </div>
    <codemirror :value="value" :options="options" @change="onEditorCodeChange" ref="myEditor"> </codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'

// theme
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material.css'

// mode
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'

// active-line.js
import 'codemirror/addon/selection/active-line.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/indent-fold.js'

export default {
  name: 'Editor',
  components: {
    codemirror
  },
  data() {
    return {
      options: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-csrc',
        theme: 'solarized',
        lineNumbers: true,
        line: true,
        // 代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        lineWrapping: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
      },
      mode: {
        'C++': 'text/x-csrc'
      },
      themes: [
        { label: 'monokai', value: 'monokai' },
        { label: 'solarized', value: 'solarized' },
        { label: 'material', value: 'material' }
      ]
    }
  },
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    languages: {
      type: Array,
      required: true
    },
    language: {
      type: String,
      default: () => 'C++'
    },
    theme: {
      type: String,
      default: () => 'solarized'
    }
  },
  methods: {
    onEditorCodeChange(newCode) {
      this.$emit('input', newCode)
    },
    onLanguageChange(language) {
      this.editor.setOption('mode', this.mode[language])
      this.$emit('language-change', language)
    },
    onThemeChange(newTheme) {
      this.editor.setOption('theme', newTheme)
      this.$emit('theme-change', newTheme)
    },
    onResetCode() {
      this.$emit('input', '')
      this.$emit('reset-code')
    }
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  text-align: left;

  .toolbar {
    margin-bottom: 20px;

    .left {
      float: left;
    }

    .right {
      float: right;
    }
  }
}
</style>
