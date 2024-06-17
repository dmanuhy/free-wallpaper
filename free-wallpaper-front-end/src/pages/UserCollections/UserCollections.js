
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import w1 from "../../assets/wallpaper/w1.jpg";
import w2 from "../../assets/wallpaper/w2.jpg";
import w3 from "../../assets/wallpaper/w3.jpg";
import w4 from "../../assets/wallpaper/w4.jpg";
import w5 from "../../assets/wallpaper/w5.jpg";
import w6 from "../../assets/wallpaper/w6.jpg";
import empty from "../../assets/wallpaper/empty.png";
import './UserCollections.css';
export default function UserCollections() {

    const [NewAlbumName, setNewAlbumName] = useState('');

    const user = {
        name: 'Name of user',
        description: 'Description about user',
        profilePic: w1,
        gallery: [w1, w2, w3, w4, w5, w6, w4, w3, w5],
    };
    const al = [
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


    ];
    const [albums, setAlbums] = useState(al);
    const handleSubmit = () => {
        if (NewAlbumName.trim() !== '') {
            setAlbums([...albums, { name: NewAlbumName, photos: [] }]);
            setNewAlbumName('');
        }
    };
    // useEffect(() => {
    //     if ()
    // }, [])

    const handleDelete = (albumId, e) => {
        e.preventDefault();
        setAlbums(albums.filter(album => album.id !== albumId));
    };

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
            <div className="navigation-buttons container" style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}>

                <Link to="/user/1" className="nav-button10 active">Gallery</Link>
                <Link to="/user/1/collections" className="nav-button20">Collections</Link>

                <div style={{ alignItems: "flex-end" }}>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i className="bi bi-plus-circle-fill">  </i>
                        New Album
                    </button>
                </div>
            </div>

            <div className="my-gallery container">
                {albums?.map(album => (
                    <Link className="my-gallery-item " to="/user/1/album/27" key={album.id}>
                        {album.photos && album.photos.length > 1 ? (
                            <>
                                <img src={album.photos[0].src} alt={album.photos[0].alt} />
                                <div className="my-description">
                                    <span>{album.name}</span>
                                    <span className="my-photo-count"><i className="bi bi-image"> </i> {album.photos.length}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <img src={empty} />
                                <div className="my-description">
                                    <span>{album.name}</span>
                                    <span className="my-photo-count"><i className="bi bi-image"> </i> 0</span>
                                </div>
                            </>
                        )}
                        <button className="delete-button" onClick={(e) => handleDelete(album.id, e)}>X</button>
                    </Link>

                ))}
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">New Album</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label for="recipient-name" className="col-form-label">Enter Name of Album</label>
                                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setNewAlbumName(e.target.value)} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}