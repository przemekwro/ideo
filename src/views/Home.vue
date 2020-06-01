<template>
    <div class="container content home">
        <div class="row ">
            <div class="col-lg-7 left  home mb-3">
                <h3 class="mb-3 mt-2">Your Cities:</h3>
                <div id="list_cities">
                    <div id="cities_list" v-for="(city) in cities" :key="city.id">
                        <city :city="city" @getCity="setActive"></city>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-2">
                    <span>
                        &copy; Wrona Przemyslaw
                    </span>
                </div>
            </div>
            <div class="col-lg-5 " id="details">
                <transition name="fade" mode="out-in" v-if="show">
                    <detail :id="cityid"></detail>
                </transition>
            </div>
        </div>

    </div>
</template>

<script>
    import detail from "@/components/details";
    import city from "@/components/city";
    import sample from '../assets/sample.json'

    export default {
        name: 'Home',
        data() {
            return {
                cities: sample,
                show: true,
                weather: {},
                cityid:0,
            }
        },
        components: {
            'detail': detail,
            'city': city,
        },
        methods: {
            setActive(id) {
                setTimeout(() => {
                    this.show = false
                }, 0);
                setTimeout(() => {
                    this.cityid = id
                    this.show=true
                }, 1000);

            },
        },
        created(){
          this.cityid = this.cities[0]['id']
        },
        mounted () {
            //this.setActive(this.weather)
        },
    }

</script>

<style scoped>
    @media only screen and (min-width: 1000px) {
        #details {
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
        }
        .home{

        }
        #list_cities{
            max-height: 570px;
            min-height: 570px;
        }
    }

    @media only screen and (max-width: 1000px) {
        #details {
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }
        .home{
            min-height: 600px;
        }
    }

    #details{
        color: #fff;
        background: rgba(0,72,87,0.5);
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
