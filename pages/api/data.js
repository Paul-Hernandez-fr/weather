import fetch from "node-fetch";

export default async function handler(req, res) {
  const cityData = {
    latitude: 45.7485,
    longitude: 4.8467,
    name: "Lyon",
  };

  const { latitude, longitude } = cityData;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({
        message: "Error fetching data from Open-Meteo",
        error: true,
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
}
