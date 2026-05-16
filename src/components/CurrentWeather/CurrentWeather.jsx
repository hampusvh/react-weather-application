import WeatherIcon from "../WeatherIcon/WeatherIcon";

function CurrentWeather({ weatherData, handleSaveLocation }) {
  if (!weatherData) return null;
  if (!weatherData.location || !weatherData.current) {
    return <p className="error-message">Ingen väderinformation tillgänglig</p>;
  }

  return (
    <div className="weather-card">
      <div>
        <h2>{weatherData.location.name}</h2>
        <div className="weather-info">
          <p className="current-temp">{weatherData.current.temp_c}°C</p>
        </div>
        <p className="weather-condition">{weatherData.current.condition.text}</p>
        <button
          className="save-btn"
          onClick={() => handleSaveLocation(weatherData.location.name)}
        >
          Spara plats
        </button>
      </div>
      <WeatherIcon iconUrl={weatherData.current.condition.icon} />
    </div>
  );
}

export default CurrentWeather;