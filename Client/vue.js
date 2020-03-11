new Vue({
    el: '#app',
    data: {
        todos: [],
        KanbanPage: false,
        LoginPage: true,
        RegisterPage: false,
        loginEmail: "",
        loginPassword: "",
        registerEmail: "",
        registerPassword: ""
    },
    methods: {
        loginSubmit(){
            axios.post('http://localhost:3000/user/login', {
                email: this.loginEmail,
                password: this.loginPassword
              })
              .then((data)=> {
                localStorage.jwt = data.token;
                this.KanbanPage = true;
                this.LoginPage = false;
              })
              .catch((error)=> {
                console.log(error);
              });
        },
        loginRegister(){
            this.RegisterPage = true;
            this.LoginPage = false;
        },
        registerSubmit(){
            axios.post('http://localhost:3000/user/register', {
                email: this.registerEmail,
                password: this.registerPassword
              })
              .then((data)=> {
                localStorage.jwt = data.token;
                this.KanbanPage = true;
                this.RegisterPage = false;
              })
              .catch((error)=> {
                console.log(error);
              });
        },
        registerLogin(){
            this.LoginPage = true;
            this.RegisterPage = false;
        },
        showKanban(){
            axios.get('http://localhost:3000/todos'),{
                headers: {
                    "Authorization": localStorage.jwt
                }
            }
            .then(todos => {
                const model = {
                    backlog: [],
                    product: [],
                    development: [],
                    done: []
                };
                for (const todo of todos) {
                    model[todo.category].push(todo);
                }
                // renderAll(model);
            })
            .catch((error)=> {
                console.log(error);
            });
        }
    }
})