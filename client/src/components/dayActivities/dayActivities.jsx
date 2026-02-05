import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Skeleton,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";

export default function DayActivitiesPanel({
  selectedDate,
  activities,
  loading,
  error,
}) {
  // Format the selected date for the panel header
  const titleDate = dayjs(selectedDate).format("ddd, MMM D");

  return (
    // Panel container (border + shadow to make it stand out)
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        {/* Panel title + selected date */}
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Day’s Activity
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
          {titleDate}
        </Typography>

        {/* Visual separator between header and content */}
        <Divider sx={{ my: 2 }} />

        {/* API / UI error message */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Loading state: show skeleton rows while data is being fetched */}
        {loading ? (
          <Box sx={{ display: "grid", gap: 1 }}>
            <Skeleton height={32} />
            <Skeleton height={32} />
            <Skeleton height={32} />
          </Box>
        ) : (
          // Loaded state: render activities for the selected day
          <List dense disablePadding>
            {/* Empty state */}
            {!activities?.length ? (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No activities for this day.
              </Typography>
            ) : (
              // Activity list items
              activities.map((a) => (
                <ListItem
                  key={a.Activity_ID ?? `${a.start}-${a.Title}`}
                  sx={{ px: 0 }}
                >
                  <ListItemText
                    // Primary line: time range + title
                    primary={
                      <Typography sx={{ fontWeight: 700 }}>
                        {dayjs(a.start).format("HH:mm")} — {a.Title}
                      </Typography>
                    }
                    // Secondary line: description (optional)
                    secondary={a.Description || ""}
                  />
                </ListItem>
              ))
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
