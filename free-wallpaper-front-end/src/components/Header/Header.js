import React, { useState, useEffect, useContext } from 'react'
import "./Header.scss"
import { Component } from '..'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../contexts/UserContext'

const Header = () => {

    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate()


    const handleClickAvatar = () => {
        switch (user.role) {
            case "admin": navigate("/management/account"); break;
            case "contributor": navigate(`/user/${user.email}`); break
            default: break;
        }
    }



    return (
        <div className="header content-width-padding row align-items-center mx-0">
            <span className="header-logo col-2 fs-2" onClick={() => navigate("/")}>Free Wallpaper</span>
            <div className='col-7 header-search'>
                {window.location.pathname !== "/" && window.location.pathname !== "/"
                    ?
                    <Component.Search />
                    :
                    <></>
                }
            </div>
            <div className='col-3 d-flex justify-content-end align-items-center gap-3'>
                <div class="dropdown dropdown-right">
                    <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Explore <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Hostest Images</a></li>
                        <li><a class="dropdown-item" href="#">Top Contributors</a></li>
                        <li><a class="dropdown-item" href="#">Full Collections</a></li>
                    </ul>
                </div>
                {user && user.isActived === false ?
                    <>
                        <button onClick={() => navigate("/register")} className="btn btn-outline-info">Sign-up</button>
                        <button onClick={() => navigate("/login")} className="header-login">Join</button>
                    </>
                    :
                    <>
                        <div onClick={() => handleClickAvatar()} className="header-user-avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                        <button onClick={() => logout()} className="header-logout btn btn-warning">Logout</button>
                    </>
                }

            </div>
        </div>
    )
}

export default Header