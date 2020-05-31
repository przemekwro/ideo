<template>
    <div class="p-3 login content">
        <h3>WeatherApp</h3>
        <h4>Log In</h4>
        <form>
            <div class="row m-2">
                <input v-model="login" class="rounded p-1">
            </div>
            <div class="row m-2">
                <input class="rounded p-1" type="password">
            </div>

            <input  type="submit" value="Log In" class="rounded pl-3 pt-1 pr-3 pb-1"/>
        </form>
        <h6>Login or register <a href="/home">here</a></h6>
        <button @click="getUser"> asd</button>
        {{userList}}
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                login: '',
                message: '',
                userList: '',
                counter: 0
            }
        },
        methods: {
            getUser() {
                axios.get("http://localhost:8000/users/").then(response => {
                    this.userList = response
                    console.log(response);
                })
            },
            mounted() {
                this.getUser()
            }
        }
    }
</script>


<style scoped>


</style>