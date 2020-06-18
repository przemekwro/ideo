import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Asd from '../views/ASD.vue'
import state from '../store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            requiresAuth: false
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const openRoutes=['Login','']



router.beforeEach((to, from, next) => {
    if (to.name != 'Login' && state.getters.getUsername=='') next({ name: 'Login' })
    else if (to.name == 'Login' && state.getters.getUsername!='') next({ name: 'Home' })
    else next()
})




export default router
