import request from '@/utils/request'

//注册
export function userRegister(user){
  return request({
    url: '/user/register',
    method: 'post',
    headers:{
      isToken: false
    },
    data: user
  })
}

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

//修改用户信息
export function updateUserInfo(user){
  return request({
    url: '/user/updateUserInfo',
    method: 'put',
    data: user
  })
}
