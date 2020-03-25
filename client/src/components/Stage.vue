<template>
  <div v-bind:id="title.toLowerCase()" class="category">
    <div class="category-name">{{ title }}</div>
    <div class="tasks">
      <div class="task" v-for="task in tasks" :key="task.id">
        <ToDo
          v-bind:categoryType="title.toLowerCase()"
          v-bind:task="task"
          v-on:change="$emit('change')"/>
        <!-- <div
          class="row mx-0 clickable"
          data-toggle="collapse"
          v-bind:data-target="'#actions-' + task.id"
        >
          <div class="col">{{ task.title }}</div>
          <div class="col-auto pr-2 pt-1">
            <i class="fas fa-angle-down"></i>
          </div>
        </div>
        <div class="row mx-n1 pt-1 collapse" v-bind:id="'actions-' + task.id">
          <div class="col p-0">
            <button type="button" class="btn btn-primary btn-block rounded-0 btn-sm">Prev</button>
          </div>
          <div class="col p-0">
            <button type="button" class="btn btn-secondary btn-block rounded-0 btn-sm">Edit</button>
          </div>
          <div class="col p-0">
            <button type="button" class="btn btn-secondary btn-block rounded-0 btn-sm">Delete</button>
          </div>

          <div class="col p-0">
            <button type="button" class="btn btn-success btn-block rounded-0 btn-sm">Next</button>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
    <!-- <form v-on:submit.prevent="addTaskBacklog">
                        <input v-model="taskBacklog"  type="text" class="add-task" placeholder="Add a task..." value=""/>
    </form>-->
    <input
      v-model="taskTitle"
      v-on:keydown.enter="addTask"
      type="text"
      class="add-task"
      placeholder="Add a task..."
      value
    />
</div>
</template>

<script>
import axios from "axios";
import ToDo from "./ToDo.vue";
import baseUrl from "../baseUrl";

export default {
  name: "Stage",
  components: {
    ToDo
  },
  props: ["title", "tasks"],
  data: function() {
    return {
      taskTitle: ""
    };
  },
  methods: {
    addTask() {
      const title = this.taskTitle;
      if (title !== "") {
        this.taskTitle = "";
        axios
          .post(
            `${baseUrl}todos`,
            {
              title: title,
              category: this.title.toLowerCase()
            },
            {
              headers: {
                Authorization: localStorage.jwt
              }
            }
          )
          .then(() => {
            this.$emit("change");
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>