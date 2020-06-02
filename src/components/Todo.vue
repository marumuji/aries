<template>
  <div>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">TODO</p>
          <b-field label="Name">
            <b-input v-model="imput.name"></b-input>
          </b-field>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <b-field label="Description">
            <b-input v-model="input.description"></b-input>
          </b-field>
        </div>
      </div>
    </nav>
    <button class="button is-link" @click="createTodo">Add</button>
    <ul id="todo">
      <li v-for="todo in todos">
        <span class="todo-wrapper">{{ todo.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { API, graphqlOpration } from "aws-amplify";
  import * as mutations from "@/graphql/mutations";
  import * as queries from "@graphql/queries";

  export default {
    name: "todo",
    data: function() {
      return {
        input: {
          name: "",
          description: ""
        },
        todos: []
      };
    },
    created: async function() {
      await this.listTodos();
    },
    methods: {
      createTodo: async function() {
        if (this.input.name !== "" || this.input.description !== "") {
          await API.graphql(
            graphqlOpration(mutations.createTodo, { input: this.input })
          ).catch(err => console.error(err));
          await this.listTodos();
        } else {
          console.info("input empty");
        }
      },
      listTodos: async function() {
        const res = await API.graphql(
          graphqlOpration(queries.listTodos)
        ).catch(err => console.error(err));
        this.todos = res.data.listTodos.items;
      }
    }
  };
</script>
<style scoped>
</style>
