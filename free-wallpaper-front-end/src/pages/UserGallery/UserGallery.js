import './UserGallery.css';
import { Component } from "../../components"
import w1 from "../../assets/wallpaper/w1.jpg";
import w2 from "../../assets/wallpaper/w2.jpg";
import w3 from "../../assets/wallpaper/w3.jpg";
import w4 from "../../assets/wallpaper/w4.jpg";
import w5 from "../../assets/wallpaper/w5.jpg";
import w6 from "../../assets/wallpaper/w6.jpg";
import { Link } from 'react-router-dom';
export default function UserGallery() {
    const user = {
        name: 'Name of user',
        description: 'Description about user',
        profilePic: w1,
        gallery: [w1, w2, w3, w4, w5, w6, w4, w3, w5],
    };
    return (
        <div>
            <div className="app">
                <div className="user-profile">
                    <img src={user.profilePic} alt="Profile" className="profile-pic" />
                    <h1>{user.name}</h1>
                    <p>{user.description}</p>
                    <div className="icons">
                        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="mailto:someone@example.com">
                            <i className="fas fa-envelope"></i>
                        </Link>
                    </div>
                </div>
                <div className="navigation-buttons container" style={{ marginBottom: "30px" }}>
                    <Link to="/:username" className="nav-button1 active">Gallery</Link>
                    <Link to="/:userid/collections" className="nav-button2">Collections</Link>
                </div>
            </div>
            <Component.WallpaperList wallpaperList={user.gallery} />
        </div>
    )
}