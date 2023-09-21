import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import("../views/Index")
    },
    {
        path: "/businessList",
        name: "BusinessList",
        component: () => import("../views/BusinessList")
    },
    {
        path: "/businessInfo",
        name: "BusinessInfo",
        component: () => import("../views/BusinessInfo")
    },
    {
        path: "/order",
        name: "Order",
        component: () => import("../views/Order")
    },
    {
        path: "/orderList",
        name: "OrderList",
        component: () => import("../views/OrderList")
    },
    {
        path: "/payment",
        name: "Payment",
        component: () => import("../views/Payment")
    },
    {
        path: "/userInfo",
        name: "UserInfo",
        component: () => import("../views/UserInfo")
    },
    {
        path: "/discover",
        name: "Discover",
        component: () => import("../views/Discover")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register")
    },
    {
        path: "/address",
        name: "Address",
        component: () => import("../views/Address")
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
