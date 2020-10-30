/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/',
    component: IndexLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Components['home'],
        name: 'Home',
        meta: { title: '首页' }
      }
    ]
  }
]
