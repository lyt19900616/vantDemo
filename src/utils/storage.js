/**
 * @author ♠K
 * @date 2020/9/4
 * @des 数据存取
*/
export default {
  // sessionStorage存取
  getParamS (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  setParamS (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  removeParamS (key) {
    sessionStorage.removeItem(key)
  },
  clearParamS () {
    sessionStorage.clear()
  },
  // localStorage 存取
  getParamL (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setParamL (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeParamL (key) {
    localStorage.removeItem(key)
  },
  clearParamL () {
    localStorage.clear()
  }
}
