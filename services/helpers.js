import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem === "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem === "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentTime, timezone) => {
  console.log("getTime - currentTime:", currentTime, "timezone:", timezone);
  if (!currentTime || !timezone) return "Invalid time";
  return unixToLocalTime(currentTime, timezone);
};

export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial" && currentTime
    ? new Date(currentTime * 1000).getHours() >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (unixTime, timezone) => {
  if (!unixTime || !timezone) return "Invalid date";
  const date = new Date((unixTime + timezone) * 1000);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[date.getUTCDay()];
};
