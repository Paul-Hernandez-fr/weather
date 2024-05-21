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
  if (!currentTime || !timezone) return "Invalid time";
  const date = new Date(`${currentTime} ${timezone}`);
  if (isNaN(date.getTime())) return "Invalid time";
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getAMPM = (unitSystem, currentTime, timezone) => {
  if (!currentTime || !timezone) return "";
  const date = new Date(`${currentTime} ${timezone}`);
  if (isNaN(date.getTime())) return "";
  return date.getHours() >= 12 ? "PM" : "AM";
};

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