import React, { useState, useEffect } from 'react'
import "./Header.scss"
import Search from '../Search/Search'

const Header = () => {

    const [isShowSearch, setIsShowSearch] = useState(true)

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsShowSearch(false)
        }
    }, [])

    return (
        <div className="header content-width-padding content-height-padding row align-items-center mx-0" style={{ backgroundColor: 'white', color: "black" }}>
            <span className="header-logo col-2 fs-3">Free Wallpaper</span>
            <div className='col-7 header-search'>
                {isShowSearch &&
                    <Search />
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