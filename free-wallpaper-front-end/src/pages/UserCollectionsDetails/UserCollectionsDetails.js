import './UserCollectionsDetails.css';
import w1 from "../../assets/wallpaper/w1.jpg"
import { Component } from "../../components"
export default function UserCollectionsDetails() {

    return (
        <div>
        <div className="container mt-5">
            <row>
                <div className="text-center">
                    <h2 className="font-weight-bold">Name of album/Collections</h2>
                    <p className="text-muted">Free Wallpaper</p>
                </div>
            </row>
            <row>
                <div className="d-flex justify-content-between align-items-center mt-4" style={{marginBottom:"30px"}}>
                    <div className="d-flex align-items-center">
                        <img src={w1} alt="User Avatar" className="rounded-circle" width="50" height="50" />
                        <div className="ml-3">
                            <h6 className="m-0">Zehra K.</h6>
                        </div>
                    </div>
                    <div>
                        <p className="m-0">6</p>
                    </div>
                </div>
            </row>
            
        </div>
        <Component.WallpaperList />
        </div>
    )
}