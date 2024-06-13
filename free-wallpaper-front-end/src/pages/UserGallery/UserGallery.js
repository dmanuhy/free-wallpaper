import './UserGallery.css';
import { Component } from "../../components"
import w1 from "../../assets/wallpaper/w1.jpg";
import w2 from "../../assets/wallpaper/w2.jpg";
import w3 from "../../assets/wallpaper/w3.jpg";
import w4 from "../../assets/wallpaper/w4.jpg";
import w5 from "../../assets/wallpaper/w5.jpg";
import w6 from "../../assets/wallpaper/w6.jpg";
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
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="mailto:someone@example.com">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
                <div className="navigation-buttons container" style={{ marginBottom: "30px" }}>
                    <a href="/usergallery" className="nav-button1 active">Gallery <span>{user.gallery.length}</span></a>
                    <a href="/:userid/collections" className="nav-button2">Collections</a>
                </div>
            </div>
            <Component.WallpaperList />
        </div>
    )
}