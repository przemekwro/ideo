import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
        // refreshing the page
        refreshToken: localStorage.getItem('refresh_token') || null,
        username:localStorage.getItem('username') || '',
        activeCity:0,
    },
    mutations: {
        updateLocalStorage (state, { access, refresh , username}) {
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('username', username)
            state.accessToken = access
            state.refreshToken = refresh
            state.username = username

        },
        destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
        },
        setActive(state, cityId){
            state.activeCity = cityId
        }
    },
    getters: {
        checkAccessToken(state){
            if(state.accessToken === null )
                return false
            else
                return true
        },
        getAccessToken(state){
            return state.accessToken
        },
        loggedIn (state) {
            return state.accessToken != null
        },
        getUsername(state){
            return state.username
        },
        getActiveCity(state){
            return state.activeCity
        }
    },
    actions: {
        loginUser (context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/api/token/', {
                    username: credentials.username,
                    password: credentials.password
                })
                    .then(response => {
                        context.commit('updateLocalStorage', { access: response.data.access, refresh: response.data.refresh, username:credentials.username }) // store the access and refresh token in localstorage
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        logoutUser (context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve) => {
                    axios.post('http://127.0.0.1:8000/api/token/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('refresh_token')
                            localStorage.removeItem('username')
                            context.commit('destroyToken',)
                        })
                        .catch(err => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('refresh_token')
                            localStorage.removeItem('username')
                            context.commit('destroyToken')
                            resolve(err)
                        })
                })
            }
        },
    },
    modules: {},
})
