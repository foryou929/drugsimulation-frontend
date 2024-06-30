import i18next from "i18next"
import { useEffect } from "react"
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useDispatch, useSelector } from 'react-redux'

import { removeNotificationMessage } from "../features/common/headerSlice"
import LeftSidebar from "./LeftSidebar"
import PageContent from "./PageContent"
import RightSidebar from './RightSidebar'

import 'react-notifications/lib/notifications.css'

function Layout() {
  const dispatch = useDispatch()
  const { newNotificationMessage, newNotificationStatus } = useSelector(state => state.header)


  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, i18next.t('success'))
      if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, i18next.t('error'))
      dispatch(removeNotificationMessage())
    }
  }, [newNotificationMessage])

  return (
    <>
      <div className="drawer  lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent />
        <LeftSidebar />
      </div>
      <RightSidebar />
      <NotificationContainer />
    </>
  )
}

export default Layout