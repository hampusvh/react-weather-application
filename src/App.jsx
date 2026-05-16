import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import SavedDropdown from "./components/SavedDropdown/SavedDropdown";

import {
  getWeatherInfo,
  getWeatherLocation,
} from "./services/weatherApi";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import "./index.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedLocations, setSavedLocations] = useLocalStorage(
    "savedLocations",
    []
  );

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setErrorMessage("Sökfältet tomt!");
      return;
    }
    try {
      const data = await getWeatherInfo(city);
      const forecastData = data;

      if (data.error) {
        setErrorMessage("Felaktig data. Kontrollera stavning!");
        setWeatherData(null);
        setForecastData(null);
        return;
      }
      setWeatherData(data);
      setForecastData(forecastData);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("API-anropet misslyckades. Försök igen");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const handleSaveLocation = (city) => {
    if (!savedLocations.includes(city)) {
      setSavedLocations([...savedLocations, city]);
    }
  };

  const removeLocation = (city) => {
    setSavedLocations(savedLocations.filter((savedCity) => savedCity !== city));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolokalisering stöds inte i din webbläsare.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const data = await getWeatherLocation(latitude, longitude);
          const forecastData = data;
          setWeatherData(data);
          setForecastData(forecastData);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage("Kunde inte hämta väderdata för din plats.");
        }
      },
      (error) => {
        setErrorMessage("Tillåt platstjänster för att hämta vädret.");
      }
    );
  };

  const hasSavedLocations = savedLocations.length > 0;

  return (
    <>
      <Header />
      <SearchBar
        onSearch={handleSearch}
        onGetCurrentLocation={handleGetCurrentLocation}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        savedLocations={savedLocations}
        removeLocation={removeLocation}
      />

      <CurrentWeather
        weatherData={weatherData}
        handleSaveLocation={handleSaveLocation}
      />
      <WeatherForecast forecastData={forecastData} />
    </>
  );
}

export default App;
