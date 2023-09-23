import request from '@/utils/request'

// 登录
export function userLogin(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    headers: {
      isToken: false,
    },
    data: {
      username: username,
      password: password,
    },
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

// 获取用户信息
export function userInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}
