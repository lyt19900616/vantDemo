/**
 * @author ♠K
 * @date 2020/8/28
 * @des 网络请求接口
 */

import http from './http'

// 获取诗的数据 get
export function getList (param) {
  return http({
    url: '/list/getList',
    method: 'GET',
    progressState: true,
    params: param
  })
}
// 用户登录 post
export function login (param) {
  return http({
    url: '/user/login',
    method: 'POST',
    progressState: true,
    data: param
  })
}
