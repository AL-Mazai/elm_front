import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import("../views/Index"),
    },
    {
        path: "/businessList",
        name: "BusinessList",
        component: () => import("../views/BusinessList"),
    },
    {
        path: "/businessInfo",
        name: "BusinessInfo",
        component: () => import("../views/BusinessInfo"),
    },
    {
        path: "/order",
        name: "Order",
        component: () => import("../views/Order")
    },
    {
        path: "/orderList",
        name: "OrderList",
        component: () => import("../views/OrderList"),
        meta:{
            isLogin: true
        }
    },
    {
        path: "/payment",
        name: "Payment",
        component: () => import("../views/Payment"),
        meta:{
            isLogin: true
        }
    },
    {
        path: "/userInfo",
        name: "UserInfo",
        component: () => import("../views/UserInfo"),
        // meta: {
        //     isLogin: true
        // }
    },
    {
        path: "/address",
        name: "Address",
        component: () => import("../views/Address"),
        meta: {
            isLogin: true
        }
    },
    {
        path: "/discover",
        name: "Discover",
        component: () => import("../views/Discover")
    },
    {
        path: "/money",
        name: "Money",
        component: () => import("../views/Money"),
        meta: {
            isLogin: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register"),
    },

];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
