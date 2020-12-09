/**
 * @author ♠K
 * @date 2020/8/28
 * @des 网络请求基础类
 */

import axios from 'axios'
import { Toast } from 'vant'
import storage from '../utils/storage'

/**
 * 创建 axios 实例
 */

const requestConfig = {
  baseURL: '',
  timeout: 18000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}
const service = axios.create(requestConfig)

/**
 * request 拦截器
 */
service.interceptors.request.use(config => {
  if (config.progressState) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: requestConfig.timeout,
      loadingType: 'spinner'
    })
    // 蓝信设备序列号
    config.headers['x-device-sn'] = '-1'
    // app编码(注册到upms应用管理的app_code)
    config.headers['x-app-code'] = storage.getParamL('appCode')
    if (storage.getParamL('userInfo')) {
      // 用户ID
      config.headers['x-user-id'] = storage.getParamL('userInfo').id
      // 登录名
      config.headers['x-user-name'] = encodeURI(storage.getParamL('userInfo').userName)
      // 真实姓名
      config.headers['x-user-real-name'] = encodeURI(storage.getParamL('userInfo').realName)
      // 应用id
      config.headers['x-app-id'] = storage.getParamL('userInfo').appId
      // app 名称
      config.headers['x-app-name'] = encodeURI(storage.getParamL('userInfo').appName)
      // 部门 id
      config.headers['x-depart-id'] = storage.getParamL('userInfo').departId
      // 部门编码
      config.headers['x-depart-code'] = storage.getParamL('userInfo').departCode
      // 部门名称
      config.headers['x-depart-name'] = encodeURI(storage.getParamL('userInfo').departName)
      // 请求的服务名称
      config.headers['x-service-name'] = encodeURI(storage.getParamL('InterfaceName'))
      // 用户身份证号
      config.headers['x-user-sfzh'] = storage.getParamL('userInfo').userIdNumber
      // 请求来源
      config.headers['x-request-from'] = 'mobileApp'
      // 证书
      config.headers['x-request-certificateNo'] = storage.getParamL('userInfo').certificateNo
      config.headers['certificateno'] = storage.getParamL('userInfo').certificateNo
    } else {
      // 用户身份证号
      config.headers['x-user-sfzh'] = '220183198710271811'
    }
    // 请求的目标方法
    config.headers['x-target-method'] = storage.getParamL('x-target-method')
  }
  if (config.uploadFile) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }

  return config
}, error => {
  Toast.clear()
  return Promise.reject(error)
})

/**
 * response 拦截器
 */
service.interceptors.response.use(
  response => {
    Toast.clear()
    return response.data
  },
  error => {
    Toast.clear()
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
      Toast(error.message)
    } else if (error.request) {
      if (error.request.readyState === 4) {
        error.message = '服务器繁忙,请稍候重试'
      } else {
      }
      Toast(error.message)
    } else {
      Toast('网络错误')
    }
    return Promise.reject(error)
  }
)

export default service
