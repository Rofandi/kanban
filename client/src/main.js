import Vue from "vue";
import App from "./App"

new Vue({
    render: h => h(App),
}).$mount('#app');

window.onSignIn = (googleUser) => {
    window.googleLogin.onSignIn(googleUser);
}