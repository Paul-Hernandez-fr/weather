import { useState, useEffect } from "react";
import cities from "../public/cities.json";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

const fetchWeatherData = async (cityName) => {
  const city = cities.find(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!city) {
    console.error(`City not found: ${cityName}`);
    return { message: "City not found" };
  }

  console.log(`Fetching weather data for ${city.name}`);
  const response = await fetch("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      latitude: city.latitude,
      longitude: city.longitude,
    }),
  });

  if (!response.ok) {
    console.error(`Error fetching data from Open-Meteo: ${response.status}`);
    return { message: "Error fetching data from Open-Meteo" };
  }

  const data = await response.json();
  return { ...data, name: city.name };
};

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  const getData = async () => {
    const data = await fetchWeatherData("Lyon"); // Changez "Lyon" par la ville par défaut souhaitée
    setWeatherData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const changeSystem = () =>
    unitSystem === "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData?.name}
        country={weatherData?.sys?.country}
        description={weatherData?.weather?.[0]?.description}
        iconName={weatherData?.weather?.[0]?.icon}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage={weatherData.message} />
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
