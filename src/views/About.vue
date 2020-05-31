<template>
    <div class="content">
        <div class="p-2">
            <h5>Add city to observe</h5>
            <input class="rounded mr-1 "  :class="[search.length<5? 'border border-danger':'border border-success']"
                   autocomplete="off" placeholder="e.g. Warsaw" type="text" v-model="search" id="city">
        </div>
        <div class="">
            <div id="cities" class="container" v-for="city in cityFilteredList" v-bind:key="city.id">
                <div class="row d-flex justify-content-center">
                    <h5>{{city.name}}</h5>
                </div>
                <div class="row d-flex justify-content-center">
                    <h6>{{city.coord.lon}}</h6>
                    <h6>{{city.coord.lat}}</h6>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
    import city from '@/assets/city.list.json'


    export default {
        name: 'Details',
        data: () => ({
            absolute: true,
            opacity: 1,
            overlay: false,
            search: '',
            cities: city,
        }),
        computed: {
            cityFilteredList() {
                if( this.search.length > 4)
                return this.cities.filter(city => {
                    return city.name.toLowerCase().includes(this.search.toLowerCase())
                })
                return null
            }
        },
    }

</script>


<style scoped>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.2";



    h6:nth-child(1) {
        border-right: 1px solid white;
        margin-right: 3px;
        padding-right: 3px;
        cursor: pointer;
    }
    hr{
        background-color:#fff;
    }
    .modal-body .row div:last-child hr {
        display: none;
    }


    .red {
        border: 1px
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

    #searchResult {
        position: relative;
    }

</style>
