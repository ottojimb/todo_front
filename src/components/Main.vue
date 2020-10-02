<template>
  <div class="container">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item> Todo Test</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a
              class="button is-primary"
              v-if="loggedIn"
              @click="handleLogout()"
            >
              Logout
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <Signup v-if="!loggedIn"></Signup>
    <Todo v-if="loggedIn"></Todo>
  </div>
</template>

<script>
import Signup from "../components/Signup";
import Todo from "../components/Todo";

export default {
  name: "Main",
  data() {
    return {
      logged: false,
    };
  },
  methods: {
    handleLogout() {
      const { dispatch } = this.$store;

      dispatch("authentication/logout");
    }
  },
  components: {
    Signup,
    Todo,
  },
  computed: {
    loggedIn() {
      return this.$store.state.authentication.status.loggedIn;
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
