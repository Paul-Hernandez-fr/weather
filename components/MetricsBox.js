import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  const currentWeather = weatherData.current_weather || {};
  const windSpeed = currentWeather.windspeed || 0;
  const windDirection = currentWeather.winddirection || 0;
  const visibility = currentWeather.visibility || 0;
  const sunrise = weatherData.daily?.sunrise?.[0] || 0;
  const sunset = weatherData.daily?.sunset?.[0] || 0;

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Température Max"}
        iconSrc={"/icons/temperature-high.png"}
        metric={weatherData.daily?.temperature_2m_max?.[0] || 0}
        unit={"°C"}
      />
      <MetricsCard
        title={"Température Min"}
        iconSrc={"/icons/temperature-low.png"}
        metric={weatherData.daily?.temperature_2m_min?.[0] || 0}
        unit={"°C"}
      />
      <MetricsCard
        title={"Vitesse du vent"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, windSpeed)}
        unit={unitSystem === "metric" ? "m/s" : "mph"}
      />
      <MetricsCard
        title={"Direction du vent"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(windDirection)}
      />
      <MetricsCard
        title={"Visibilité"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
      />
      <MetricsCard
        title={"Lever du soleil"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(unitSystem, sunrise, weatherData.timezone)}
        unit={getAMPM(unitSystem, sunrise, weatherData.timezone)}
      />
      <MetricsCard
        title={"Coucher du soleil"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(unitSystem, sunset, weatherData.timezone)}
        unit={getAMPM(unitSystem, sunset, weatherData.timezone)}
      />
    </div>
  );
};
