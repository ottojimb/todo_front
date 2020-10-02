import Vue from "vue";
import Vuex from "vuex";

import { authentication } from "./authentication.module";
import { todo } from "./todo.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { authentication, todo }
});
