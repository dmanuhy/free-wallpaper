import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { WallpaperService } from '../../../services/WallpaperService';
import { ToastContainer, toast } from "react-toastify";
import './sharemodel.css'
import { UserService } from '../../../services/UserService';
function ShareModal({ id }) {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [allEmails, setAllEmails] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false)
    const fetAlluserEmail = async () => {
        try {
            const response = await UserService.getAllUsersService();
            const emails = response.map(user => user.email);
            setAllEmails(emails);

        } catch (error) {
            console.error("Error fetching album:", error);
        }
    }
    useEffect(() => {
        fetAlluserEmail();
    }, []);

    const handleShare = async () => {
        try {
            setOpen(true);
            await WallpaperService.shareWallpaper(id, email);
            setEmail('');
            toast.success("Share successful");
            setOpen(false);
        } catch (error) {
            console.error("Error creating new wallpaper:", error);
            alert("Error creating new wallpaper. Please try again.");
            setOpen(false);
        }
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (value.length > 0) {
            const filteredSuggestions = allEmails.filter(e => e.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setEmail(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Share to Someone <i className="bi bi-envelope-at-fill"></i></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="recipient-name" className="col-form-label">Enter email here</label>
                                <input
                                    autoComplete="off"
                                    type="email"
                                    className="form-control"
                                    id="recipient-name"
                                    placeholder='example@gmail.com'
                                    value={email}
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                                    onFocus={() => email?.length > 0 && setShowSuggestions(true)}
                                />
                                {showSuggestions && suggestions?.length > 0 && (
                                    <ul className="suggestions-list">
                                        {suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="suggestion-item"
                                            >
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleShare}>Share <i className="bi bi-send-check"></i></button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShareModal;
