import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Calendar from '../../features/calendar'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: 'calendar' }))
    }, [])

    return (
        <Calendar />
    )
}

export default InternalPage