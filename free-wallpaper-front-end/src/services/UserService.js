import axios from "../axios";

const signUpService = (data) => {
  return axios.post(`/user/sign-up`, data);
};

const signInService = (data) => {
  return axios.post(`/user/sign-in`, data);
};

const logoutService = (data) => {
  return axios.get(`/user/logout`);
};

const getAllUsersService = () => {
  return axios.get(`/user`);
};

export const UserService = {
  signUpService,
  signInService,
  logoutService,
  getAllUsersService,
};
