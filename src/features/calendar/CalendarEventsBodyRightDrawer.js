function CalendarEventsBodyRightDrawer({filteredEvents}){
    return(
        <>
             {
                filteredEvents.map((e, k) => {
                    return <div key={k} className={`grid mt-3 card  rounded-box p-3`}>
                            {e.title}
                        </div> 
                })
            }
        </>
    )
}

export default CalendarEventsBodyRightDrawer