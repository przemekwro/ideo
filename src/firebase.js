import {initilizeApp} from 'firebase'
import Vue from "vue";
import VueFire from "vuefire";

Vue.use(VueFire)

const app = initilizeApp({
        apiKey: "AIzaSyDBIqmb6_08i-Aew4PGHVElV8ny-aOjv_A",
        authDomain: "aaaa-b4f44.firebaseapp.com",
        databaseURL: "https://aaaa-b4f44.firebaseio.com",
        projectId: "aaaa-b4f44",
        storageBucket: "aaaa-b4f44.appspot.com",
        messagingSenderId: "231878687496",
        appId: "1:231878687496:web:e225e3692d4d8083890abd"
    })
