<template>
  <pre class="highlight-code" v-highlight="code"><code :class="language" :style="styleObject"></code></pre>
</template>

<script>
import cpp from 'highlight.js/lib/languages/cpp'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import 'highlight.js/styles/atom-one-light.css'

import hljs from 'highlight.js'
export default {
  name: 'HighlightCode',
  data() {
    return {
      styleObject: {
        'border-left': '2px solid green'
      }
    }
  },
  created() {
    hljs.registerLanguage('cpp', cpp)
    hljs.registerLanguage('java', java)
    hljs.registerLanguage('python', python)
  },
  directives: {
    highlight: {
      deep: true,
      bind: function(el, binding) {
        // on first bind, highlight all targets
        Array.from(el.querySelectorAll('code')).forEach((target) => {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          if (binding.value) {
            target.textContent = binding.value
          }
          hljs.highlightBlock(target)
        })
      },
      componentUpdated: function(el, binding) {
        // after an update, re-fill the content and then highlight
        Array.from(el.querySelectorAll('code')).forEach((target) => {
          if (binding.value) {
            target.textContent = binding.value
          }
          hljs.highlightBlock(target)
        })
      }
    }
  },
  props: {
    language: {
      type: String
    },
    code: {
      required: true,
      type: String
    },
    borderColor: {
      type: String,
      default: 'green'
    },
    watch: {
      borderColor(newVal) {
        this.styleObject['border-left'] = '2.5px solid ' + newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.highlight-code {
  text-align: left;
  margin: 0;
}
</style>
