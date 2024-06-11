import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import { routes, adminRoutes } from '../routes/sidebar';
import SidebarSubmenu from './SidebarSubmenu';

function LeftSidebar() {
    const location = useLocation();
    const { t } = useTranslation()

    const { user } = useSelector(state => state.user);

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }

    return (
        <div className="drawer-side  z-30  ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
                <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-2 font-semibold text-xl">

                    <Link to={'/app/calendar'}><img className="mask mask-squircle w-10" src="/logo.png" alt="DashWind Logo" />{t('app_title')}</Link> </li>
                {
                    [...routes, ...(user?.isAdmin ? adminRoutes : [])].map((route, k) => {
                        return (
                            <li className="" key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu {...route} /> :
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`}
                                            onClick={() => close()}
                                        >
                                            {route.icon} {i18next.t(route.name)}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                    aria-hidden="true"></span>) : null
                                            }
                                        </NavLink>)
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar