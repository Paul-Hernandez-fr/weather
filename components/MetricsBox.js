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
  const humidity = weatherData.main?.humidity || 0;
  const windSpeed = weatherData.wind?.speed || 0;
  const windDirection = weatherData.wind?.deg || 0;
  const visibility = weatherData.visibility || 0;
  const sunrise = weatherData.sys?.sunrise || 0;
  const sunset = weatherData.sys?.sunset || 0;
  const timezone = weatherData.timezone || 0;

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={humidity}
        unit={"%"}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, windSpeed)}
        unit={unitSystem === "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(windDirection)}
      />
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
      />
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(unitSystem, sunrise, timezone)}
        unit={getAMPM(unitSystem, sunrise, timezone)}
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(unitSystem, sunset, timezone)}
        unit={getAMPM(unitSystem, sunset, timezone)}
      />
    </div>
  );
};
