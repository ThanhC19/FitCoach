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
  const titleDate = dayjs(selectedDate).format("ddd, MMM D");

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Day’s Activity
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
          {titleDate}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {error && <Alert severity="error">{error}</Alert>}

        {loading ? (
          <Box sx={{ display: "grid", gap: 1 }}>
            <Skeleton height={32} />
            <Skeleton height={32} />
            <Skeleton height={32} />
          </Box>
        ) : (
          <List dense disablePadding>
            {!activities?.length ? (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No activities for this day.
              </Typography>
            ) : (
              activities.map((a) => (
                <ListItem
                  key={a.Activity_ID ?? `${a.start}-${a.Title}`}
                  sx={{ px: 0 }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 700 }}>
                        {dayjs(a.start).format("HH:mm")} — {a.Title}
                      </Typography>
                    }
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
