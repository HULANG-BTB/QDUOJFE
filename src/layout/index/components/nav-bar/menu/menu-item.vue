<template>
  <fragment>
    <el-submenu v-if="hasManyShowingChild(item.children, item)" ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        {{ item.meta.title }}
      </template>
      <menu-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
    <el-menu-item v-else-if="onlyOneChild.meta" route :index="resolvePath(onlyOneChild.path)">
      <template #title>
        <i v-if="onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon"></i>
        {{ onlyOneChild.meta.title }}
      </template>
    </el-menu-item>
  </fragment>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name: 'MenuItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    // 具有一个显示的子菜单
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 临时设置
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 如果只有一个子路由 默认显示子路由
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果没有子路由可以显示，则显示当前路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    // 有多个显示的子路由
    hasManyShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          return true
        }
      })
      if (showingChildren.length > 1) {
        // 有多个子路由
        return true
      } else if (showingChildren.length === 1) {
        // 只有一个子路由
        this.onlyOneChild = showingChildren[0]
      } else {
        // 没有子路由
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
