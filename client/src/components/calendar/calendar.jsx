import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";

export default function Calendar({ events, selectedDate, onSelectDate }) {
  const formattedEvents = events?.map((activity) => ({
    id: activity.Activity_ID,
    title: activity.Title,
    start: activity.start,
    end: activity.end,
    extendedProps: {
      // Custom data bucket
      description: activity.Description,
    },
  }));

  // reduced  width to 75%
  return (
    <div className="w-3/4 mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={selectedDate ? dayjs(selectedDate).toDate() : undefined}
        weekends={true}
        events={formattedEvents}
        contentHeight="auto"
        eventContent={renderEventContent}
        dateClick={(info) => {
          console.log("clicked:", info.dateStr);
          // info.dateStr is "YYYY-MM-DD"
          onSelectDate?.(info.dateStr);
        }}
        dayCellClassNames={(arg) => {
          // highlight selected day
          if (!selectedDate) return [];
          const isSelected = dayjs(arg.date).isSame(dayjs(selectedDate), "day");
          return isSelected ? ["selected-day-cell"] : [];
        }}
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
