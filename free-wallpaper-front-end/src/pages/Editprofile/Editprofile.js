import React, { useState, useEffect } from 'react';
import './Editprofile.css';
import w1 from "../../assets/wallpaper/w1.jpg"
export default function Editprofile() {
    const initialProfile = {
        fullName: 'Vu Hong Minh',
        nickName: 'Minh',
        email: 'minhvhhe170320@fpt.edu.vn',
        address: '',
        gender: 'male',
        about: '',
        facebook: '',
        tiktok: '',
    };
    const [profile, setProfile] = useState(initialProfile);
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        const isProfileModified = JSON.stringify(profile) !== JSON.stringify(initialProfile);
        setIsModified(isProfileModified);
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Profile saved:', profile);
    };

    return (
        <div className='container'>
            <div className="profile-image">
                <img src={w1}  className="image-placeholder" />
                <button className="change-image-button">Change image</button>
            </div>
            <form className="row     g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="nickName" className="form-label">Nick Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nickName"
                        name="nickName"
                        value={profile.nickName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Hòa Lạc thạch thất example"
                        value={profile.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="about" className="form-label">About you</label>
                    <textarea
                        className="form-control"
                        id="about"
                        name="about"
                        placeholder="Short bio about you"
                        value={profile.about}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        id="gender"
                        className="form-select"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                    >
                        <option value="choose">Choose...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="col-md-5">
                    <label htmlFor="facebook" className="form-label">Facebook</label>
                    <input
                        type="text"
                        className="form-control"
                        id="facebook"
                        name="facebook"
                        placeholder="Your Facebook here :>"
                        value={profile.facebook}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-5">
                    <label htmlFor="tiktok" className="form-label">Tiktok</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tiktok"
                        name="tiktok"
                        placeholder="Your Tiktok here :>"
                        value={profile.tiktok}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className={`btn ${isModified ? 'btn-success' : 'btn-secondary'}`} disabled={!isModified}>Save</button>
                </div>
            </form>
        </div>
    );
}
