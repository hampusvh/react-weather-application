import "./CurrentWeather.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

function CurrentWeather({ weatherData, handleSaveLocation }) {
  if (!weatherData) {
    return null;
  }

  if (!weatherData.location || !weatherData.current) {
    return <p className="error-message">Ingen väderinformation tillgänglig</p>;
  }

  return (
    <div className="weather-card">
      <h2>{weatherData.location.name}</h2>
      <div className="weather-info">
        <p className="current-temp">{weatherData.current.temp_c} °C</p>
        <WeatherIcon iconUrl={weatherData.current.condition.icon} />
      </div>

      <button
        className="save-btn"
        onClick={() => handleSaveLocation(weatherData.location.name)}
      >
        Spara plats
      </button>
    </div>
  );
}

export default CurrentWeather;
