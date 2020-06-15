<template>
    <div>
        <div v-if="loaded">
            <transition mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div class="content search" :key="loaded">
                    <div class="p-2">
                        <h5>Add city to observe</h5>
                        <input class="rounded mr-1 "
                               :class="[searchField.length<4? 'border border-danger':'border border-success']"
                               autocomplete="off" placeholder="e.g. Warsaw" type="text" v-model="searchField">
                        <button class="rounded" @click="search" :disabled="searchField.length<4"> Search</button>
                    </div>
                    <div class="searchResult mb-3">
                        <div v-if="cityFilteredList.length!=0">
                            <div id="cities" class="container" v-for="city in cityFilteredList" v-bind:key="city.id">
                                <city-add :city="city"></city-add>
                                <hr>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="searchResult"><p>Not found </p></div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div v-else>
            <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div id="overlay" >
                    <div class="lds-roller" :key="loaded">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import cityAdd from '@/components/cityAdd'

    export default {
        name: 'Search',
        data: () => ({
            searchField: '',
            cities: '',
            searchResult:false,
            cityFilteredList: false,
            loaded: false,
        }),
        components:{
            'cityAdd':cityAdd
        },
        methods: {
            search() {
                let i
                this.cityFilteredList = []
                this.searchResult=true
                for (i in this.cities) {
                    if (this.cities[i].name.toLowerCase().includes(this.searchField.toLowerCase())) {
                        this.cityFilteredList.push(this.cities[i])
                    }
                }
                this.searchField = ''
            }
        },
        //async load data
        async mounted() {
            await import("@/assets/city.list.json").then(({default: json}) => {
                this.cities = json;
                this.loaded = true;
            });
        },
    }

</script>


<style scoped>
    #overlay {
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        z-index: 2;
        position: absolute;
    }

    .searchResult{
        max-height: 60vh;
        overflow-y: auto;
    }

    h6:nth-child(1) {
        border-right: 1px solid white;
        margin-right: 3px;
        padding-right: 3px;
        cursor: pointer;
    }

    hr {
        background-color: #fff;
    }

    .modal-body .row div:last-child hr {
        display: none;
    }

    button {
        width: inherit;
        text-decoration: none;
        border: none;
    }

    button:focus {
        outline: 0;
    }


   /* animacja przy ladowaniu search  */

    .lds-roller {
        display: inline-block;
        position: absolute;
        top: 45%;
        left: 45%;
        width: 80px;
        height: 80px;
        z-index: 3;
    }

    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
    }

    .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #fff;
        margin: -4px 0 0 -4px;
    }

    .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
    }

    .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
    }

    .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
    }

    .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
    }

    .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
    }

    .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
    }

    .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
    }

    .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
    }

    .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
    }

    .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
    }

    .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
    }

    .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
    }

    .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
    }

    .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
    }

    .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
    }

    .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
    }

    @keyframes lds-roller {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
