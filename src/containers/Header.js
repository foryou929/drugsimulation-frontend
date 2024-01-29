import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from "react-i18next";

import moment from 'moment';
import { Switch } from 'antd';

import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';

import { themeChange } from 'theme-change';

import Avatar from '../features/common/components/Avatar';
import { setScheduleList } from '../features/common/headerSlice';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { logout } from '../features/common/userSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil';

import query from "../utils/query";

function Header({ onChangeTheme }) {
    const { i18n, t } = useTranslation();
    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const { pageTitle, scheduleList } = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
    const [checkedNotify, setCheckedNotify] = useState({})
    const [noOfNotifications, setNoOfNotifications] = useState(0)

    useEffect(() => {
        let count = 0
        scheduleList.map(schedule => {
            if (moment(schedule.startTime) > moment())
                count++
        })
        setNoOfNotifications(count)
    }, [scheduleList])

    setInterval(() => {
        scheduleList.map(schedule => {
            if (checkedNotify[schedule._id]) return
            if (moment(schedule.startTime) > moment()) {
                const timeDifference = moment(schedule.startTime).diff(moment(), 'seconds');
                if (timeDifference < schedule.notifyBefore) {
                    checkedNotify[schedule._id] = true
                    NotificationManager.warning(schedule.note, schedule.title, 10000)
                }
            }
        })
    }, 1000)

    useEffect(() => {
        query.get('/schedule', (res) => {
            dispatch(setScheduleList(res.result))
        })
    }, [])

    useEffect(() => {
        themeChange(false)
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setCurrentTheme("dark")
                document.getElementsByTagName("html")[0].className = "dark";
            } else {
                setCurrentTheme("light")
                document.getElementsByTagName("html")[0].className = "";
            }
        }
        // 👆 false parameter is required for react project
    }, [])

    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }))
    }

    function logoutUser() {
        dispatch(logout())
        localStorage.removeItem('token');
        window.location.href = '/'
    }

    return (
        // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md
        <>
            <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">

                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        <Bars3Icon className="h-5 inline-block w-5" /></label>
                    <h1 className="text-2xl font-semibold ml-2 invisible md:visible">{t(pageTitle)}</h1>
                </div>

                <div className="flex-none ">
                    {/* Language selection toggle **/}
                    <div className='px-4 flex items-center'>
                        <span className='px-2 text-lg font-bold'>あ/A</span>
                        <Switch
                            defaultChecked={localStorage.getItem('lang') == 'en'}
                            onChange={(checked) => {
                                let lang = 'ja'
                                if (checked) lang = 'en'
                                i18n.changeLanguage(lang)
                                localStorage.setItem('lang', lang)
                            }}
                        />
                    </div>

                    {/* Light and dark theme selection toggle **/}
                    <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")} onClick={() => onChangeTheme('light')} />
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")} onClick={() => onChangeTheme('dark')} />
                    </label>

                    {/* Notification icon */}
                    <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                        <div className="indicator">
                            <BellIcon className="h-6 w-6" />
                            {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null}
                        </div>
                    </button>

                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Avatar src={user ? `${process.env.REACT_APP_BASE_URL}file/${user.avatar}` : '/assets/avatar/default.png'} fallbackSrc={'/assets/avatar/default.png'} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                                <Link to={'/app/settings-profile'}>{t('profile_setting')}</Link>
                            </li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={logoutUser}>{t('logout')}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header