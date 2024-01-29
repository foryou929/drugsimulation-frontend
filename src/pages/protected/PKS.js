import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '../../features/common/headerSlice'
import PKS from '../../features/PKS/index'
import TitleCard from '../../components/Cards/TitleCard'

function PKSPage() {
    const { user } = useSelector(state => state.user)
    const { t } = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Pharmacokinetic" }))
    }, [])

    if (user?.paid) {
        return <PKS />
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

export default PKSPage