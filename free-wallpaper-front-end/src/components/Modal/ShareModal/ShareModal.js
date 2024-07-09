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
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Share to Someone</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <label for="recipient-name" className="col-form-label">Enter email here</label>
                            <input type="text" className="form-control" id="recipient-name" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleShare}>Share</button>
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
        // <div className="add-wallpaper-modal">
        //     <div className="modal fade" id="modalAddWallpaper" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        //         <div className="modal-dialog modal-dialog-centered">
        //             <div className="modal-content">
        //                 <div className="modal-header bg-success">
        //                     <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel">
        //                         Share your wallpapers, photos, and let the world love them
        //                     </h1>
        //                     <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        //                 </div>
        //                 <div className="modal-body">
        //                     <Dropzone newImages={newImages} setNewImages={setNewImages} />
        //                 </div>
        //                 <div className="modal-footer">
        //                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        //                     <button onClick={handleCreateNewWallpaper} type="button" data-bs-dismiss="modal" className="btn btn-primary">Create</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <Backdrop
        //         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //         open={open}
        //     >
        //         <CircularProgress color="inherit" />
        //     </Backdrop>
        // </div>
    );
}

export default ShareModal;