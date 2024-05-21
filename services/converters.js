export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const unixToLocalTime = (unixSeconds, timezone) => {
  if (typeof unixSeconds !== "number" || typeof timezone !== "number") {
    console.error(
      "Invalid unixSeconds or timezone value:",
      unixSeconds,
      timezone
    );
    return "Invalid time";
  }

  let date = new Date((unixSeconds + timezone) * 1000);
  if (isNaN(date.getTime())) {
    console.error("Invalid date created:", date);
    return "Invalid time";
  }

  let time = date.toISOString().match(/(\d{2}:\d{2})/)[0];
  return time.startsWith("0") ? time.substring(1) : time;
};