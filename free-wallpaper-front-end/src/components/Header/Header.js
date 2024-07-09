import React, { useState, useEffect, useContext, useMemo } from 'react'
import "./Header.scss"
import { Component } from '..'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../../contexts/UserContext'
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { UserService } from '../../services/UserService'
import { toast } from 'react-toastify'
import moment from 'moment'

const Header = () => {

    const { user, logoutContext } = useContext(UserContext);
    const [userNotification, setUserNotification] = useState([])

    const notificationCounter = useMemo(() => {
        let newNotifications = 0;
        if (userNotification && userNotification.length > 0) {
            for (let i = 0; i < userNotification.length; i++) {
                if (userNotification[i].isReaded === false) {
                    newNotifications++
                }
            }
        }
        return { newNotifications };
    }, [userNotification])

    const navigate = useNavigate()

    useEffect(() => {
        getUserNotification()
    }, [user])

    const getUserNotification = async () => {
        if (user && user._id) {
            const response = await UserService.getUserNotificationService(user._id)
            if (response.status === 200) {
                if (response.data) {
                    setUserNotification(response.data.notifications);
                    console.log(userNotification)
                }
            }
        }
    }

    const handleClickAvatar = () => {
        switch (user && user.roles.includes("admin")) {
            case true: navigate("/management/account"); break;
            case false: navigate(`/user/${user && user._id}`); break;
            default: break;
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault();
        const response = await UserService.logoutService();
        if (response.status === 200) {
            logoutContext();
            toast.info(response.message);
            navigate('/');
        } else {
            toast.error(response.message);
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
                <div className="dropdown dropdown-right">
                    <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Explore <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Hostest Images</a></li>
                        <li><a className="dropdown-item" href="#">Top Contributors</a></li>
                        <li><a className="dropdown-item" href="#">Full Collections</a></li>
                    </ul>
                </div>
                {user && user.isActived === true ?
                    <>
                        <div className='dropdown dropdown-center header-user-notification'>
                            <i className="dropdown-toggle header-user-notification-icon fs-5 fa-solid fa-bell" data-bs-toggle="dropdown" aria-expanded="false">
                                {notificationCounter.newNotifications > 0 &&
                                    <div className='header-user-notification-number'>{notificationCounter.newNotifications}</div>
                                }
                            </i>
                            <ul className="dropdown-menu bg-white">
                                {userNotification && userNotification.length > 0 ?
                                    <>
                                        {userNotification.sort((a, b) => { return - (a.date - b.date) }).map((item, index) => {
                                            return (
                                                <li key={"notification-" + item._id} className={item.isReaded ? "bg-white-2" : ""}>
                                                    <Link className="dropdown-item" to={item.link}>
                                                        <div>{item.body}</div>
                                                        <div className='text-secondary font-size-12 text-end'>{moment(item.date).fromNow()}</div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </>
                                    :
                                    <li>No notification</li>
                                }
                            </ul>
                        </div>

                        <div onClick={() => handleClickAvatar()} className="header-user-avatar" style={{ backgroundImage: `url(${(user && user.avatar) || user_avatar_raw})` }}></div>
                        <button onClick={(event) => handleLogout(event)} className="header-logout btn btn-warning">Logout</button>
                    </>
                    :
                    <>
                        <button onClick={() => navigate("/register")} className="btn btn-outline-info">Sign-up</button>
                        <button onClick={() => navigate("/login")} className="header-login">Join</button>
                    </>
                }

            </div>
        </div>
    )
}

export default Header