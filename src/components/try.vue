<template>
    <div class="container content ">
        <p>Ladowany komponent</p>
        <button @click="zwroc">Zwracaj</button>
    </div>

</template>

<script>
    import axios from 'axios'
    import detail from "@/components/details";
    import city from "@/components/city";
    import sample from '../assets/sample.json'

    export default {
        name: 'Home',
        data() {
            return {
                search: '',
                temp: '',
                info: {},
                cities: sample,
                choosen: {},
                show: true,
            }
        },
        methods: {
            zwroc(){
                this.$emit('zwroc','asd')
            }
        },

    }

</script>

<style scoped>

</style>
