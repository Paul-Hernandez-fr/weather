import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("/api/data?city=lyon");
      const data = await response.json();
      console.log(data); // Vérifiez la structure des données
      setWeatherData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Récupère les données au montage
    const intervalId = setInterval(fetchWeatherData, 3600000); // Rafraîchit toutes les heures (3600000 ms)
    return () => clearInterval(intervalId); // Nettoie l'intervalle lors du démontage
  }, []);

  const changeSystem = () => {
    setUnitSystem(unitSystem === "metric" ? "imperial" : "metric");
  };

  if (!weatherData) return <LoadingScreen loadingMessage="Loading data..." />;

  // Ajout de vérifications pour éviter les erreurs
  const description =
    weatherData.current_weather?.weather_descriptions?.[0] ||
    "No description available";
  const iconName =
    weatherData.current_weather?.weather_icons?.[0] || "default_icon";

  return (
    <div className={styles.wrapper}>
      <MainCard
        city="Lyon"
        country="France"
        description={description}
        iconName={iconName}
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
  );
};

export default Home;
