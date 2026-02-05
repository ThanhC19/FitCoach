import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import Calendar from "../calendar/calendar";
import DayActivities from "../dayActivities/dayActivities";
import { getGoal } from "../../services/goalsService";
import { getActivities } from "../../services/activitiesService";

export default function Home({ refreshTrigger }) {
  // Full list of activities for the current goal
  const [events, setEvents] = useState([]);

  // Currently selected day (default: today). We keep it as "YYYY-MM-DD"
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  // Fetch goal + month activities:
  // - runs on first render
  // - runs again after schedule generation (refreshTrigger changes)
  useEffect(() => {
    const init = async () => {
      try {
        // Get the user's current goal
        const g = await getGoal();

        // If the goal exists, fetch all activities for that GoalID
        if (g?.GoalID) {
          const month = await getActivities(g.GoalID);
          setEvents(month);
        } else {
          // No goal yet → no events to show
          setEvents([]);
        }
      } catch (err) {
        console.error("Home init failed:", err);
        setEvents([]);
      }
    };

    init();
  }, [refreshTrigger]);

  // Build the right-side panel list from the already-fetched month events
  const dayActivities = useMemo(() => {
    if (!selectedDate) return [];

    // Filter activities whose start date matches the selected date (local timezone)
    return events.filter((a) =>
      dayjs(a.start).isSame(dayjs(selectedDate), "day"),
    );
  }, [events, selectedDate]);

  return (
    // Two-column layout: Calendar on the left, Day Activities panel on the right
    <div className="flex gap-6">
      <div className="flex-1">
        <Calendar
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      <div className="w-[320px]" style={{ marginRight: 24 }}>
        <DayActivities
          selectedDate={selectedDate}
          activities={dayActivities}
          loading={false}
        />
      </div>
    </div>
  );
}
