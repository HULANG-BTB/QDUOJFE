import { getPageTitle } from '@/utils/view'
import ProgressBar from '@/utils/progress'

const beforeEach = (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  ProgressBar.start()
  next()
}

const afterEach = () => {
  ProgressBar.done()
}

export default {
  beforeEach,
  afterEach
}
