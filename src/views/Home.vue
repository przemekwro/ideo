<template>
    <div class="container content home">
        <div class="row ">
            <div class="col-lg-7 left  home mb-3">
                <div class="row mt-1 d-flex justify-content-between">
                    <h3 class="mb-3 ml-3 mt-2">Your Cities:</h3>
                </div>
                <div id="list_cities">
                    <transition-group
                            name="slide-in" mode="in-out" appear>
                        <div id="cities_list" style=" transitionDelay: 1s " v-for="(city) in cities" :key="city.cityId">
                            <city  :search="search" :cityId="city['cityId']"></city>
                        </div>
                    </transition-group>
                </div>
                <div class="d-flex justify-content-center m-2">
                    <span>
                        &copy; Wrona Przemyslaw {{cityid}}
                    </span>
                </div>
            </div>
            <div class="col-lg-5 " id="details">
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <div style=" transitionDelay: 1s " :key="cityid">
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
    import sample from '../assets/sample.json'

    export default {
        name: 'Home',
        data() {
            return {
                cities: {},
                weather: {},
                search: '',
                delay: "0.7s",
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
                axios.get('http://127.0.0.1:8000/city/?cityOwner=' + state.getters.getUsername).then(data => {
                    if (state.getters.getActiveCity == 0) state.commit('setActive', data['data'][0]['cityId'])
                    this.cities = data['data']
                })
            },
        },
        created() {
            this.getCity()
        }
    }

</script>

<style scoped>


    .slide-in-move {
         transition: opacity .5s linear, transform .5s ease-in-out;
     }

    .slide-in-leave-active {
         transition: opacity .4s linear, transform .4s cubic-bezier(.5,0,.7,.4);
         transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
     }

    .slide-in-enter-active {
         transition: opacity .5s linear, transform .5s cubic-bezier(.2,.5,.1,1);
         transition-delay: calc( 0.1s * var(--i) );
     }

    .slide-in-enter,
    .slide-in-leave-to {
         opacity: 0;
     }

    .slide-in-enter { transform: translateX(-1em); }
    .slide-in-leave-to { transform: translateX(1em); }




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
</style>
