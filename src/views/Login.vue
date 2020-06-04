<template>
    <div class="p-3 login content">
        <h3>WeatherApp</h3>
        <h4>Log In</h4>
        <div v-if="wrongCred">
            Wrong login or password!
        </div>
        <form v-on:submit.prevent="loginUser">
            <div class="row m-2">
                <input v-model="username" placeholder="login" class="rounded p-1">
            </div>
            <div class="row m-2">
                <input v-model="password" placeholder="password" class="rounded p-1" type="password">
            </div>
            <input type="submit" value="Log In" class="rounded pl-3 pt-1 pr-3 pb-1"/>
        </form>
    </div>
</template>


<script>

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                wrongCred:false,
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
    }
</script>


<style scoped>


</style>
