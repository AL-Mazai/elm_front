import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import store from '../store'
import {getToken} from '@/utils/auth'
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
    },err => {
        console.log(err)
        return Promise.reject(err)
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

export default service
