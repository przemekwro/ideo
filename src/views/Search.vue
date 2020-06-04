<template>
    <div class="content search">
        <div class="p-2">
            <h5>Add city to observe</h5>
            <input class="rounded mr-1 " :class="[searchField.length<4? 'border border-danger':'border border-success']"
                   autocomplete="off" placeholder="e.g. Warsaw" type="text" v-model="searchField">
            <button class="rounded" @click="search" :disabled="searchField.length<4"> Search</button>
            <p>{{searchField}}</p>
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
</template>
<script>
    import cityAdd from '@/components/cityAdd'

    export default {
        name: 'Details',
        data: () => ({
            searchField: '',
            cities: '',
            searchResult:false,
            cityFilteredList: false,
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
        //fast load big data to app
        async mounted() {
            await import("@/assets/city.list.json").then(({default: json}) => {
                this.cities = json;
            });
        },
    }

</script>


<style scoped>

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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
