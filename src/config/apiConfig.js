import apiConfig from '@/api'
import ProgressBar from '@/utils/progress'
import Vue from 'vue'
import store from '@/store'

const interceptors = {}

interceptors.request = (config) => {
  ProgressBar.start()
  return config
}

interceptors.requestError = (error) => {
  ProgressBar.done()
  return error
}

interceptors.response = (response) => {
  ProgressBar.done()
  if (response.data.error !== null) {
    if (response.data.data === 'Please login first') {
      store.dispatch('user/showLoginDialog')
    } else {
      Vue.prototype.$message.error(response.data.data)
      throw new Error(response.data.data)
    }
  }
  return response.data
}

interceptors.responseError = (error) => {
  ProgressBar.done()
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
