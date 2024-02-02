import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '../../features/common/headerSlice'
import AES from '../../features/AES/index'
import TitleCard from '../../components/Cards/TitleCard'

function AESPage() {
    const { user } = useSelector(state => state.user)
    const { t } = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Anesthetic Effect" }))
    }, [])

    if (user?.paid || user?.isAdmin) {
        return <AES />
    } else {
        return (
            <TitleCard className="w-full" title={"Dose and Effect site concentration (Table)"}>
                {
                    t('you_have_no_permission_please_pay')
                }
            </TitleCard>
        )
    }
}

export default AESPage