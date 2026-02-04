import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar({ events }) {
  
const formattedEvents = events?.map(activity => ({
  id: activity.Activity_ID,
  title: activity.Title, 
  start: activity.start, 
  end: activity.end, 
  extendedProps: { // Custom data bucket
    description: activity.Description 
  }
}));
 
 // reduced  width to 75% 
  return (
    <div className="w-3/4 mx-auto"> 
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={formattedEvents}
        contentHeight="auto"
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="p-1 overflow-hidden">
      <i className="text-xs whitespace-nowrap">{eventInfo.event.title}</i>
    </div>
  );
}
