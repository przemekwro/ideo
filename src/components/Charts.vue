<template>
    <div id="chart">
        <div class="row d-flex justify-content-center">
            <div>
                <input class="rounded" type="radio" v-model="picked" id="temp" value="temperature">
                <label for="temp"> Temperature</label>

            </div>
            <div>
                <input type="radio" v-model="picked" id="humidity" value="humidity">
                <label for="humidity"> Humidity</label>
            </div>
        </div>
        <div>
            <line-chart :height="350" :chartData="datacollection" :options="option"></line-chart>
        </div>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'

    export default {
        components: {
            LineChart
        },
        props: ['tempChar', 'humidityChar','date'],
        computed:{
        },
        data() {
            return {
                datacollection: {},
                picked: 'temperature',
                option: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "white",
                            },
                            gridLines: {
                                zeroLineColor: 'rgb(146, 217, 244)',
                                color:'#white',
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "white",
                                fontSize: 14,
                                stepSize: 1,
                                beginAtZero: true,
                                autoSkip: true,
                                maxTicksLimit: 7,
                                maxRotation: 45,
                                minRotation: 45,

                            },
                            gridLines: {
                                zeroLineColor: '#white',
                                color:'#white',
                            },

                        }]
                    },
                },
            }
        },
        mounted() {
            this.fillData()
        },
        methods: {
            fillData() {
                this.datacollection = {
                    type: 'line',
                    labels: this.$props['date'],
                    datasets: [
                        {
                            label: 'Temp',
                            backgroundColor: '#f87979',
                            borderWidth: 3,
                            fill:false,
                            borderColor: '#fff',
                            data: this.$props['tempChar'],
                            pointRadius: 0,
                        },
                    ],
                }
            },
        },
        watch: {
            picked: function (newPicked, oldPicked) {
                if (newPicked == 'temperature' && newPicked != oldPicked) {
                    this.datacollection = {
                        type: 'line',
                        labels: this.$props['date'],
                        datasets: [
                            {
                                label: 'Temp',
                                backgroundColor: '#f87979',
                                fill: false,
                                borderWidth: 3,
                                borderColor: '#fff',
                                data: this.$props['tempChar'],
                                pointRadius: 0,
                            },
                        ]
                    }
                } else if (newPicked == 'humidity' && newPicked != oldPicked) {
                    this.datacollection = {
                        type: 'line',
                        labels:this.$props['date'],
                        datasets: [
                            {
                                label: 'Humidity',
                                backgroundColor: '#f87979',
                                fill: false,
                                borderWidth: 3,
                                borderColor: '#fff',
                                data: this.$props['humidityChar'],
                                pointRadius: 0,
                            },
                        ],
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                            },
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    input[type=radio] {
        position: absolute;
        visibility: hidden;
        display: none;
    }

    label {
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
        padding: 5px 20px;
    }
    label:hover{
        background: rgba(0, 0, 0, 0.3);
    }

    input[type=radio]:checked + label {
        color: black;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
    }


    .small {
        max-width: 100px;
        margin: auto;
    }
</style>
