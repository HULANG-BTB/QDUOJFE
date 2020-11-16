/**
 * 注意，请不要对这个文件有任何修改操作
 */

let asyncRoutes = []

const modulesFiles = require.context('.', true, /\.js$/)

modulesFiles.keys().forEach((key) => {
  if (key !== './index.js') {
    asyncRoutes = asyncRoutes.concat(modulesFiles(key).default)
  }
})

asyncRoutes = asyncRoutes.sort((x, y) => {
  if (x.sort === undefined && y.sort) {
    return 1
  } else if (x.sort && y.sort === undefined) {
    return -1
  } else if (!x.sort && y.sort === undefined) {
    return 0
  } else if (x.sort < y.sort) {
    return -1
  } else if (x.sort === y.sort) {
    return 0
  } else {
    return 1
  }
})

/**
 * 最后加入 404 以免前期匹配到404 不再继续
 */
asyncRoutes = asyncRoutes.concat([{ path: '*', redirect: '/404', hidden: true }])

export default asyncRoutes
