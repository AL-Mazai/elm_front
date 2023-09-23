import axios from 'axios'
import { ElMessage , ElMessageBox} from 'element-plus'
import router from '@/router'
import store from '../store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: store.state.baseURL,
  // 超时
  timeout: 10000,
})

// request拦截器，发送HTTP请求之前对请求进行处理
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false // 检查请求头是否禁用token

    // 如果存在token并且未禁用token，则在请求头中添加token
    if (getToken() && !isToken) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token，请根据实际情况自行修改
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      // 如果是GET请求且存在params参数
      let url = config.url + '?' // 初始化URL，准备拼接查询参数

      for (const propName of Object.keys(config.params)) {
        // 遍历params对象的属性
        const value = config.params[propName] // 获取属性值
        var part = encodeURIComponent(propName) + '=' // 对属性名进行URL编码

        if (value !== null && typeof value !== 'undefined') {
          // 检查属性值是否不为null或undefined
          if (typeof value === 'object') {
            // 如果属性值是对象
            for (const key of Object.keys(value)) {
              // 遍历对象的属性
              if (value[key] !== null && typeof value[key] !== 'undefined') {
                // 检查对象属性值是否不为null或undefined
                const params = propName + '[' + key + ']' // 构建参数名称，例如：param[key]
                const subPart = encodeURIComponent(params) + '=' // 对参数名称进行URL编码
                url += subPart + encodeURIComponent(value[key]) + '&' // 拼接参数值
              }
            }
          } else {
            // 如果属性值不是对象，直接拼接参数名和值
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }

      url = url.slice(0, -1) // 移除最后一个'&'字符
      config.params = {} // 清空原始的params参数对象
      config.url = url // 将新的URL赋给config.url，包含了拼接的查询参数
    }

    return config // 返回修改后的请求配置
  },
  (error) => {
    console.log(error) // 打印错误信息
    return Promise.reject(error) // 返回一个rejected状态的Promise，将错误传递给后续处理
  }
)

// 响应拦截器，接收到HTTP响应后处理响应数据和异常情况
service.interceptors.response.use((res) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200 // 获取响应数据中的状态码，如果未设置则默认为200

  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default'] // 获取错误消息，优先使用预定义的错误消息

  if (code === 401) {
    // 处理状态码为401的情况，通常表示未授权或会话过期
    ElMessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        // 点击确认按钮后的操作
        localStorage.setItem('logUrl', router.currentRoute.fullPath) // 存储当前页面路由
        router.push({
          path: '/Login?login=1', // 跳转到登录页面
        })
      })
      .catch(() => {
        // 用户点击取消按钮的处理
      })
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。') // 返回一个rejected状态的Promise，传递错误信息
  } else if (code === 500) {
    // 处理状态码为500的情况，通常表示服务器内部错误
    ElMessage({
      message: msg,
      type: 'error',
    })
    return Promise.reject(new Error(msg)) // 返回一个rejected状态的Promise，传递错误信息作为Error对象
  } else if (code !== 200) {
    // 处理其他状态码的情况，通常表示业务逻辑错误
    Notification.error({
      title: msg,
    })
    return Promise.reject('error') // 返回一个rejected状态的Promise，表示发生了业务逻辑错误
  } else {
    // 处理正常情况，状态码为200
    // 把字符串total 转换成 数字 total
    if (res.data.data && res.data.data.total) {
      res.data.data.total = parseInt(res.data.data.total)
    }
    return res.data.data // 返回响应数据中的业务数据部分
  }
})

// 异常处理
// error => {
//     console.log('err' + error); // 打印异常信息
//     let {message} = error; // 获取异常消息
//
//     if (message === 'Network Error') {
//         message = '后端接口连接异常'; // 处理网络错误的消息
//     } else if (message.includes('timeout')) {
//         message = '系统接口请求超时'; // 处理请求超时的消息
//     } else if (message.includes('Request failed with status code')) {
//         message = '系统接口' + message.substr(message.length - 3) + '异常'; // 处理其他异常消息
//     }
//
//     Message({
//         message: message,
//         type: 'error',
//         duration: 3000
//     }); // 显示错误消息

// return Promise.reject(error); // 返回一个rejected状态的Promise，传递异常信息
// });

export default service
