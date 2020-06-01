<template>
    <div class="details">
        <div class="mt-4 mb-4">
            <h3>{{city['name']}}</h3>
            <div v-if="weather">
                <img :src="'http://openweathermap.org/img/wn/'+weather['weather'][0]['icon']+'@2x.png'">
                <div class="row d-flex justify-content-around">
                    <div>
                        <h5>Temp: {{temp[0]}} &#8451;</h5>
                        <span>Pressure: {{weather['main']['pressure']}} hPa</span>
                    </div>
                    <div>
                        <h5> RH: {{weather['main']['humidity']}} %</h5>
                        <span>Wind: {{weather['wind']['speed']}} m/s</span>
                    </div>
                </div>
            </div>
            <chart2 v-if="loaded" :tempChar="temp" :humidityChar="humidity"/>
        </div>

    </div>
</template>

<script>
    import Charts from "@/components/Charts";

    export default {
        name: 'info',
        props: ['id'],
        data() {
            return {
                weather: false,
                temp: [],
                city: [],
                humidity: [],
                loaded: false,
            }
        },
        computed: {
            weatherLength() {
                return this.weather.length
            }
        },
        mounted() {
            console.log('downloading')
            this.downloadData()
        },
        methods: {
            downloadData() {
                fetch('http://api.openweathermap.org/data/2.5/forecast?id=' + this.$props['id'] + '&appid=bf808372b634845793e6c3743079f0df')
                    .then(response => response.json())
                    .then((data) => {
                        let i
                        this.city = data['city']
                        this.weather = data['list'][0]
                        for (i in data['list']) {
                            this.temp.push(Math.round(data['list'][i]['main']['temp'] - 273))
                            this.humidity.push(data['list'][i]['main']['humidity'])
                        }
                        this.loaded = true
                    })
            },
        },
        components: {
            'chart2': Charts,
        },
    }
</script>


<style scoped>
    a {
        color: #42b983;
    }
</style>
