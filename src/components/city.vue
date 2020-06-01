<template>
    <div class="city mb-3 mb-2" id="city">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm">
                <h5 @click="setActive" id="link">{{weather['name']}}</h5>
            </div>
            <div v-if="weather" class="col-lg-8 col-md-8 col-sm d-flex justify-content-around">
                <h6> Temp: {{temperature}} &#8451;</h6>
                <h6>HR: {{weather['main']['humidity']}}%</h6>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'city',
        props: ['city'],
        data() {
            return {
                weather: false,
                temperature:0,
            }
        },
        methods: {
            setActive() {
                this.$emit('getCity', this.weather['id'])
            },
            getWeather() {
                fetch('http://api.openweathermap.org/data/2.5/weather?id=' + this.$props['city'].id + '&appid=bf808372b634845793e6c3743079f0df')
                    .then(response => response.json())
                    .then((data)=>{
                        this.weather = data;
                        this.temperature = Math.round(data['main']['temp'] - 273.15)
                    })
            }
        },
        mounted() {
            this.getWeather()
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
