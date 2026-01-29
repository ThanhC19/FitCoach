import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// Convert "HH:mm" to minutes
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function Goals() {
  // workout goal
  const [goal, setGoal] = useState("");

  // allowed days (multiple)
  const [days, setDays] = useState([]);

  // Single time slot
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Validation message for the time slot
  const [timeError, setTimeError] = useState("");

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  // ToggleButtonGroup returns an array for multiple selection
  const handleDaysChange = (event, newDays) => {
    //fallback
    setDays(newDays ?? []);
  };

  // Validate the single time slot whenever the user changes start/end.
  useEffect(() => {
    setTimeError("");

    // Don't show an error until both are selected.
    if (!startTime || !endTime) return;

    const start = startTime.format("HH:mm");
    const end = endTime.format("HH:mm");

    if (toMinutes(start) >= toMinutes(end)) {
      setTimeError("End time must be later than start time.");
    }
  }, [startTime, endTime]);

  // Build the payload to send to the server
  // const payload = useMemo(() => {
  //   // a slot is valid only when both times exist AND start is strictly earlier than end
  //   const hasValidSlot =
  //     startTime &&
  //     endTime &&
  //     toMinutes(startTime.format("HH:mm")) < toMinutes(endTime.format("HH:mm"));

  //   return {
  //     Goal: goal,
  //     AvailableDays: days,
  //     time_slots: hasValidSlot
  //       ? [
  //           {
  //             start: startTime.format("HH:mm"),
  //             end: endTime.format("HH:mm"),
  //           },
  //         ]
  //       : [],
  //   };
  // }, [goal, days, startTime, endTime]);

  // TODO Send payload to the server when our API get ready
  // const handleSubmit = () => {};

  return (
    <Box sx={{ minWidth: 150 }}>
      {/* spacing for MUI parts */}
      <Stack spacing={7}>
        {/* Goals */}
        <FormControl fullWidth>
          <InputLabel id="workout-goal-label">Workout goal</InputLabel>
          <Select
            labelId="workout-goal-label"
            id="workout-goal"
            value={goal}
            label="goal"
            onChange={handleGoalChange}
          >
            <MenuItem value={"LOSE_WEIGHT"}>Lose weight</MenuItem>
            <MenuItem value={"GAIN_MUSCLE"}>Gain muscle</MenuItem>
            <MenuItem value={"GET_STRONGER"}>Get stronger</MenuItem>
            <MenuItem value={"IMPROVE_FITNESS"}>Improve fitness</MenuItem>
          </Select>
        </FormControl>

        {/* Allows days */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel shrink id="allowed-days-label" htmlFor="allowed-days">
            Allowed days
          </InputLabel>

          <ToggleButtonGroup
            id="allowed-days"
            aria-labelledby="allowed-days-label"
            value={days}
            onChange={handleDaysChange}
            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          >
            {DAYS.map((d) => (
              <ToggleButton key={d} value={d} aria-label={d}>
                {d}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </FormControl>

        {/* time slot */}
        <Box sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <TimePicker
                  label="Start time"
                  ampm={false}
                  format="HH:mm"
                  minutesStep={5}
                  value={startTime}
                  onChange={setStartTime}
                />
                <TimePicker
                  label="End time"
                  ampm={false}
                  format="HH:mm"
                  minutesStep={5}
                  value={endTime}
                  onChange={setEndTime}
                />
              </Stack>
            </DemoContainer>
          </LocalizationProvider>

          {timeError && (
            <Alert sx={{ mt: 2 }} severity="error">
              {timeError}
            </Alert>
          )}
        </Box>
        {/* debug */}
        {/* <pre>{JSON.stringify(payload, null, 2)}</pre> */}

        {/* Generate Schedule Button  */}
        <Button
          onClick={() => {}}
          variant="contained"
          startIcon={<AutoAwesomeIcon sx={{ fontSize: 18 }} />}
          sx={{
            mt: "auto",
            alignSelf: "center",
            px: 2.5,
            py: 1,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(90deg, #6D28D9, #A855F7)",
            boxShadow: "0 8px 20px rgba(168, 85, 247, 0.25)",
            "&:hover": {
              background: "linear-gradient(90deg, #5B21B6, #9333EA)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Get schedule from coach
        </Button>
      </Stack>
    </Box>
  );
}
