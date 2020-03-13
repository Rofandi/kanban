import Vue from "vue";
import Bootstrap from "bootstrap-vue";
import axios from "axios";
import App from './App.vue';

new Vue({
    el: '#app',
    data: {
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
        taskDone: ""
    },
    methods: {
        loginSubmit(){
            axios.post('http://localhost:3000/user/login', {
                email: this.loginEmail,
                password: this.loginPassword
              })
              .then((response)=> {
                localStorage.jwt = response.data.token;
                this.page = "Kanban";
                this.initKanban();
              });
        },
        loginRegister(){
            this.page = "Register";
        },
        registerSubmit(){
            axios.post('http://localhost:3000/user/register', {
                email: this.registerEmail,
                password: this.registerPassword
              })
              .then((response)=> {
                localStorage.jwt = response.data.token;
                this.page = "Kanban";
                this.initKanban();
              })
              .catch((error)=> {
                console.log(error);
              });
        },
        registerLogin(){
            this.page = "Login";
        },
        initKanban(){
            axios.get('http://localhost:3000/todos',{
                headers: {
                    "Authorization": localStorage.jwt
                }
            })
            .then(response => {
                const model = {
                    backlog: [{
                        id: 1,
                        title: "Hello Kanban"
                    }],
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
            .catch((error)=> {
                console.log(error);
            });
        },
        addTaskBacklog(){
            const title = this.taskBacklog;
            if(title!==""){
                this.taskBacklog="";
                axios.post("http://localhost:3000/todos", {
                    title: title,
                    category: "backlog"
                },{
                    headers: {
                        "Authorization": localStorage.jwt
                    }
                })
                .then(() => {
                    this.initKanban();
                })
                .catch((error) => console.log(error));
            }
        }
    },
    mounted: function() {
        this.initKanban();
    },
    render: h => h(App),
}).$mount('#app');