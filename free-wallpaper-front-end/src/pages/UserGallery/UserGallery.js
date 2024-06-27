import './UserGallery.css';
import { Component } from "../../components"

import { Link, useParams } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useState, useEffect } from "react";
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { WallpaperService } from '../../services/WallpaperService';
import { UserService } from '../../services/UserService';
export default function UserGallery() {
    const { userId } = useParams();
    const [NewAlbumName, setNewAlbumName] = useState('');
    const { user } = useContext(UserContext)
    const [User, setUser] = useState();
    const [wallpaperList, setWallpaperList] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        order: "createdAt",
        priority: "descending"
    })

    const [noMoreData, setNoMoreData] = useState(false)

    const fetchAllWallpaper = async () => {
        const response = await WallpaperService.getAllWallpaperByAuthorService(userId, page, sort.order, sort.priority)
        if (response && response.status === 200 && response.data.length > 0) {
            if (page === 1) {
                setWallpaperList(response.data);
            } else {
                setWallpaperList((products) => [...products, ...response.data]);
            }
        } else {
            setNoMoreData(true)
        }
    }
    
    const fetchUser = async () => {
        try {
            const response = await UserService.findUser(userId);
            setUser(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser()
        if (page !== 0) {
            fetchAllWallpaper();
        }
    }, [page, sort])


    return (
        <div>
            <div className="app">
                <div className="user-profile">
                    <img src={User?.avatar || user_avatar_raw} alt="Profile" className="profile-pic" />
                    <h1>{User?.name}</h1>
                    <p>{User?.bio}</p>
                    <div className="icons">
                        <Link target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to={User?.email}>
                            <i className="fas fa-envelope"></i>
                        </Link>
                    </div>
                </div>
                <div className="navigation-buttons container" style={{ marginBottom: "30px" }}>
                    <Link to="" className="nav-button1 active">Gallery</Link>
                    <Link to="collections" className="nav-button2">Collections</Link>
                </div>
            </div>
            <Component.WallpaperList wallpaperList={wallpaperList} page={page} setPage={setPage} />
        </div>
    )
}