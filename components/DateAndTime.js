import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  const time = weatherData.current_weather?.time;
  const timezone = weatherData.timezone;

  if (!time || !timezone) {
    return <div className={styles.wrapper}>Invalid date/time</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(time, timezone)}, ${getTime(
          unitSystem,
          time,
          timezone
        )} ${getAMPM(unitSystem, time, timezone)}`}
      </h2>
    </div>
  );
};
