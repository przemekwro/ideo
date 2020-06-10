<template>
    <div class="details">
        <div class="mt-4 mb-4">
            <h3 v-if="city">{{city['name']}}</h3>
            <div v-if="weather">
                <img class="img" :src="'http://openweathermap.org/img/wn/'+weather['weather'][0]['icon']+'@2x.png'">
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
            <chart2 v-if="loaded" :tempChar="temp" :date="date" :humidityChar="humidity" :key="refresh"/>
        </div>
    </div>
</template>

<script>
    import Charts from "@/components/Charts";
    import state from "@/store"

    export default {
        name: 'info',

        data() {
            return {
                weather: false,
                temp: false,
                city: false,
                humidity: false,
                loaded: false,
                refresh:0,
                date:false,
            }
        },
        computed: {
            cityid() {
                return state.getters.getActiveCity
            },
        },
        mounted(){
          this.downloadData()
        },
        methods: {
            downloadData() {
                fetch('http://api.openweathermap.org/data/2.5/forecast?id=' + this.cityid + '&appid=bf808372b634845793e6c3743079f0df')
                    .then(response => response.json())
                    .then((data) => {
                        let i
                        this.temp = []
                        this.humidity = []
                        this.city = data['city']
                        this.date = []
                        console.log('city'+this.city)
                        this.weather = data['list'][0]
                        for (i in data['list']) {
                            this.temp.push(Math.round(data['list'][i]['main']['temp'] - 273))
                            this.humidity.push(data['list'][i]['main']['humidity'])
                            this.date.push(data['list'][i]['dt_txt'])
                        }
                        this.loaded = true
                    })
            },
        },
        components: {
            'chart2': Charts,
        },
        watch: {
            cityid() {
                if(this.cityid === 0) return null
                this.updated=false
                fetch('http://api.openweathermap.org/data/2.5/forecast?id=' + this.cityid + '&appid=bf808372b634845793e6c3743079f0df')
                    .then(response => response.json())
                    .then((data) => {
                        let i
                        this.temp = []
                        this.humidity = []
                        this.date = []
                        this.city = data['city']
                        this.weather = data['list'][0]
                        for (i in data['list']) {
                            this.temp.push(Math.round(data['list'][i]['main']['temp'] - 273))
                            this.humidity.push(data['list'][i]['main']['humidity'])
                            this.date.push(data['list'][i]['dt_txt'])
                        }
                        this.refresh = this.cityid
                        this.loaded = true
                    })
            }
        },
    }
</script>


<style scoped>
    .img{
        min-height: 100px;
    }

</style>
