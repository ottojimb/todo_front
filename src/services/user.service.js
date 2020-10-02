import axios from "axios";

export const userService = {
  login,
  logout,
  signup,
};

function signup(username, first_name, last_name, email, password) {
  let body = {
    username,
    first_name,
    last_name,
    email,
    password,
  };

  return axios({
    method: "post",
    url: `${process.env.VUE_APP_API_URL}users/`,
    data: body,
    header: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(({ data }) => {
    return data;
  });
}

function login(username, password) {
  let body = {
    username,
    password,
  };

  return axios({
    method: "post",
    url: `${process.env.VUE_APP_API_URL}token`,
    data: body,
    header: { "Content-Type": "application/json" },
  }).then(({ data }) => {
    if (data.access) {
      localStorage.setItem("token", JSON.stringify(data.access));
    }

    return data.access_token;
  });
}

function logout() {
  localStorage.removeItem("token");
}
