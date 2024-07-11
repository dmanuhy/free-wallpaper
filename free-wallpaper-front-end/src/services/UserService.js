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
const findUser = (userId) => {
  return axios.get(`/user/${userId}`);
};

const getAllUsersService = () => {
  return axios.get(`/user`);
};

const blockUserService = (id, isActived) => {
  return axios.patch(`/user/${id}`, { isActived });
};

const getUserNotificationService = (id) => {
  return axios.post("/user/get-notification", { id: id });
};

const getUserLikedWallpaperService = (id) => {
  return axios.post("/user/get-liked-wallpaper", { id: id });
};

const updateUserLikedWallpaperService = (data) => {
  return axios.post("/user/update-liked-wallpaper", data);
};

const markReadNotificationService = (data) => {
  return axios.post("/user//mark-readed-notification", data);
};

export const UserService = {
  signUpService,
  signInService,
  logoutService,
  findUser,
  getAllUsersService,
  blockUserService,
  getUserNotificationService,
  getUserLikedWallpaperService,
  updateUserLikedWallpaperService,
  markReadNotificationService
};
