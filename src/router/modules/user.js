/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/user',
    component: IndexLayout,
    meta: {
      title: 'user',
      icon: 'el-icon-info'
    },
    sort: 999,
    hidden: true,
    children: [
      {
        path: 'home',
        component: Components['user-home'],
        name: 'UserHome',
        meta: { title: 'UserHome' },
        hidden: true
      },
      {
        path: 'setting',
        component: Components['user-setting'],
        name: 'UserSetting',
        meta: { title: 'UserSetting' },
        hidden: true
      }
    ]
  }
]
