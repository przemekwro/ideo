import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
        // refreshing the page
        refreshToken: localStorage.getItem('refresh_token') || null,
        APIData: '', // received data from the backend API is stored here.
        isLoggedIn: false,
    },
    mutations: {
        updateLocalStorage (state, { access, refresh }) {
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            state.accessToken = access
            state.refreshToken = refresh
            state.isLoggedIn=true
        },
        destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
        }
    },
    getters: {
        checkAccessToken(state){
            if(state.accessToken === null )
                return false
            else
                return true
        }

    },
    actions: {
        loginUser (context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/login2/', {
                    username: credentials.username,
                    password: credentials.password
                })
                    .then(response => {
                        context.commit('updateLocalStorage', { access: response.data.access, refresh: response.data.refresh }) // store the access and refresh token in localstorage
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        logoutUser (context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('/api/token/logout/')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('refresh_token')
                            context.commit('destroyToken')
                        })
                        .catch(err => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('refresh_token')
                            context.commit('destroyToken')
                            resolve(err)
                        })
                })
            }
        },
    },
    modules: {},
})
