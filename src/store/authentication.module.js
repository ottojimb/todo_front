import { userService } from "../services";
const token = JSON.parse(localStorage.getItem("token"));

const initialState = token
  ? { status: { loggedIn: true, loginLoading: false }, token, error: null }
  : {
      status: { loggedIn: false, loginLoading: false },
      token: null,
      error: null
    };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    signup({ commit }, { username, first_name, last_name, email, password }) {
      commit("signupRequest");

      userService.signup(username, first_name, last_name, email, password).then(
        (data) => {
          commit("signupSuccess", data);
        },
        (error) => {
          commit("signupFailure", error.response.data);
        }
      );
    },
    login({ commit }, { username, password }) {
      commit("loginRequest", { username });

      userService.login(username, password).then(
        (token) => {
          commit("loginSuccess", token);
        },
        (error) => {
          commit("loginFailure", error.response.data);
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    },
  },
  mutations: {
    signupRequest(state) {
      state.status = { loginLoading: true, signedUp: false };
      state.token = null;
      state.error = null;
    },
    signupSuccess(state) {
      state.status = { loginLoading: false, signedUp: true };
      state.token = null;
      state.error = null;
    },
    signupFailure(state, error) {
      state.status = { loginLoading: false, signedUp: false };
      state.token = null;
      state.error = error;
    },
    loginRequest(state) {
      state.status = { loginLoading: true, signedUp: false };
      state.token = null;
      state.error = null;
    },
    loginSuccess(state, token) {
      state.status = { loginLoading: false, loggedIn: true };
      state.token = token;
      state.error = null;
    },
    loginFailure(state, error) {
      state.status = { loginLoading: false, loggedIn: false };
      state.token = null;
      state.error = error;
    },
    logout(state) {
      state.status = { loginLoading: false, loggedIn: false };
      state.token = null;
      state.error = null;
    }
  },
};
