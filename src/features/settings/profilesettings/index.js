import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import md5 from 'md5'
import { showNotification } from '../../common/headerSlice'
import { login } from '../../common/userSlice'
import query from "../../../utils/query"
import TitleCard from "../../../components/Cards/TitleCard"
import AvatarUploader from "../../common/components/AvatarUploader"
import { useTranslation } from "react-i18next"
import i18next from "i18next"

function ProfileSettings() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const avatarRef = useRef()

    const { user } = useSelector(state => state.user)

    const [userInfo, setUserInfo] = useState({ name: '', email: '', pwd: '', pwd_confirm: '' })

    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        if (user?.name == userInfo.name && userInfo.pwd.length == 0) setIsUpdated(false)
        else setIsUpdated(true)
    }, [user, userInfo])

    // Call API to update profile settings changes
    const updateProfile = async () => {
        const updateInfo = { name: userInfo.name }

        const avatar = await avatarRef.current.upload()
        if (avatar)
            updateInfo.avatar = avatar._id

        if (userInfo.pwd.length > 0) {
            if (userInfo.pwd.length < 8) {
                dispatch(showNotification({ message: i18next.t('password_length_validation'), status: 0 }))
                return
            }
            if (userInfo.pwd != userInfo.pwd_confirm) {
                dispatch(showNotification({ message: i18next.t('password_confirm_error'), status: 0 }))
                return
            }
            updateInfo.pwd = md5(userInfo.pwd)
        }
        query.put(`/profile`, updateInfo, () => {
            query.get('/login', (data) => {
                dispatch(login(data.user))
            })
        })
    }

    useEffect(() => {
        const updateInfo = { ...userInfo }
        updateInfo.name = user?.name
        updateInfo.email = user?.email
        setUserInfo(updateInfo)
    }, [user])

    const onChange = (e) => {
        const updateInfo = { ...userInfo }
        updateInfo[e.target.name] = e.target.value
        setUserInfo(updateInfo)
    }

    return (
        <>
            <TitleCard title={t('profile_setting')} topMargin="mt-2">
                <div className="flex justify-center">
                    <AvatarUploader src={user ? `${process.env.REACT_APP_BASE_URL}file/${user.avatar}` : '/assets/avatar/default.png'} ref={avatarRef} onUpdate={() => setIsUpdated(true)}/>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className='form-control w-full'>
                        <label className="label">
                            <span className='label-text text-base-content'>{t('name')}</span>
                        </label>
                        <input type='text' className="input input-bordered w-full" name='name' defaultValue={userInfo.name} onChange={onChange} />
                    </div>
                    <div className='form-control w-full'>
                        <label className="label">
                            <span className='label-text text-base-content'>{t('email')}</span>
                        </label>
                        <input type='text' className="input input-bordered w-full" name='email' defaultValue={userInfo.email} onChange={onChange} disabled />
                    </div>
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-2 gap-6">
                    <div className='form-control w-full'>
                        <label className="label">
                            <span className='label-text text-base-content'>{t('pwd')}</span>
                        </label>
                        <input type='password' className="input input-bordered w-full" name='pwd' onChange={onChange} />
                    </div>
                    <div className='form-control w-full'>
                        <label className="label">
                            <span className='label-text text-base-content'>{t('pwd_confirm')}</span>
                        </label>
                        <input type='password' className="input input-bordered w-full" name='pwd_confirm' onChange={onChange} />
                    </div>
                </div>
                <div className="mt-16">
                    <button disabled={!isUpdated} className="btn btn-primary float-right" onClick={() => updateProfile()}>{t('update')}</button>
                </div>
            </TitleCard>
        </>
    )
}

export default ProfileSettings