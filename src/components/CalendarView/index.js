import { useEffect, useState } from "react";
// import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
// import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import { DatePicker, Select, Popover, Badge } from 'antd'
import { CalendarOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'

import dayjs from "dayjs";
const { Option } = Select;

const color = ['blue', 'red', 'green', 'pink', 'violet', 'yellow']
const Hours = ['0 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']

const EventDetail = ({ item, editEvent, deleteEvent }) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      trigger={"click"}
      open={open}
      onOpenChange={handleOpenChange}
      content={
        <div className="w-80">
          <div className="text-right">
            <div className="inline-block mx-1">
              <EditOutlined className="cursor-pointer" onClick={() => {
                editEvent(item)
                hide()
              }} />
            </div>
            <div className="inline-block mx-1">
              <DeleteOutlined className="cursor-pointer" onClick={() => {
                deleteEvent(item._id)
                hide()
              }} />
            </div>
            <div className="inline-block mx-1">
              <CloseOutlined className="cursor-pointer" onClick={hide} />
            </div>
          </div>
          <div className="font-bold mb-2 break-all"><Badge color={color[item.type]} text={item.title} /></div>
          <p className="text-xs my-2 break-all ml-4">{moment(item.startTime).format("YYYY-MM-DD HH:mm")}</p>
          <p className="my-2 break-all"><CalendarOutlined className="mr-2" />{item.note}</p>
        </div>
      }
    >
      <div className="py-0.5">
        <div className={`bg-${color[item.type]}-500 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer`}>
          <p className='font-bold'>{item.title}</p>
        </div>
      </div>
    </Popover>
  )
}

function CalendarView({ calendarEvents, addEvent, editEvent, deleteEvent/*, openDayDetail*/ }) {
  const today = moment().startOf('day')
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [events, setEvents] = useState([])
  const [currDate, setCurrDate] = useState(moment(today))

  useEffect(() => {
    setEvents(calendarEvents)
  }, [calendarEvents])

  const allDaysInMonth = () => {
    let start = moment(currDate).startOf('month').startOf('week')
    let end = moment(currDate).endOf('month').endOf('week')
    var days = [];
    var day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    return days
  }

  const allDaysInWeek = () => {
    let start = moment(currDate).startOf('week')
    let end = moment(currDate).endOf('week')
    var days = []
    var day = start
    while (day <= end) {
      days.push(day.toDate())
      day = day.clone().add(1, 'd')
    }
    return days
  }

  const getEventsForCurrentDate = (date) => {
    let filteredEvents = events.filter((e) => { return moment(date).isSame(moment(e.startTime), 'day') })
    return filteredEvents
  }

  const getEventsForCurrentDateTime = (datetime) => {
    let filteredEvents = events.filter((e) => { return moment(datetime).isSame(moment(e.startTime), 'day') && moment(datetime).isSame(moment(e.startTime), 'hour') })
    return filteredEvents
  }

  // const openAllEventsDetail = (date, theme) => {
  //   if (theme != "MORE") return 1
  //   let filteredEvents = events.filter((e) => { return moment(date).isSame(moment(e.startTime), 'day') }).map((e) => { return { title: e.title, theme: e.theme } })
  //   openDayDetail({ filteredEvents, title: moment(date).format("D MMM YYYY") })
  // }

  const isToday = (date) => {
    return moment(date).isSame(moment(), 'day');
  }

  const isDifferentMonth = (date) => {
    return moment(date).month() != moment(currDate).month()
  }

  // const getPrevMonth = () => {
  //   const firstDayOfPrevMonth = moment(currDate).add(-1, 'M').startOf('month');
  //   setCurrDate(firstDayOfPrevMonth);
  // };

  // const getCurrentMonth = () => {
  //   const firstDayOfCurrMonth = moment().startOf('month');
  //   setCurrDate(firstDayOfCurrMonth);
  // };

  // const getNextMonth = () => {
  //   const firstDayOfNextMonth = moment(currDate).add(1, 'M').startOf('month');
  //   setCurrDate(firstDayOfNextMonth);
  // };

  const [type, setType] = useState('month')

  return (
    <>
      <div className="w-full bg-base-100 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={type} onChange={setType}>
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
          </Select>
          <DatePicker picker={type} value={dayjs(currDate)} onChange={(date) => { setCurrDate(date.format()) }} allowClear={false} />
        </div>
        {/* <div className="flex items-center justify-between my-2">
          <div className="flex flex-wrap justify-normal gap-2">
            <p className="font-semibold text-xl">
              {moment(currDate).format("MMMM yyyy").toString()}
            </p>
            <div className="flex">
              <button className="btn btn-square btn-sm btn-ghost" onClick={getPrevMonth}>
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button className="btn btn-sm btn-ghost px-2" onClick={getCurrentMonth}>
                Current Month</button>
              <button className="btn btn-square btn-sm btn-ghost" onClick={getNextMonth}>
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="divider my-0" /> */}
        <div className="ml-12 grid grid-cols-7 place-items-center my-2">
          {weekdays.map((day, key) => {
            return (
              <div className="text-xs capitalize" key={key}>
                {day}
              </div>
            );
          })}
        </div>
        {
          type == 'month' ? (
            <div className="grid grid-cols-7 mt-1 place-items-stretch">
              {
                allDaysInMonth().map((day, i) => {
                  return (
                    <div key={i} className={`flex flex-col border border-solid border-base-300 w-full h-32 ${isToday(day) && "bg-blue-100 dark:bg-base-200 dark:text-white"} ${isDifferentMonth(day) && "text-slate-400 dark:text-slate-600"}`}>
                      <div className="text-center py-0.5">{moment(day).format("D")}</div>
                      <div className="px-0.5 overflow-y-scroll">
                        {
                          getEventsForCurrentDate(day).map((item, k) => <EventDetail key={k} item={item} editEvent={editEvent} deleteEvent={deleteEvent} />)
                        }
                      </div>
                      <div className="py-0.5 grow text-xs flex justify-center items-end text-[#8884] cursor-pointer" onClick={() => addEvent(day)} >+</div>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div className="flex flex-wrap">
              <div className="w-full grid grid-cols-7 ml-10">
                {
                  allDaysInWeek().map((day, j) => <div key={j} className="text-center">{moment(day).format("D")}</div>)
                }
              </div>
              <div className="w-full">
                {
                  Hours.map((hour, i) => {
                    return (
                      <div key={i} className="flex h-16 border-t last:border-b border-dotted border-base-300">
                        <div className="w-10 flex-none">
                          <p className="text-xs">{hour}</p>
                        </div>
                        <div className="w-full grid grid-cols-7">
                          {
                            allDaysInWeek().map((day, j) => {
                              const datetime = moment(day).clone().add(i, 'h')
                              return (
                                <div key={j} className="border-l last:border-r border-base-300 flex flex-col h-16">
                                  <div className="px-0.5 overflow-y-scroll">
                                    {
                                      getEventsForCurrentDateTime(datetime).map((item, k) => <EventDetail key={k} item={item} editEvent={editEvent} deleteEvent={deleteEvent} />)
                                    }
                                  </div>
                                  <div className="pb-0.5 grow text-xs flex justify-center items-end text-[#8884] cursor-pointer" onClick={() => addEvent(datetime)} >+</div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div >
    </>
  )
}

export default CalendarView