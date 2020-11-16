/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/',
    component: IndexLayout,
    redirect: '/home',
    sort: 0,
    children: [
      {
        path: 'home',
        component: Components['home'],
        name: 'Home',
        meta: { title: 'home', icon: 'el-icon-s-home' }
      }
    ]
  }
]
