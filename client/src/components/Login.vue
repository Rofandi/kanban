<template>
    <div v-if="page === 'Login'" id="login" class="container login pt-5">
        <div class="row">
            <div class="col">
            </div>
            <div class="col">
                <h3>Login</h3>
                <div class="form-group">
                    <label>email</label>
                    <input v-model="loginEmail" id="login-email" class="form-control" type="email" value="" />
                </div>
                <div class="form-group">
                    <label>password</label>
                    <input v-model="loginPassword" id="login-password" class="form-control" type="password" value="" />
                </div>
                <div class="form-group">
                    <button v-on:click="loginSubmit" id="login-submit" type="button" class="btn btn-primary">Login</button>
                    <button v-on:click="loginRegister" id="login-register" type="button" class="btn btn-info">Register</button>
                </div>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
</template>

<!--script>
import axios from "axios";
export default{
    data: function(){}
}
</script>

<style scoped>
</style-->