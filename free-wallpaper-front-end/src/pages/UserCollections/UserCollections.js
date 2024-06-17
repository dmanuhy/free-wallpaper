
import { Link } from "react-router-dom";
import w1 from "../../assets/wallpaper/w1.jpg";
import w2 from "../../assets/wallpaper/w2.jpg";
import w3 from "../../assets/wallpaper/w3.jpg";
import w4 from "../../assets/wallpaper/w4.jpg";
import w5 from "../../assets/wallpaper/w5.jpg";
import w6 from "../../assets/wallpaper/w6.jpg";
import './UserCollections.css';
export default function UserCollections() {

    const user = {
        name: 'Name of user',
        description: 'Description about user',
        profilePic: w1,
        gallery: [w1, w2, w3, w4, w5, w6, w4, w3, w5],
    };
    const albums = [
        {
            id: 1,
            name: 'Album name 1',
            photos: [
                { id: 1, src: w1, alt: 'Description 1' },
                { id: 2, src: w2, alt: 'Description 2' },

            ]
        },
        {
            id: 2,
            name: 'Album name 2',
            photos: [
                { id: 3, src: w3, alt: 'Description 3' },
                { id: 4, src: w4, alt: 'Description 4' },
                { id: 5, src: w5, alt: 'Description 4' },

            ]
        },
        {
            id: 3,
            name: 'Album name 3',
            photos: [
                { id: 3, src: w3, alt: 'Description 3' },
                { id: 4, src: w4, alt: 'Description 4' },
                { id: 5, src: w5, alt: 'Description 4' },

            ]
        },
        {
            id: 4,
            name: 'Album name 3',
            photos: [
                { id: 3, src: w3, alt: 'Description 3' },
                { id: 4, src: w4, alt: 'Description 4' },
                { id: 5, src: w5, alt: 'Description 4' },

            ]
        },
        {
            id: 5,
            name: 'Album name 3',
            photos: [
                { id: 3, src: w3, alt: 'Description 3' },
                { id: 4, src: w4, alt: 'Description 4' },
                { id: 5, src: w5, alt: 'Description 4' },

            ]
        },



    ];
    return (

        <div className="app">
            <div className="user-profile ">
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
                <Link to="/user/1" className="nav-button10 active">Gallery</Link>
                <Link to="/user/1/collections" className="nav-button20">Collections</Link>
            </div>
            <div className="my-gallery container">
                {albums.map(album => (
                    <Link className="my-gallery-item " to="/user/1/album/27" key={album.id}>
                        <img src={album.photos[0].src} alt={album.photos[0].alt} />
                        <div className="my-description" >
                            <span >{album.name}</span>
                            <span className="my-photo-count">🖼️ {album.photos.length}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}