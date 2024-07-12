import React, { useState, useEffect, useContext, useMemo } from 'react'
import "./Header.scss"
import { Component } from '..'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../../contexts/UserContext'
import user_avatar_raw from "../../assets/icon/icon-avatar-placeholder.png"
import { UserService } from '../../services/UserService'
import { toast } from 'react-toastify'
import moment from 'moment'
import { socket } from "../../App"

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

    useEffect(() => {
        socket.on("newNotification", (data) => {
            if (user && data.userId === user._id) {
                const notifications = [...userNotification]
                notifications.push(data.notification)
                setUserNotification(notifications)
            }
        })
        return () => {
            socket.off("newNotification");
        };
    }, [socket, user, userNotification])

    const getUserNotification = async () => {
        if (user && user._id) {
            const response = await UserService.getUserNotificationService(user._id)
            if (response.status === 200) {
                if (response.data) {
                    setUserNotification(response.data.notifications);
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

    const markReadNotification = async (notificationID, link, isReaded) => {
        if (!isReaded) {
            await UserService.markReadNotificationService({ userId: user._id, notificationId: notificationID })
            const notifications = [...userNotification]
            const matchedNotificationIndex = notifications.findIndex((n) => n._id === notificationID);
            notifications[matchedNotificationIndex].isReaded = true
            setUserNotification(notifications)
        }
        navigate(link)
    }

    return (
        <div className="header content-width-padding row align-items-center justify-content-between mx-0">
            <span className="header-logo col-2 fs-2" onClick={() => navigate("/")}>Free Wallpaper</span>
            <div className='col-7 d-none d-lg-block header-search'>
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
                        <li><Link className="dropdown-item" to="/">Hostest Images</Link></li>
                        <li><Link className="dropdown-item" to="/">Top Contributors</Link></li>
                        <li><Link className="dropdown-item" to="/">Full Collections</Link></li>
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
                                                    <div className="dropdown-item" onClick={() => markReadNotification(item._id, item.link, item.isReaded)}>
                                                        <div>{item.body}</div>
                                                        <div className='text-secondary font-size-12 text-end'>{moment(item.date).fromNow()}</div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </>
                                    :
                                    <li>No notification</li>
                                }
                            </ul>
                        </div>

                        <img onClick={() => handleClickAvatar()} className="header-user-avatar" alt='avatar' src={(user && user.avatar) || user_avatar_raw} />
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