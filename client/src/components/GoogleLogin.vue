<template>
    <div class="g-signin2" style="width: 100px;" data-onsuccess="onSignIn"></div>
</template>
<script>
export default {
    name: "GoogleLogin",
    methods: {
        onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            $.ajax({
                method: 'POST',
                url: `http://localhost:3000/user/googlelogin`,
                data: {
                    token: id_token
                }
            })
            .done(result => {
                localStorage.jwt = result.token;
                this.$emit("success")
            })
            .fail(message => console.log(message));
        }
    },
    mounted: function() {
        window.googleLogin = this;
    }
}
</script>