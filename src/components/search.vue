<template>
    <div class="details">
        <div class="mt-4">
            <h3>{{info['name']}}</h3>
            <div v-for="i in info['weather']" :key="i">
                <img :src="'http://openweathermap.org/img/wn/'+i.icon+'@4x.png'">
            </div>
            <div class="row d-flex justify-content-around">
                <h5> Temp: {{info['main']['temp']}} K</h5>
                <h5> RH: {{info['main']['humidity']}} %</h5>
            </div>
            <div class="row d-flex justify-content-around">
                <span>Wind: {{info['wind']['speed']}} m/s</span>
                <span>Pressure: {{info['main']['pressure']}} hPa</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'info',
        data() {
                return {
                    choosen: {},
                    show: true,
                }
        },
        methods:{
        },
        props: ['msg', 'info', 'temp'],
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .details{

    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
