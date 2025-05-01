import { useState } from "react";
import "./WeatherForecast.css";

function WeatherForecast({ forecastData }) {
  if (!forecastData) {
    return null;
  }
  return (
    <div className="forecast-container">
      <h2 className="forecast-title">
        Väderprognos för{" "}
        {forecastData && forecastData.location
          ? forecastData.location.name
          : ""}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Min Temp ( °C )</th>
            <th>Max Temp ( °C )</th>
            <th>Väder</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.forecast.forecastday.map((day, index) => (
            <tr key={index}>
              <td>
                {" "}
                {new Date(day.date).toLocaleDateString("sv-SE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </td>
              <td>{day.day.mintemp_c} °C</td>
              <td>{day.day.maxtemp_c} °C</td>
              <td>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt="Weather icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherForecast;
