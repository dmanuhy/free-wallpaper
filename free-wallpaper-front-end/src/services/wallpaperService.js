import axios from "../axios"

const getAllWallpaperService = (page = "1", order = "createdAt", priority = "descending") => {
    return axios.get(`/wallpaper/all?page=${page}&order=${order}&priority=${priority}`);
}

const getWallpaperDetail = (id) => {
    return axios.get(`/wallpaper/${id}`);
}

export const WallpaperService = {
    getAllWallpaperService,
    getWallpaperDetail
}
