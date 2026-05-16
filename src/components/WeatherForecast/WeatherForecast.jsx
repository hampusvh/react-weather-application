function WeatherForecast({ forecastData }) {
  if (!forecastData) return null;

  return (
    <div className="forecast-container">
      <p className="forecast-title">7 dagar</p>
      {forecastData.forecast.forecastday.map((day, index) => (
        <div className="forecast-row" key={index}>
          <span className="forecast-day">
            {new Date(day.date).toLocaleDateString("sv-SE", {
              weekday: "long",
            })}
          </span>
          <div className="forecast-icon">
            <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
          </div>
          <div className="forecast-temps">
            <span className="temp-max">{day.day.maxtemp_c}°</span>
            <span className="temp-min">{day.day.mintemp_c}°</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherForecast;