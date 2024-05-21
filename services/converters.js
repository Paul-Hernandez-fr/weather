export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
};

export const degToCompass = (num) => {
  const val = Math.round(num / 22.5);
  const arr = [
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

export const unixToLocalTime = (isoString, timezone) => {
  try {
    const timestamp = Date.parse(isoString);
    if (isNaN(timestamp)) {
      throw new Error("Invalid ISO string");
    }
    const date = new Date(timestamp + timezone * 1000);
    const timeString = date.toISOString().match(/(\d{2}:\d{2})/)[0];
    return timeString.startsWith("0") ? timeString.substring(1) : timeString;
  } catch (error) {
    console.error("Error converting ISO string to local time:", error);
    return "Invalid time";
  }
};
