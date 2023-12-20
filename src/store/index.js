import { createStore } from 'vuex'

export default createStore({
    state: {
        businessType: JSON.parse(sessionStorage.getItem("businessType")) || {},
        business: JSON.parse(sessionStorage.getItem("business")) || {},
        searchBusiness: JSON.parse(sessionStorage.getItem("searchBusiness")) || {},
        foodList: JSON.parse(sessionStorage.getItem("foodList")) || {},
        totalMoney: JSON.parse(sessionStorage.getItem("totalMoney")) || {},
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
        },
        //商家信息跳转确认订单
        businessInfoToOrder(state, foodListAndTotalMoney){
            state.foodList = foodListAndTotalMoney.foodList
            state.totalMoney = foodListAndTotalMoney.totalMoney
            sessionStorage.setItem("foodList", JSON.stringify(foodListAndTotalMoney.foodList))
            sessionStorage.setItem("totalMoney", JSON.stringify(foodListAndTotalMoney.totalMoney))
        },
        //首页跳转搜索到的商家信息页面
        indexToSearchBusiness(state, searchBusiness){
            state.searchBusiness = searchBusiness
            sessionStorage.setItem("searchBusiness", JSON.stringify(searchBusiness))
        }
    },
    actions: {
    },
    modules: {
    }
})
