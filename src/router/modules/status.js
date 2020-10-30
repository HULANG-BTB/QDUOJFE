/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/status',
    component: IndexLayout,
    children: [
      {
        path: '',
        component: Components['status'],
        name: 'Status',
        meta: { title: '状态' }
      }
    ]
  }
]
