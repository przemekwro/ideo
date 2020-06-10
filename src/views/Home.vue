<template>
    <div class="container content home">
        <div class="row ">
            <div class="col-lg-7 left  home mb-3">
                <h3 class="mb-3 mt-2">Your Cities:</h3>
                <div id="list_cities">
                    <div v-if="!cities.length"> No item add city <router-link to="/search">here</router-link>.</div>
                    <div id="cities_list" v-for="(city) in cities" :key="city.cityId">
                        <city :cityId="city['cityId']"></city>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-2">
                    <span>
                        &copy; Wrona Przemyslaw
                    </span>
                </div>
            </div>
            <div class="col-lg-5 " id="details">
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                    <div :key="cityid">
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
                cities: {},
                weather: {},
            }
        },
        computed: {
            cityid() {
                return state.getters.getActiveCity
            }
        },
        components: {
            'detail': detail,
            'city': city,
        },
        methods: {
            getCity() {
                axios.get('http://127.0.0.1:8000/city2/?cityOwner=' + state.getters.getUsername).then(data => {
                    state.commit('setActive', data['data'][0]['cityId'])
                    this.cities = data['data']
                })
            },
        },
        mounted() {
            this.getCity()
        },
    }

</script>

<style scoped>
    @media only screen and (min-width:992px) {
        #details {
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
        }

        #list_cities {
            max-height: 570px;
            min-height: 570px;
        }
    }

    @media only screen and (max-width: 992px) {
        #details {
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            min-height: 700px;
        }
        #list_cities {
            max-height: 570px;
            min-height: 570px;
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
</style>
