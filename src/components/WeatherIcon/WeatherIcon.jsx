function WeatherIcon({ iconUrl }) {
  return (
    <img src={`https:${iconUrl}`} alt="Weather icon" className="weather-icon" />
  );
}

export default WeatherIcon;
