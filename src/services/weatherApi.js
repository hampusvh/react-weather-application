const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherInfo(city) {
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getForecast(city) {
  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getWeatherLocation(lat, lon) {
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.error) {
      throw new Error("Kunde inte hämta väderdata för din plats.");
    }
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av väderdata:", error);
    throw error;
  }
}
