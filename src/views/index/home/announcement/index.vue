<template>
  <div class="announcements">
    <component :is="currentComponent" :announcement="announcement" @show-detail="handleShowDetial" @back="handleShowList"></component>
  </div>
</template>

<script scoped>
const syncComponents = {
  list: () => import('./list'),
  detail: () => import('./detail')
}
export default {
  name: 'Announcements',
  data() {
    return {
      view: 'list',
      announcement: {}
    }
  },
  computed: {
    currentComponent() {
      return syncComponents[this.view]
    }
  },
  methods: {
    handleShowDetial(row) {
      this.announcement = row
      this.view = 'detail'
    },
    handleShowList() {
      this.view = 'list'
    }
  }
}
</script>
