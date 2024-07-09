import axios from "../axios";

const getAllWallpaperService = (page = "1", order = "createdAt", priority = "descending") => {
  return axios.get(`/wallpaper/all?page=${page}&order=${order}&priority=${priority}`);
};
const getAllWallpaperByAuthorService = (userId, page = "1", order = "createdAt", priority = "descending") => {
  return axios.get(`/wallpaper/by-author/${userId}?page=${page}&order=${order}&priority=${priority}`);
};
const getAllWallpaperByAlbumService = (albumId, page = "1", order = "createdAt", priority = "descending") => {
  return axios.get(`/wallpaper/all/${albumId}?page=${page}&order=${order}&priority=${priority}`);
};
const CreateWallpaper = (wallpaper) => {
  return axios.post("/wallpaper/create", wallpaper, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteImageAlbum = (albumId) => {
  return axios.delete(`/wallpaper/${albumId}`);
};

const getWallpaperDetail = (id) => {
  return axios.get(`/wallpaper/${id}`);
};

const addWallpaperCommentService = (data) => {
  return axios.post("wallpaper/comment/add", data);
};

const reportWallpaperService = (id, reason) => {
  return axios.post(`/wallpaper/${id}/report`, { reason });
};

const getWallpaperByKeyService = (key) => {
  return axios.get(`/wallpaper/search/${key}`);
};
const shareWallpaper = (id, mail) => {
  return axios.post('/wallpaper/share', {
    wallpaperID: id,
    email: mail
  });
};

export const WallpaperService = {
  getAllWallpaperService,
  getAllWallpaperByAuthorService,
  getAllWallpaperByAlbumService,
  CreateWallpaper,
  getWallpaperDetail,
  deleteImageAlbum,
  addWallpaperCommentService,
  reportWallpaperService,
  getWallpaperByKeyService,
  shareWallpaper
};
