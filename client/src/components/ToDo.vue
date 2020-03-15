<template>
  <div>
    <div
      class="row mx-0 clickable"
      data-toggle="collapse"
      v-on:click="toggle"
      v-bind:data-target="'#actions-' + task.id">
      <div class="col">
          <div v-if="editing"><input class="editTask" ref="editFocus" type="text" v-bind:value="task.title" v-on:keydown.enter="saveTask"/></div>
          <div v-else>{{ task.title }}</div>
      </div>
      <div class="col-auto pr-2 pt-1">
        <i class="fas fa-angle-down"></i>
      </div>
    </div>
    <div class="row mx-n1 pt-1 collapse" v-bind:id="'actions-' + task.id">
      <div class="col p-0">
        <button v-on:click="prev()" type="button" class="btn btn-primary btn-block rounded-0 btn-sm">Prev</button>
      </div>
      <div class="col p-0">
        <button v-on:click="edit()" type="button" class="btn btn-secondary btn-block rounded-0 btn-sm">Edit</button>
      </div>
      <div class="col p-0">
        <button v-on:click="deleteTask()" type="button" class="btn btn-secondary btn-block rounded-0 btn-sm">Delete</button>
      </div>
      <div class="col p-0">
        <button v-on:click="next()" type="button" class="btn btn-success btn-block rounded-0 btn-sm">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ToDo",
  props: ["task","categoryType"],
  data: function() {
    return {
      editing: false
    };
  },
  methods: {
    toggle() {
      $(".collapse").collapse("hide");
    },
    axiosChangeCategory(category, id){
      axios.put(`http://localhost:3000/todos/${id}`, {
            title: this.task.title,
            category: category
        },{
            headers: {
                "Authorization": localStorage.jwt
            }
        })
        .then(() => {
            this.$emit("change")
        })
        .catch((error) => console.log(error));
    },
    prev(){
      const id = this.task.id;
      if(this.categoryType==="product"){
        this.axiosChangeCategory("backlog", id)

      }
      else if(this.categoryType==="development"){
        this.axiosChangeCategory("product", id)
      }
      else if(this.categoryType==="done"){
        this.axiosChangeCategory("development", id)
      }
    },
    edit() {
      this.editing = true;
      setTimeout(() => {
        this.$refs.editFocus.focus()        
      }, 0);
    },
    saveTask(e) {
      const id = this.task.id;
      const title = e.currentTarget.value;
      const category = this.categoryType;
      this.editing=false;
      axios.put(`http://localhost:3000/todos/${id}`, {
            title: title,
            category: category
        },{
            headers: {
                "Authorization": localStorage.jwt
            }
        })
        .then(() => {
            this.$emit("change")
        })
        .catch((error) => console.log(error));
    },
    deleteTask(){
      const id = this.task.id;
        axios.delete(`http://localhost:3000/todos/${id}`,{
            headers: {
                "Authorization": localStorage.jwt
            }
        })
        .then(() => {
            this.$emit("change")
        })
        .catch((error) => console.log(error));
    },
    next(){
      const id = this.task.id;
      if(this.categoryType==="backlog"){
        this.axiosChangeCategory("product", id)

      }
      else if(this.categoryType==="product"){
        this.axiosChangeCategory("development", id)
      }
      else if(this.categoryType==="development"){
        this.axiosChangeCategory("done", id)
      }
    },
  }
};
</script>