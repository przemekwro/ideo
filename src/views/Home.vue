<template>
    <div class="container content home">
        <div class="row ">
            <div class="col-lg-7 left  home mb-3">
                <div class="row mt-1 d-flex justify-content-between">
                    <h3 class="mb-3 ml-3 mt-2">Your Cities:</h3>

                </div>
                <div id="list_cities">
                    <div id="cities_list" v-for="(city) in cities" :key="city.cityId">
                        <city :cityId="city['cityId']"></city>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-2">
                    <span>
                        &copy; Wrona Przemyslaw {{cityid}}
                    </span>
                </div>
            </div>
            <div class="col-lg-5 " id="details">
                <detail></detail>
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
                    if(state.getters.getActiveCity == 0) state.commit('setActive', data['data'][0]['cityId'])
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
