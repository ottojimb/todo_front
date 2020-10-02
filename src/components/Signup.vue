<template>
  <section>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Sign up">
        <form @submit.prevent="handleSignUp">
          <b-message type="is-success">
            Please register your basic data to start with "Todo test" or
            <a @click="activeTab = 1"> login </a> if you're already registered
          </b-message>

          <b-field label="Username">
            <b-input
              v-model="username"
              placeholder="Your Username"
              maxlength="50"
            ></b-input>
          </b-field>

          <b-field label="First Name">
            <b-input
              v-model="first_name"
              placeholder="Your First Name"
              maxlength="50"
            ></b-input>
          </b-field>

          <b-field label="Last Name">
            <b-input
              v-model="last_name"
              placeholder="Your Last Name"
              maxlength="50"
            ></b-input>
          </b-field>

          <b-field label="Email" message="">
            <b-input
              v-model="email"
              type="email"
              value=""
              maxlength="100"
              placeholder="Your Email"
            >
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              v-model="password"
              type="password"
              value=""
              maxlength="100"
              placeholder="Your Password"
            >
            </b-input>
          </b-field>

          <div class="buttons">
            <button type="submit" class="button is-primary">
              Sign Up
            </button>
          </div>
        </form>
      </b-tab-item>

      <b-tab-item label="Login">
        <form @submit.prevent="handleLogin">
          <b-message type="is-warning">
            You must be registered to login. If you are unregistered, please
            <a @click="activeTab = 0"> sign up </a> before
          </b-message>

          <b-field label="Username">
            <b-input
              v-model="username"
              placeholder="Your Username"
              maxlength="50"
            ></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              v-model="password"
              type="password"
              value=""
              maxlength="100"
              placeholder="Your Password"
            >
            </b-input>
          </b-field>

          <div class="buttons">
            <button class="button is-primary">
              Login
            </button>
          </div>
        </form>
      </b-tab-item>
      <b-loading
        v-model="loginLoading"
        :is-full-page="false"
        :can-cancel="true"
      ></b-loading>
    </b-tabs>
  </section>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      activeTab: 0,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      submitted: false,
    };
  },
  computed: {
    loginLoading() {
      return this.$store.state.authentication.status.loginLoading;
    },
    loggedIn() {
      return this.$store.state.authentication.status.loggedIn;
    },
    error() {
      return this.$store.state.authentication.error;
    },
  },
  watch: {
    "$store.state.authentication.status.signedUp": function() {
      if (this.$store.state.authentication.status.signedUp) {
        this.$buefy.toast.open("You have been successfully registered");
        this.$buefy.toast.open("Please login with your new credentials");
        this.activeTab = 1;
      }
    },
    "$store.state.authentication.error": function() {
      let err = this.$store.state.authentication.error;

      if (err) {
        for (var key in err) {
          this.$buefy.toast.open({
            duration: 5000,
            message: "<b>" + key + "</b>: " + err[key],
            position: "is-bottom",
            type: "is-danger",
          });
        }
      }
    },
  },
  methods: {
    handleSignUp() {
      const { username, first_name, last_name, email, password } = this;
      const { dispatch } = this.$store;

      if (username && first_name && last_name && email && password) {
        dispatch("authentication/signup", {
          username,
          first_name,
          last_name,
          email,
          password,
        });
      }
    },
    handleLogin() {
      const { username, password } = this;
      const { dispatch } = this.$store;

      if (username && password) {
        dispatch("authentication/login", {
          username,
          password,
        });
      }
    },
  },
};
</script>
