import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Modal, Input, DatePicker, Select } from 'antd'

import dayjs from 'dayjs'

import TitleCard from "../../components/Cards/TitleCard"
import CalendarView from '../../components/CalendarView'
import { setScheduleList } from '../common/headerSlice'
import { showNotification } from '../common/headerSlice'

import query from '../../utils/query'

const scheduleTypes = [
    { value: 0, label: 'other' },
    { value: 1, label: 'clinic_time' },
    { value: 2, label: 'operation_time' },
    { value: 3, label: 'consultation' },
    { value: 4, label: 'meeting' },
    { value: 5, label: 'birthday' },
]

const notifyOptions = [
    { value: 0, label: 'none' },
    { value: 300, label: '5min' },
    { value: 900, label: '15min' },
    { value: 1800, label: '30min' },
    { value: 3600, label: '1h' },
    { value: 10800, label: '3h' },
    { value: 21600, label: '6h' },
    { value: 43200, label: '12h' },
    { value: 86400, label: '1day' },
]

function Calendar() {
    const { t } = useTranslation()
    const [modal, contextHolder] = Modal.useModal();

    const dispatch = useDispatch()

    const { scheduleList } = useSelector(state => state.header)

    // Add your own Add Event handler, like opening modal or random event addition

    const addEvent = (day) => {
        let startTime = day
        let type = 0
        let notifyBefore = 0
        let title = ''
        let note = ''

        modal.confirm({
            title: t('new_schedule'),
            okType: 'default',
            okText: t('ok'),
            cancelText: t('cancel'),
            mask: false,
            content:
                <div>
                    <p className='my-2'>{t('type')}:</p>
                    <Select
                        className='w-full'
                        defaultValue={type}
                        options={scheduleTypes.map(type => ({ value: type.value, label: t(type.label) }))}
                        onChange={v => type = v}
                    />
                    <p className='my-2'>{t('notifySetting')}:</p>
                    <Select
                        className='w-full'
                        defaultValue={notifyBefore}
                        options={notifyOptions.map(notify => ({ value: notify.value, label: t(notify.label) }))}
                        onChange={v => notifyBefore = v}
                    />
                    <p className='my-2'>{t('datetime')}:</p>
                    <DatePicker
                        className='w-full'
                        showTime
                        defaultValue={dayjs(startTime)}
                        format={'MM/DD/YYYY HH:mm'}
                        onChange={(e) => startTime = e}
                        allowClear={false}
                    />
                    <p className='my-2'>{t('title')}:</p>
                    <Input onChange={(e) => title = e.target.value} />
                    <p className='my-2'>{t('note')}:</p>
                    <Input.TextArea maxLength={1000} className='max-h-48' onChange={e => note = e.target.value} />
                </div>,
            onOk: (cb) => {
                if (title.trim().length == 0 || note.trim().length == 0) {
                    dispatch(showNotification({ message: t('please_input_schedule_info'), status: 0 }))
                    return
                }
                query.post('/schedule', { type, startTime, title, note, notifyBefore }, (data) => {
                    dispatch(setScheduleList([...scheduleList, data.result]))
                    cb()
                })
            },
        })
    }

    const deleteEvent = (_id) => {
        query.delete(`/schedule/${_id}`, () => {
            dispatch(setScheduleList(scheduleList.filter(event => event._id != _id)))
        })
    }

    const editEvent = (schedule) => {
        let { _id, startTime, type, title, note, notifyBefore } = schedule

        modal.confirm({
            title: t('edit_schedule'),
            okType: 'default',
            okText: t('ok'),
            cancelText: t('cancel'),
            mask: false,
            content:
                <div>
                    <p className='my-2'>{t('type')}:</p>
                    <Select
                        className='w-full'
                        defaultValue={type}
                        options={scheduleTypes.map(type => ({ value: type.value, label: t(type.label) }))}
                        onChange={v => type = v}
                    />
                    <p className='my-2'>{t('notifySetting')}:</p>
                    <Select
                        className='w-full'
                        defaultValue={notifyBefore}
                        options={notifyOptions.map(notify => ({ value: notify.value, label: t(notify.label) }))}
                        onChange={v => notifyBefore = v}
                    />
                    <p className='my-2'>{t('datetime')}:</p>
                    <DatePicker
                        className='w-full'
                        showTime
                        defaultValue={dayjs(startTime)}
                        format={'MM/DD/YYYY HH:mm'}
                        onChange={(e) => startTime = e}
                        allowClear={false}
                    />
                    <p className='my-2'>{t('title')}:</p>
                    <Input defaultValue={title} onChange={(e) => title = e.target.value} />
                    <p className='my-2'>{t('note')}:</p>
                    <Input.TextArea defaultValue={note} maxLength={1000} className='max-h-48' onChange={e => note = e.target.value} />
                </div>,
            onOk: (cb) => {
                if (title.trim().length == 0 || note.trim().length == 0) {
                    dispatch(showNotification({ message: t('please_input_schedule_info'), status: 0 }))
                    return
                }
                query.put(`/schedule/${_id}`, { type, startTime, title, note, notifyBefore }, (data) => {
                    dispatch(setScheduleList(scheduleList.map(event => {
                        if (event._id == _id)
                            return data.result
                        return event;
                    })))
                    cb()
                })
            },
        })
    }

    return (
        <>
            {contextHolder}
            <TitleCard title={t('calendar')}>
                <CalendarView
                    calendarEvents={scheduleList}
                    addEvent={addEvent}
                    editEvent={editEvent}
                    deleteEvent={deleteEvent}
                />
            </TitleCard>
        </>
    )
}

export default Calendar