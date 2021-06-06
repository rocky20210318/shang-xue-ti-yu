import Vue from 'vue'
import VueRouter from 'vue-router'
import AV from 'leancloud-storage'
// import { Toast } from 'vant'

const authFilter = (to, from, next) => {
    if (AV.User.current()) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/stadium-details/:id',
        name: 'StadiumDetails',
        component: () => import('../views/StadiumDetails.vue')
    },
    {
        path: '/map',
        name: 'BaiDuMap',
        component: () => import('../views/BaiDuMap.vue')
    },
    {
        path: '/rule',
        name: 'Rule',
        component: () => import('../views/Rule.vue')
    },
    {
        path: '/stadium-list',
        name: 'StadiumList',
        component: () => import('../views/StadiumList.vue')
    },
    {
        path: '/venue-site',
        name: 'VenueSite',
        component: () => import('../views/VenueSite.vue')
    },
    {
        path: '/order-details/:id',
        name: 'OrderDetails',
        component: () => import('../views/OrderDetails.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/order-list',
        name: 'OrderList',
        component: () => import('../views/OrderList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/credit-card',
        name: 'CreditCard',
        component: () => import('../views/CreditCard.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/message-list',
        name: 'MessageList',
        component: () => import('../views/MessageList.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/Collect',
        name: 'collect',
        component: () => import('../views/Collect.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/password-reset',
        name: 'PasswordReset',
        component: () => import('../views/PasswordReset.vue')
    },
    {
        path: '/social',
        name: 'Social',
        component: () => import('../views/Social.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue')
    },
    {
        path: '/search-stadium',
        name: 'SearchStadium',
        component: () => import('../views/SearchStadium.vue')
    },
    {
        path: '/user-page/:id',
        name: 'UserPage',
        component: () => import('../views/UserPage.vue')
    },
    {
        path: '/watch-list/:id',
        name: 'WatchList',
        component: () => import('../views/WatchList.vue')
    },
    {
        path: '/followed-list/:id',
        name: 'FollowedList',
        component: () => import('../views/FollowedList.vue')
    },
    {
        path: '/details/:type/:id',
        name: 'Details',
        component: () => import('../views/Details.vue')
    },
    {
        path: '/publish-talk',
        name: 'PublishTalk',
        component: () => import('../views/PublishTalk.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/edit-user',
        name: 'EditUser',
        component: () => import('../views/EditUser.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/set',
        name: 'Set',
        component: () => import('../views/Set.vue'),
        beforeEnter: authFilter
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('../views/privacy-agreement/privacy.vue')
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: () => import('../views/privacy-agreement/agreement.vue')
    }
]

const router = new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    // 跳转页面回到顶部
    window.scrollTo(0, 0)
    document.body.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
})
Vue.use(VueRouter)

export default router
