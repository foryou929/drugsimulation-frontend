import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import i18next from 'i18next'

const request = async (method, url, data, success, error) => {
    try {
        const result = await axios.request({ method, url, data })
        if (result.data?.message)
            NotificationManager.success(i18next.t(result.data?.message), i18next.t('success'))
        if (success)
            success(result.data)
        return result.data
    } catch (err) {
        NotificationManager.error(i18next.t(err.response?.data?.message) || err.message, i18next.t('error'))
        if (error)
            error(err.response?.data)
    }
}

export default {
    post: async (url, data, success, error) => {
        return await request("post", url, data, success, error)
    },

    get: async (url, success, error) => {
        return await request("get", url, {}, success, error)
    },

    put: async (url, data, success, error) => {
        return await request("put", url, data, success, error)
    },

    delete: async (url, success, error) => {
        return await request("delete", url, {}, success, error)
    },

    upload: async (url, files, success, error) => {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++)
            formData.append(`files`, files[i])
        return await request("post", url, formData, success, error)
    }
}