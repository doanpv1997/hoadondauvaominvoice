import axios from "axios";

export const LOGIN_URL = "Account/Login";

export function login(username, password) {
  return axios.post(LOGIN_URL, { username, password });
}

export function getInfoUsername(username) {
  return axios.get("Account/getInfoUsername?username=" + username);
}