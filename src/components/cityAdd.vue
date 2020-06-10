<template>
    <div class="city mb-3 mb-2" id="city">
        <div class="row d-flex justify-content-around">
            <div>
                <div class="d-flex justify-content-left">
                    <h5>{{city.name}}</h5>
                </div>
                <div class="d-flex justify-content-left">
                    <h6>{{city.coord.lon}}</h6>
                </div>
            </div>
            <div>
                <div class="d-flex justify-content-end">
                    <button @click="observe" class="rounded">Observe</button>
                </div>
                <div class="d-flex justify-content-end">
                    <h6>{{city.coord.lat}}</h6>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>


<script>
    import state from '@/store'
    import axios from 'axios'

    export default {
        name: 'city',
        props: ['city'],
        methods: {
            observe() {
                axios.post('http://127.0.0.1:8000/city/', {
                    cityId: this.$props['city']['id'],
                    cityOwner: state.getters.getUsername,
                }).then(response =>{
                    console.log(response)
                    state.commit('setActive',this.$props['city']['id'] )
                    this.$router.push('/')
                }).catch(error =>{
                    console.log(error)
                })
            }
        },
    }
</script>


<style scoped>
    #link {
        cursor: pointer;
    }

    #link:hover {
        color: #89DAFF;
        text-decoration: underline;
    }

</style>
