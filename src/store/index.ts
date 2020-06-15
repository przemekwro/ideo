import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username:localStorage.getItem('username') || '',
        activeCity:0,
    },
    mutations: {

        setActive(state, cityId){
            state.activeCity = cityId
        },

        logIn(state,{username}){
            state.username = username
            localStorage.setItem('username', username)
        },

        logoutUser(state){
            state.username = ''
        }

    },
    getters: {
        getUsername(state){
            return state.username
        },

        getActiveCity(state){
            return state.activeCity
        },
    },
    actions: {
        login(context, credentials){
            context.commit('logIn', {
                username: credentials.username,
            })
        },

        loginUser (context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/api/token/', {
                    username: credentials.username,
                    password: credentials.password
                })
                    .then(response => {
                        context.commit('updateLocalStorage', {
                            access: response.data.access,
                            refresh: response.data.refresh,
                            username:credentials.username
                        })
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        logoutUser2(context){
            context.commit('logoutUser')
            localStorage.removeItem('username')
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
