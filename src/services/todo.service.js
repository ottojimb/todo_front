import axios from "axios";

export const todoService = {
  loadTodos,
  createTodo,
  editTodo
};

function loadTodos(page, search) {
  const token = JSON.parse(localStorage.getItem("token"));

  let url = `${process.env.VUE_APP_API_URL}todos/?page=${page}`;

  if (search) {
    url = `${url}&message=${search}`;
  }

  return axios({
    method: "get",
    url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  }).then(({ data }) => {
    return data;
  });
}

function createTodo(todo) {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `${process.env.VUE_APP_API_URL}todos/`;
  const body = JSON.stringify({ message: todo, done: false });

  return axios({
    method: "post",
    url,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  }).then(({ data }) => {
    return data;
  });
}

function editTodo(params) {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `${process.env.VUE_APP_API_URL}todos/${params.todoId}/`;
  const body = JSON.stringify({
    message: params.newMessage,
    done: params.done
  });

  return axios({
    method: "put",
    url,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  }).then(({ data }) => {
    return data;
  });
}
