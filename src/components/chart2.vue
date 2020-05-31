<template>
    <div class="container">
        <line-chart
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"/>
    </div>
</template>

<script>
    import LineChart from './Chart.vue'

    export default {
        name: 'LineChartContainer',
        components: { LineChart },
        data: () => ({
            loaded: false,
            chartdata: null
        }),
        async mounted () {
            this.loaded = false
            try {
                const { userlist } = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=bf808372b634845793e6c3743079f0df')
                this.chartdata = userlist
                this.loaded = true
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>