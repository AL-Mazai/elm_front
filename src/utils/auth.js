import Cookies from 'js-cookie'

const TokenKey = 'user-token'

//获取token
export function getToken() {
  return Cookies.get(TokenKey)
}

//设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token, 1) //有效期设置为1天
}

//清除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
