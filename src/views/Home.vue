<template>
    <div class="container content home">
        <div class="row ">
            <div class="col-lg-7 left  home mb-3">
                <div class="row mt-1 d-flex justify-content-between">
                    <h3 class="mb-3 ml-3 mt-2">Your Cities:</h3>
                </div>
                <div v-if="cities.length==0">
                    <span>No cities. You can observe your city <a :href="'search'">here</a>. </span>
                </div>
                <div id="list_cities" v-if="loaded">
                    <transition-group name="slide-in" :style="{ '--total': cities.length }" appear>
                        <city id="city_list" v-for="(city,i) in cities" :key="i" :style="{'--i': i}" :cityId="city"></city>
                    </transition-group>
                </div>
                <div class="d-flex justify-content-center m-2">
                    <span>
                        &copy; Wrona Przemyslaw
                    </span>
                </div>
            </div>
            <div class="col-lg-5 " id="details">
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <div style=" transitionDelay: 0.1s " :key="cityid">
                        <detail></detail>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import detail from "@/components/details";
    import city from "@/components/city";
    import axios from 'axios';
    import state from '@/store'

    export default {
        name: 'Home',
        data() {
            return {
                cities: [],
                weather: {},
                search: '',
                loaded:false,
            }
        },
        computed: {
            cityid() {
                return state.getters.getActiveCity
            },
        },
        components: {
            'detail': detail,
            'city': city,
        },
        methods: {
            getCity() {
                axios.get('../users.json').then(data => {
                    console.log('asd')
                    let i
                    const username = state.getters.getUsername
                    for(i in data['data']["users"] ) {
                        if(data['data']['users'][i]['username'] == username){
                            this.cities = data['data']['users'][i]['cityList']
                            this.loaded = true
                            state.commit('setActive', this.cities[0])
                        }
                    }
                })
            },
        },
        created() {
            this.getCity()
        }
    }

</script>

<style scoped>

    @media only screen and (min-width: 1000px) {
        #details {
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
        }

        #list_cities {
            max-height: 570px;
            min-height: 570px;
        }
    }

    @media only screen and (max-width: 1000px) {
        #details {
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .home {
            min-height: 600px;
        }
    }

    #details {
        color: #fff;
        background: rgba(0, 72, 87, 0.5);
    }

    #list_cities {
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
    }


    #city > h5:hover {
        text-decoration: underline;
    }

    h3 {
        text-align: left;
    }

    input {
        height: 30px;
        background: rgba(255, 255, 255, 0.8);
        color: black;
        text-align: left;
    }

    /* animacja listy  */
    .slide-in-move {
        transition: opacity .5s linear, transform .5s ease-in-out;
    }

    .slide-in-leave-active {
        transition: opacity 0.4s linear, transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4);
        transition-delay: calc( 0.15s * (var(--total) - var(--i)));
    }

    .slide-in-enter-active {
        transition: opacity 0.5s linear, transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
        transition-delay: calc( 0.15s * var(--i));
    }

    .slide-in-enter, .slide-in-leave-to {
        opacity: 0;
    }

    .slide-in-enter {
        transform: translateX(-1em);
    }

    .slide-in-leave-to {
        transform: translateX(1em);
    }

</style>
