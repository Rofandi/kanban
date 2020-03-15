<template>
  <div>
    <div v-if="page === 'Kanban'">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
        <a class="navbar-brand" href="#">Kanban</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <button
              v-on:click="logout"
              class="btn btn-outline-success my-2 my-sm-0 align-right"
              type="button"
            >Logout</button>
          </ul>
        </div>
      </nav>
    </div>
    <div v-if="page === 'Kanban'" id="kanban" class="container-fluid kanban">
      <div class="row">
        <div class="col">
          <Stage title="Backlog" v-bind:tasks="backlog" v-on:change="initKanban()" />
        </div>
        <div class="col">
          <Stage title="Product" v-bind:tasks="product" v-on:change="initKanban()" />
        </div>
        <div class="col">
          <Stage title="Development" v-bind:tasks="development" v-on:change="initKanban()" />
        </div>
        <div class="col">
          <Stage title="Done" v-bind:tasks="done" v-on:change="initKanban()" />
        </div>
      </div>
    </div>

    <div v-if="page === 'Login'" id="login" class="container login pt-5">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <h3>Login</h3>
          <div class="form-group">
            <label>email</label>
            <input v-model="loginEmail" id="login-email" class="form-control" type="email" value />
          </div>
          <div class="form-group">
            <label>password</label>
            <input
              v-model="loginPassword"
              id="login-password"
              class="form-control"
              type="password"
              value
            />
          </div>
          <div class="form-group">
            <button
              v-on:click="loginSubmit"
              id="login-submit"
              type="button"
              class="btn btn-primary"
            >Login</button>
            <button
              v-on:click="loginRegister"
              id="login-register"
              type="button"
              class="btn btn-info"
            >Register</button>
            <GoogleLogin v-on:success="googleLoginSuccess" />
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>

    <div v-if="page === 'Register'" id="register" class="container register pt-5">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <h3>Register</h3>
          <div class="form-group">
            <label>email</label>
            <input v-model="registerEmail" class="form-control" type="email" value />
          </div>
          <div class="form-group">
            <label>password</label>
            <input v-model="registerPassword" class="form-control" type="password" value />
          </div>
          <div class="form-group">
            <button
              v-on:click="registerSubmit"
              id="register-submit"
              type="button"
              class="btn btn-primary"
            >Register</button>
            <!-- <button v-on:click="registerRandomize" id="register-randomize" type="button" class="btn btn-default">Randomize</button> -->
            <button
              v-on:click="registerLogin"
              id="register-login"
              type="button"
              class="btn btn-info"
            >Login</button>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stage from "./components/Stage.vue";
import GoogleLogin from "./components/GoogleLogin.vue";
export default {
  components: {
    Stage,
    GoogleLogin
  },
  data: function() {
    return {
      todos: [],
      backlog: [],
      product: [],
      development: [],
      done: [],
      page: localStorage.jwt ? "Kanban" : "Login",
      // page: "Login",
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      taskBacklog: "",
      taskProduct: "",
      taskDevelopment: "",
      taskDone: "",
      loginMethod: localStorage.loginMethod
    };
  },

  methods: {
    loginSubmit() {
      axios
        .post("http://localhost:3000/user/login", {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          localStorage.jwt = response.data.token;
          localStorage.loginMethod = "password";
          this.loginMethod = "password";
          this.page = "Kanban";
          this.initKanban();
        });
    },
    loginRegister() {
      this.page = "Register";
    },
    googleLoginSuccess() {
      this.loginmethod = "google";
      this.page = "Kanban";
    },
    registerSubmit() {
      axios
        .post("http://localhost:3000/user/register", {
          email: this.registerEmail,
          password: this.registerPassword
        })
        .then(response => {
          localStorage.jwt = response.data.token;
          localStorage.loginMethod = "password";
          this.loginMethod = "password";
          this.page = "Kanban";
          this.initKanban();
        })
        .catch(error => {
          console.log(error);
        });
    },
    registerLogin() {
      this.page = "Login";
    },
    initKanban() {
      axios
        .get("http://localhost:3000/todos", {
          headers: {
            Authorization: localStorage.jwt
          }
        })
        .then(response => {
          const model = {
            backlog: [],
            product: [],
            development: [],
            done: []
          };
          for (const todo of response.data) {
            model[todo.category].push(todo);
          }
          this.backlog = model.backlog;
          this.product = model.product;
          this.development = model.development;
          this.done = model.done;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addTaskBacklog() {
      const title = this.taskBacklog;
      if (title !== "") {
        this.taskBacklog = "";
        axios
          .post(
            "http://localhost:3000/todos",
            {
              title: title,
              category: "backlog"
            },
            {
              headers: {
                Authorization: localStorage.jwt
              }
            }
          )
          .then(() => {
            this.initKanban();
          })
          .catch(error => console.log(error));
      }
    },
    logout() {
      delete localStorage.jwt;
      delete localStorage.loginMethod;
      this.loginMethod = null;
      this.page = "Login";
    },
    logoutGoogle() {
      auth2.disconnect();
      delete localStorage.jwt;
      delete localStorage.loginMethod;
      this.loginMethod = null;
      this.page = "Login";idToken
    }
  },
  mounted: function() {
    if (localStorage.jwt) {
      this.initKanban();
    }
  }
};
</script>

<style scoped>
</style>