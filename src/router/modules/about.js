/* Layout */
import IndexLayout from '@/layout/index/index'
import Components from '@/views/index'

export default [
  {
    path: '/about',
    component: IndexLayout,
    meta: {
      title: 'about.about',
      icon: 'el-icon-info'
    },
    sort: 5,
    children: [
      {
        path: 'judger',
        component: Components['about-judger'],
        name: 'Judger',
        meta: { title: 'about.judger' }
      },
      {
        path: 'faq',
        component: Components['about-faq'],
        name: 'FAQ',
        meta: { title: 'about.faq' }
      }
    ]
  }
]
