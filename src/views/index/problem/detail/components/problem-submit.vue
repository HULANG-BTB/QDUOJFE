<template>
  <card-layout class="problem-submit">
    <editor :languages="languages"></editor>
  </card-layout>
</template>

<script>
import Editor from '@/components/editor'
export default {
  name: 'ProblemSubmit',
  components: {
    Editor
  },
  props: {
    problem: {
      type: Object,
      required: true
    }
  },
  computed: {
    languages() {
      return this.problem?.languages ?? []
    }
  }
}
</script>
