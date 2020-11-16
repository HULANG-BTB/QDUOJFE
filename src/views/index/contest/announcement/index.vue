<template>
  <div class="contest-announcements">
    <el-row :gutter="18">
      <el-col :span="20">
        <component v-if="contest.id" :is="currentComponent" :announcement="announcement" :contest="contest" @show-detail="handleShowDetial" @back="handleShowList"></component>
      </el-col>
      <el-col :span="4">
        <contest-nav v-if="contest.id" :contest="contest"></contest-nav>
      </el-col>
    </el-row>
  </div>
</template>

<script scoped>
import ContestNav from '../nav/'
const syncComponents = {
  list: () => import('./list'),
  detail: () => import('./detail')
}
export default {
  name: 'ContestAnnouncements',
  components: {
    ContestNav
  },
  data() {
    return {
      view: 'list',
      announcement: {}
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
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
