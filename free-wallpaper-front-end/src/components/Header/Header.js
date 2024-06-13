import React, { useState, useEffect } from 'react'
import "./Header.scss"
import { Component } from '..'
import { useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className="header content-width-padding content-height-padding row align-items-center mx-0">
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

                <button className="btn btn-outline-info">Sign-up</button>
                <button className="header-login">Join</button>
            </div>
        </div>
    )
}

export default Header