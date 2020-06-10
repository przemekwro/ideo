<template>
    <div id="app" class="mb-5">
        <div class="row d-flex justify-content-end nav" style="width:100%">
            <router-link class="m-2" v-if="accessToken" to="/search"> Search</router-link>
            <router-link class="m-2" v-if="accessToken" to="/"> Home</router-link>
            <a href="#" v-if="accessToken" @click="logout" class="m-2"> Logout {{username}} </a>
        </div>
        <div class="container d-flex justify-content-center">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" appear>
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import state from '@/store'
    export default {
        name: 'App',
        computed:{
            accessToken(){
                return state.getters.getAccessToken
            },
            username(){
                return state.getters.getUsername
            }
        },
        methods: {
            logout() {
                console.log('rozpoczecie wylogowania')
                state.dispatch('logoutUser')
                    .then(() => {
                        this.$router.push({name: 'Login'})
                    })
            }
        }
    }

</script>

<style>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.2";

    canvas {
        height: 250px;
    }

    .content {
        border: 2px solid white;
        border-radius: 20px;
        text-align: center;
        position: relative;
        color: #fff;
        background: rgba(6, 8, 10, 0.8);

    }

    @media only screen and (max-width: 600px) {
        .content {
            margin-top: 10%;
        }
    }

    @media only screen and (min-width: 600px) {
        .content {
            margin-top: 5%;
        }
    }

    button, input {
        background-color: rgba(255, 255, 255, 0.8);
        text-align: center;
        text-decoration: none;
        border: none;
        outline: none;
    }

    button {
        font-size: 20px;
        outline: none;
    }

    input:hover,button:hover {
        background: #fff;
    }

    input:focus,button:focus {
        outline: none;
        background: #fff;
    }


    a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
    }

    a:active {
        color: #ffffff;
    }

    a:hover {
        color: #ffffff;
    }

    .router-link-exact-active {
        text-decoration: underline;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(1, 1, 1, 0.6);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }
</style>
