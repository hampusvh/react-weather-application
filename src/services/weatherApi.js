// Geokoda stadsnamn → koordinater
async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=sv&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("Staden hittades inte.");
  }
  return data.results[0]; // { name, latitude, longitude, country, ... }
}

// Hämta aktuellt väder + 7-dagarsprognos för koordinater
async function fetchWeatherByCoords(lat, lon, locationName, country) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
  const res = await fetch(url);
  const data = await res.json();

  // Forma om till samma struktur som WeatherAPI så du inte behöver ändra komponenterna
  return {
    location: { name: locationName, country },
    current: {
      temp_c: data.current.temperature_2m,
      condition: {
        code: data.current.weathercode,
        icon: getWeatherIcon(data.current.weathercode),
        text: getWeatherText(data.current.weathercode),
      },
      wind_kph: data.current.windspeed_10m,
      humidity: data.current.relativehumidity_2m,
    },
    forecast: {
      forecastday: data.daily.time.map((date, i) => ({
        date,
        day: {
          mintemp_c: data.daily.temperature_2m_min[i],
          maxtemp_c: data.daily.temperature_2m_max[i],
          condition: {
            code: data.daily.weathercode[i],
            icon: getWeatherIcon(data.daily.weathercode[i]),
            text: getWeatherText(data.daily.weathercode[i]),
          },
        },
      })),
    },
  };
}

export async function getWeatherInfo(city) {
  const location = await geocodeCity(city);
  return fetchWeatherByCoords(location.latitude, location.longitude, location.name, location.country);
}

export async function getForecast(city) {
  return getWeatherInfo(city); // Returnerar redan prognos inbyggt
}

export async function getWeatherLocation(lat, lon) {
  // Geokoda baklänges för att få stadsnamn
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  const name = data.address.city || data.address.town || data.address.village || "Din plats";
  const country = data.address.country || "";
  return fetchWeatherByCoords(lat, lon, name, country);
}

// WMO weathercodes → ikon-URL (Open-Meteo använder WMO-koder)
function getWeatherIcon(code) {
  if (code === 0) return "//cdn.weatherapi.com/weather/64x64/day/113.png"; // Klart
  if (code <= 3) return "//cdn.weatherapi.com/weather/64x64/day/116.png";  // Delvis molnigt
  if (code <= 48) return "//cdn.weatherapi.com/weather/64x64/day/119.png"; // Mulet/dimma
  if (code <= 67) return "//cdn.weatherapi.com/weather/64x64/day/296.png"; // Regn
  if (code <= 77) return "//cdn.weatherapi.com/weather/64x64/day/338.png"; // Snö
  if (code <= 82) return "//cdn.weatherapi.com/weather/64x64/day/308.png"; // Skurar
  return "//cdn.weatherapi.com/weather/64x64/day/389.png";                  // Åska
}

function getWeatherText(code) {
  if (code === 0) return "Klart";
  if (code <= 3) return "Delvis molnigt";
  if (code <= 48) return "Mulet";
  if (code <= 67) return "Regn";
  if (code <= 77) return "Snö";
  if (code <= 82) return "Skurar";
  return "Åska";
}