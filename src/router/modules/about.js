/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/about',
    component: IndexLayout,
    children: [
      {
        path: 'judger',
        component: Components['about-judger'],
        name: 'Judger',
        meta: { title: '关于' }
      },
      {
        path: 'faq',
        component: Components['about-faq'],
        name: 'FAQ',
        meta: { title: '关于' }
      }
    ]
  }
]
