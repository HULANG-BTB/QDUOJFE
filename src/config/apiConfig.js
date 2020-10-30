import apiConfig from '@/api'

const interceptors = {}

interceptors.request = (config) => {
  // console.log('request', config)
  return config
}

interceptors.requestError = (error) => {
  // console.log('reqError', error)
  return error
}

interceptors.response = (response) => {
  return response.data
}

interceptors.responseError = (error) => {
  // console.log('responseError', error)
  return error
}

export default {
  api: apiConfig,
  interceptors,
  alias: '$api',
  config: {
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken'
  }
}
