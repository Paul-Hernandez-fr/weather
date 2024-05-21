export default async function handler(req, res) {
  const { latitude, longitude } = req.body;

  console.log(`Received latitude: ${latitude}, longitude: ${longitude}`);

  if (!latitude || !longitude) {
    console.error("Missing latitude or longitude");
    return res.status(400).json({
      message: "Missing latitude or longitude",
      error: true,
    });
  }

  try {
    console.log(
      `Fetching data for Latitude: ${latitude}, Longitude: ${longitude}`
    );
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m,winddirection_10m,visibility&daily=sunrise,sunset&timezone=auto`
    );

    console.log(`Open-Meteo Response Status: ${response.status}`);
    if (!response.ok) {
      console.error(`Error fetching data from Open-Meteo: ${response.status}`);
      return res.status(response.status).json({
        message: "Error fetching data from Open-Meteo",
        error: true,
      });
    }

    const data = await response.json();
    console.log("Open-Meteo Data:", data);

    // Assurez-vous que toutes les propriétés nécessaires sont présentes
    const currentTemp = data.hourly?.temperature_2m?.[0];
    const windSpeed = data.hourly?.windspeed_10m?.[0];
    const windDirection = data.hourly?.winddirection_10m?.[0];
    const visibility = data.hourly?.visibility?.[0];
    const sunrise = data.daily?.sunrise?.[0];
    const sunset = data.daily?.sunset?.[0];
    const timezoneOffset = data.timezone_offset || 7200;

    if (
      typeof currentTemp === "undefined" ||
      typeof windSpeed === "undefined" ||
      typeof windDirection === "undefined" ||
      typeof visibility === "undefined" ||
      typeof sunrise === "undefined" ||
      typeof sunset === "undefined"
    ) {
      console.error("Data corrupted or missing: some values are undefined.");
      return res.status(500).json({
        message: "Data corrupted or missing: some values are undefined.",
        error: true,
      });
    }

    // Reformatez les données pour correspondre à la structure de vos composants
    const formattedData = {
      main: {
        temp: currentTemp,
        humidity: 50, // Fournissez une valeur correcte ici
      },
      wind: {
        speed: windSpeed,
        deg: windDirection,
      },
      visibility: visibility,
      weather: [
        {
          description: "Clear sky",
          icon: "01d", // Icône appropriée
        },
      ],
      sys: {
        country: "FR", // Assurez-vous que ce soit correct
        sunrise: sunrise,
        sunset: sunset,
      },
      name: "Lyon", // Ajoutez ici le nom de la ville
      dt: Math.floor(Date.now() / 1000),
      timezone: timezoneOffset,
    };

    console.log("Formatted Data:", formattedData);
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
}

export default async function handler(req, res) {
  const { cityInput } = req.body;
  const getWeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
