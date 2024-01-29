import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import query from "../../../utils/query"
import { setScheduleList } from "../headerSlice"
import { CloseOutlined } from '@ant-design/icons'

const color = ['blue', 'red', 'green', 'pink', 'violet', 'yellow']

function NotificationBodyRightDrawer() {
    const dispatch = useDispatch()
    const { scheduleList } = useSelector(state => state.header)

    const deleteEvent = (_id) => {
        query.delete(`/schedule/${_id}`, () => {
            dispatch(setScheduleList(scheduleList.filter(event => event._id != _id)))
        })
    }

    return (
        <>
            {
                scheduleList.map((schedule, i) => {
                    if (moment(schedule.startTime) < moment())
                        return
                    return <div key={i} className={`relative grid mt-3 card bg-${color[schedule.type]}-500 text-white rounded px-6 py-4`}>
                        <p className="font-bold">{schedule.title}</p>
                        <p className="break-all">{schedule.note}</p>
                        <div className="absolute right-2 bottom-1 text-xs">
                            {
                                moment(schedule.startTime).format('MM/DD/YYYY HH:mm')
                            }
                        </div>
                        <CloseOutlined className="absolute right-2 top-2 hover:text-gray-500" onClick={() => deleteEvent(schedule._id)} />
                    </div>
                })
            }
        </>
    )
}

export default NotificationBodyRightDrawer