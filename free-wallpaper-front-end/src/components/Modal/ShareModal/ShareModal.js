import React, { useState, useEffect, useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { WallpaperService } from '../../../services/WallpaperService';
import { ToastContainer, toast } from "react-toastify";
function ShareModal(id) {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const handleShare = async () => {
        try {
            setOpen(true);
            await WallpaperService.shareWallpaper(id.id, email);
            setEmail('')
            toast.success("Share successful");
            setOpen(false)
        } catch (error) {
            console.error("Error creating new wallpaper:", error);
            alert("Error creating new wallpaper. Please try again.");
        }
    };

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Share to Someone <i class="bi bi-envelope-at-fill"></i></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <label for="recipient-name" className="col-form-label">Enter email here</label>
                            <input type="email" className="form-control" id="recipient-name" placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleShare}>Share <i class="bi bi-send-check"></i></button>
                    </div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </div>
        </div >
        
    );
}

export default ShareModal;