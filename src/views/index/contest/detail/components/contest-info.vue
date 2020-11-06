<template>
  <card-layout class="contest-info">
    <template #title>
      {{ contest.title }}
    </template>
    <template #toobar>
      {{ contest.title }}
    </template>
    <div class="contest-description" v-html="contest.description"></div>
  </card-layout>
</template>

<script>
export default {
  name: 'ContestInfo',
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.contest)
  }
}
</script>

<style lang="scss" scoped></style>
