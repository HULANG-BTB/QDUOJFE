import defaultSettings from '@/config/system.js'

const title = defaultSettings.title || ''

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
