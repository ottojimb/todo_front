<template>
  <section>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="handleClick(1)">
          <b-field label="Find...">
            <b-input
              placeholder="Find your todo"
              type="Find"
              v-model="search"
            ></b-input>
            <p class="control">
              <button class="button is-primary" type="submit">Find it!</button>
            </p>
          </b-field>
        </form>

        <table class="table" v-if="data.results.length > 0">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Description</th>
            <th>Extras</th>
          </tr>

          <TodoField
            v-for="line in data.results"
            :key="line.id"
            :todo-data="line"
            :rowSelected="rowSelected"
            @click.native="handleTodoClick(line)"
            @clickFromDone="handleDone"
          ></TodoField>
        </table>

        <nav class="pagination" role="navigation" aria-label="pagination">
          <ul class="pagination-list">
            <li v-for="i in pageCount" :key="i">
              <a
                class="pagination-link"
                v-bind:class="{ 'is-current': i == currentPage }"
                @click="handleClick(i)"
                >{{ i }}</a
              >
            </li>
          </ul>
        </nav>

        <form @submit.prevent="handleNew()">
          <b-field label="Create a new todo">
            <b-input
              placeholder="Your new todo"
              type="Find"
              v-model="message"
            ></b-input>
            <p class="control">
              <button class="button is-primary" type="submit">
                Create it!
              </button>
            </p>
          </b-field>
        </form>

        <b-loading
          v-model="todoLoading"
          :is-full-page="true"
          :can-cancel="true"
        ></b-loading>
      </div>

      <div class="column">
        <form @submit.prevent="handleEdit()" v-if="todoSelected">
          <b-field label="Edit a todo">
            <b-input
              placeholder="Your new description"
              type="Find"
              v-model="editedMessage"
            ></b-input>
            <p class="control">
              <button class="button is-primary" type="submit">
                Modify it!
              </button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import TodoField from "./TodoField";

export default {
  name: "Todo",
  data() {
    return {
      search: null,
      message: null,
      rowSelected: null,
      todoSelected: null,
      editedMessage: null
    };
  },
  components: { TodoField },
  computed: {
    todoLoading() {
      return this.$store.state.todo.status.todoLoading;
    },
    data() {
      return this.$store.state.todo.data;
    },
    pageCount() {
      let count = this.$store.state.todo.data.count || 0;
      return Math.ceil(count / 2);
    },
    currentPage() {
      return this.$store.state.todo.page;
    }
  },
  methods: {
    handleClick(page) {
      const { dispatch } = this.$store;
      dispatch("todo/loadTodos", { page, search: this.search });
    },
    handleNew() {
      if (this.message) {
        const { dispatch } = this.$store;
        dispatch("todo/createTodo", this.message);
      }
    },
    handleTodoClick(todo) {
      if (todo.done) {
        this.todoSelected = null;
        this.rowSelected = todo.id;
      } else {
        this.todoSelected = todo;
        this.rowSelected = todo.id;
        this.editedMessage = todo.message;
      }
    },
    handleEdit() {
      const { dispatch } = this.$store;
      dispatch("todo/editTodo", {
        todoId: this.rowSelected,
        newMessage: this.editedMessage,
        done: false
      });
    },
    handleDone(todo) {
      this.rowSelected = null;
      this.todoSelected = null;
      const { dispatch } = this.$store;
      dispatch("todo/editTodo", {
        todoId: todo.id,
        newMessage: todo.message,
        done: true
      });
    }
  },
  mounted() {
    const { dispatch } = this.$store;
    dispatch("todo/loadTodos", { page: 1, search: null });
  }
};
</script>
