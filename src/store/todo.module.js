import { todoService } from "../services";

const initialState = {
  status: { todoLoading: false },
  data: { results: [] },
  page: 1,
  error: null
};

export const todo = {
  namespaced: true,
  state: initialState,
  actions: {
    loadTodos({ commit }, params) {
      commit("loadTodoRequest", params.page);

      todoService.loadTodos(params.page, params.search).then(
        data => {
          commit("loadTodoSuccess", data);
        },
        error => {
          commit("loadTodoFailure", error.response.data);
        }
      );
    },
    createTodo({ commit, dispatch }, todo) {
      commit("createTodoRequest", todo);

      todoService.createTodo(todo).then(
        data => {
          commit("createTodoSuccess", data);
          dispatch("loadTodos", { page: 1, search: null });
        },
        error => {
          commit("createTodoFailure", error.response.data);
        }
      );
    },
    editTodo({ dispatch }, params) {
      todoService.editTodo(params).then(
        () => {
          dispatch("loadTodos", { page: 1, search: null });
        },
        () => {
          dispatch("loadTodos", { page: 1, search: null });
        }
      );
    }
  },
  mutations: {
    loadTodoRequest(state, page) {
      state.status = { todoLoading: true };
      state.data = { results: [] };
      state.page = page;
      state.error = null;
    },
    loadTodoSuccess(state, data) {
      state.status = { todoLoading: false };
      state.data = data;
      state.error = null;
    },
    loadTodoFailure(state, error) {
      state.error = error;
    },
    createTodoRequest(state, page) {
      state.status = { todoLoading: true };
      state.data = { results: [] };
      state.page = page;
      state.error = null;
    },
    createTodoSuccess(state, data) {
      state.status = { todoLoading: false };
      state.data = data;
      state.error = null;
    },
    createTodoFailure(state, error) {
      state.error = error;
    }
  }
};
