import React, { useState, useEffect } from 'react'
import "./Header.scss"
import { Component } from '..'
import { useNavigate } from "react-router-dom"

const Header = () => {

    const [isShowSearch, setIsShowSearch] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (window.location.pathname === "/" || window.location.pathname) {
            setIsShowSearch(false)
        }
    }, [])

    return (
        <div className="header content-width-padding content-height-padding row align-items-center mx-0">
            <span className="header-logo col-2 fs-3" onClick={() => navigate("/")}>Free Wallpaper</span>
            <div className='col-7 header-search'>
                {isShowSearch &&
                    <Component.Search />
                }
            </div>
            <div className='col-3 d-flex justify-content-end align-items-center gap-3'>
                <button className='header-explore'>Explore <i class="fa-solid fa-chevron-down"></i></button>
                <button className="header-sign-up">Sign-up</button>
                <button className="header-login">Join</button>
            </div>
        </div>
    )
}

export default Header