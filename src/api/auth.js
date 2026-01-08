import axios from "axios";

const BASE_URL = "https://typically-wheylike-magen.ngrok-free.dev/api/v3/";

export const registerStudent = (data) => {
  return axios.post(`${BASE_URL}auth/register/`, data);
};

export const loginStudent = (data) => {
  return axios.post(`${BASE_URL}auth/login/`, data);
};
