const localStorage = window.localStorage

export default {
  name: 'storage',
  /**
   * 获取localStorage
   * @param {String} key
   * @param {Boolean} isJson
   * @returns {String | null}
   */
  get(key, isJson = false) {
    return isJson ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)
  },

  /**
   * 设置localStorage
   * @param {String} key
   * @param {String | Number} val
   * @param {Object} attributes
   * @returns {Boolean | undefined}
   */
  set(key, val, isJson = false) {
    return localStorage.setItem(key, isJson ? JSON.stringify(val) : val)
  },

  /**
   * 移除localStorage
   * @param {String} key
   * @returns {Boolean | undefined}
   */
  remove(key) {
    return localStorage.removeItem(key)
  },

  clear() {
    return localStorage.clear()
  }
}
