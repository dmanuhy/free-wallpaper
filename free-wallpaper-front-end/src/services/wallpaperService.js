import axios from "../axios"

const getAllWallpaperService = (page = "1", order = "createdAt", priority = "descending") => {
    return axios.get(`/wallpaper/all?page=${page}&order=${order}&priority=${priority}`);
}

export const WallpaperService = {
    getAllWallpaperService
}
