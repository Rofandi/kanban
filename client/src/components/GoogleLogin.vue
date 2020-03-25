<template>
  <button v-google-signin-button="clientId" v-on:click="click" class="btn btn-light google-signin-button">
    <i class="fab fa-google"></i> Google Login
  </button>
</template>
<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
import baseUrl from "../baseUrl";

export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clicked: false,
    clientId: '190289066637-letpqm58jjldbul13d3d06n2apt9le4c.apps.googleusercontent.com'
  }),
  methods: {
    click() {
      this.clicked = true;
    },
    OnGoogleAuthSuccess (idToken) {
      if (this.clicked) {
        $.ajax({
            method: "POST",
            url: `${baseUrl}user/googlelogin`,
            data: {
              token: idToken
            }
        })
            .done(result => {
                this.clicked = false;
                localStorage.jwt = result.token;
                localStorage.loginMethod = "google";
                this.$emit("success");
            })
            .fail(message => console.log(message));
      } 
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>