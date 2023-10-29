import {createRouter, createWebHistory} from 'vue-router'
import {getExpire} from "@/utils/localStorage";
import {getToken} from "@/utils/auth";
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: (() => import('../views/Index')),
        },
        {
            path: '/BusinessList',
            name: 'BusinessList',
            component: (() => import('../views/BusinessList')),
        },
        {
            path: '/BusinessInfo',
            name: 'BusinessInfo',
            component: (() => import('../views/BusinessInfo')),
        },
        {
            path: '/order',
            name: 'Order',
            component: (() => import('../views/Order')),
        },
        {
            path: '/orderList',
            name: 'OrderList',
            component: () => import('../views/OrderList'),
            meta: {
                isLogin: true,
            },
        },
        {
            path: '/payment',
            name: 'Payment',
            component: (() => import('../views/Payment')),
            meta: {
                isLogin: true,
            },
        },
        {
            path: '/userInfo',
            name: 'UserInfo',
            component: (() => import('../views/UserInfo')),
            // meta: {
            //     isLogin: true
            // }
        },
        {
            path: '/address',
            name: 'Address',
            component: (() => import('../views/Address')),
            meta: {
                isLogin: true,
            },
        },
        {
            path: '/discover',
            name: 'Discover',
            component: (() => import('../views/Discover')),
        },
        {
            path: '/money',
            name: 'Money',
            component: (() => import('../views/Money')),
            meta: {
                isLogin: true,
            },
        },
        {
            path: '/login',
            name: 'Login',
            component: (() => import('../views/Login')),
        },
        {
            path: '/register',
            name: 'Register',
            component: (() => import('../views/Register')),
        },
    ]

})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.isLogin)) {
        // 判断该路由是否需要登录权限
        if (getExpire('userInfo') && getToken()) {
            // 判断当前用户的登录信息loginInfo是否存在
            next()
        } else {
            ElMessage({
                message: '请先登录',
                type: 'warning',
                duration: 1000
            })
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
})

export default router
