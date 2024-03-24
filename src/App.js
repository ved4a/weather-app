import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { OPENWEATHER_API_KEY, OPENWEATHER_API_URL } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCUrrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );

    const forecastFetch = fetch(
      `${OPENWEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[0].json();
    });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  );
}

export default App;
