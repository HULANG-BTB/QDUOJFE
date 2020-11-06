/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/status',
    component: IndexLayout,
    meta: {
      title: 'status',
      icon: 'el-icon-s-shop'
    },
    sort: 3,
    children: [
      {
        path: '',
        component: Components['status'],
        name: 'Status',
        meta: { title: '状态' },
        hidden: true
      }
    ]
  }
]
