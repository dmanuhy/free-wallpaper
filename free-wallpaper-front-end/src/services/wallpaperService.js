import axios from "../axios"

const getAllWallpaperService = (page = "1", order = "createdAt", priority = "descending") => {
    return axios.get(`/wallpaper/all?page=${page}&order=${order}&priority=${priority}`);
}
const getAllWallpaperByAuthorService = (userId, page = "1", order = "createdAt", priority = "descending") => {
    return axios.get(`/wallpaper/${userId}?page=${page}&order=${order}&priority=${priority}`);
}
const getAllWallpaperByAlbumService = (albumId, page = "1", order = "createdAt", priority = "descending") => {
    return axios.get(`/wallpaper/all/${albumId}?page=${page}&order=${order}&priority=${priority}`);
}
const CreateWallpaper = (wallpaper) => {
    return axios.post('/wallpaper/create', wallpaper, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const WallpaperService = {
    getAllWallpaperService,
    getAllWallpaperByAuthorService,
    getAllWallpaperByAlbumService,
    CreateWallpaper
}
