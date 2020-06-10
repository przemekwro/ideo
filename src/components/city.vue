<template>
    <div class="city mb-3 mb-2" id="city">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm">
                <p @click="setActive" id="link">{{weather['name']}}</p>
            </div>
            <div v-if="weather" class="col-lg-8 col-md-8 col-sm d-flex justify-content-around">
                <p> Temp: {{temperature}} &#8451;</p>
                <p>HR: {{weather['main']['humidity']}}%</p>
            </div>
        </div>
    </div>
</template>


<script>
    import state from '@/store'

    export default {
        name: 'city',
        props: ['cityId'],
        data() {
            return {
                weather: false,
                temperature:0,
            }
        },
        methods: {
            setActive() {
                state.commit('setActive',this.weather['id'])
            },
            getWeather() {
                console.log('downloading data')
                fetch('http://api.openweathermap.org/data/2.5/weather?id=' + this.$props['cityId'] + '&appid=bf808372b634845793e6c3743079f0df')
                    .then(response => response.json())
                    .then((data)=>{
                        this.weather = data;
                        this.temperature = Math.round((data['main']['temp'] - 273.15)*100)/100
                    })
            }
        },
        mounted() {
            this.getWeather()
        },
        created(){
            window.setInterval(this.getWeather,60000)
        }
    }
</script>


<style scoped>
    #link {
        cursor: pointer;
        font-weight: bold;
    }

    #link:hover {
        color: rgba(0, 126, 138, 1);
        text-decoration: underline;
    }

</style>
