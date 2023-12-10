import { createStore } from 'vuex'

export default createStore({
    state: {
        businessType: JSON.parse(sessionStorage.getItem("businessType")) || {},
        business: JSON.parse(sessionStorage.getItem("business")) || {},
    },
    getters:{
        businessType: state => state.businessType,
        business: state => state.business
    },
    mutations: {
        // 首页跳转商家列表
        indexToBusinessList(state, businessType) {
            state.businessType = businessType
            sessionStorage.setItem("businessType", JSON.stringify(businessType))
        },
        //首页跳转商家信息
        indexToBusinessInfo(state, business){
            state.businessType = business
            sessionStorage.setItem("business", JSON.stringify(business))
        }
    },
    actions: {
    },
    modules: {
    }
})
