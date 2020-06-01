<template>
    <div id="app" class="mb-5">
        <div class="row d-flex justify-content-end nav" style="width:100%">
            <router-link class="m-2" v-if="accessToken!=null" to="/"> Login</router-link>
            <router-link class="m-2" v-if="accessToken==null" to="/search"> Search</router-link>
            <router-link class="m-2" v-if="accessToken==null" to="/home"> Home</router-link>
            <a href="#" v-if="accessToken==null" @click="logout" class="m-2"> Logout </a>
        </div>
        <div class="container d-flex justify-content-center">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import state from '@/store'
    import {mapState} from 'vuex'
    export default {
        name: 'App',
        computed:mapState(['accessToken'])
        ,
        methods: {
            logout() {
                state.dispatch('logoutUser')
                    .then(() => {
                        this.$router.push({name: 'home'})
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

    button:hover {
        background: #fff;
    }

    button:focus {
        outline: none;
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
