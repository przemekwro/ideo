<template>
    <div class="p-3 login content">
        <h3>WeatherApp</h3>
        <h4>Log In</h4>
        <form v-on:submit.prevent="loginUser">
            <div class="row m-2">
                <input v-model="username" class="rounded p-1">
            </div>
            <div class="row m-2">
                <input v-model="password" class="rounded p-1" type="password">
            </div>

            <input type="submit" value="Log In" class="rounded pl-3 pt-1 pr-3 pb-1"/>
        </form>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            loginUser() { // call loginUSer action
                this.$store.dispatch('loginUser', {
                    username: this.username,
                    password: this.password
                })
                    .then(() => {
                        this.wrongCred = false
                        this.$router.push({name: 'Home'})
                    })
                    .catch(err => {
                        console.log(err)
                        this.wrongCred = true // if the credentials were wrong set wrongCred to true
                    })
            }
        },
            //  Token fdbf4bad5e90ba135159ac8505ad048f00ecc216
            /*
            axios.get("http://localhost:8000/hello/", {
                headers: {
                    'Authorization':' Token fdbf4bad5e90ba135159ac8505ad048f00ecc216',
                }
            }).then(response => {
                this.userList = response
                console.log(response);
            })
             */
    }
</script>


<style scoped>


</style>