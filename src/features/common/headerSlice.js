import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        pageTitle: "Home",  // current page title state management
        
        scheduleList: [],

        newNotificationMessage : "",  // message of notification to be shown
        newNotificationStatus : 1,   // to check the notification type -  success/ error/ info
    },
    reducers: {
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload.title
        },

        setScheduleList: (state, action) => {
            state.scheduleList = action.payload.sort((a, b) => {
                if (a.startTime > b.startTime) return 1
                if (a.startTime < b.startTime) return -1
                return 0
            })
        },

        removeNotificationMessage: (state, action) => {
            state.newNotificationMessage = ""
        },

        showNotification: (state, action) => {
            state.newNotificationMessage = action.payload.message
            state.newNotificationStatus = action.payload.status
        },
    }
})

export const { setPageTitle, setScheduleList, removeNotificationMessage, showNotification } = headerSlice.actions

export default headerSlice.reducer