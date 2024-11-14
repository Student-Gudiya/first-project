import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaWater } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (city === "") return;

    const apiKey = "3b3c6768b18a63446cc314a76b0ebd6c";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setNotFound(true);
          setWeather(null);
        } else {
          setNotFound(false);
          setWeather({
            temperature: parseInt(json.main.temp),
            description: json.weather[0].description,
            humidity: json.main.humidity,
            wind: parseInt(json.wind.speed),
            icon: json.weather[0].main.toLowerCase(),
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const getWeatherImage = () => {
    switch (weather?.icon) {
      case "clear":
        return "/clear.png";
      case "rain":
        return "/rain.png";
      case "snow":
        return "/snow.webp";
      case "clouds":
        return "/cloud.jpeg";
      case "mist":
        return "/mist.png";
      case "haze":
        return "/haze.png";
      default:
        return "/weather-icon.jpeg";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <div
        className="w-80 p-6 rounded-3xl bg-opacity-90 backdrop-blur-md text-white shadow-xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center p-2 mb-6 bg-white bg-opacity-10 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow pl-4 text-sm text-white bg-transparent focus:outline-none placeholder-gray-300"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch} className="text-white pr-4 text-xl">
            <FaSearch />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
            {/* <img src={getWeatherImage()} alt=""/> */}
          </div>
          <h1 className="text-5xl font-bold">{weather?.temperature ?? "0"}°C</h1>
          <h2 className="text-2xl font-medium mt-2">{weather?.description ?? "Weather"}</h2>
        </div>
        <div className="flex justify-between mt-6 px-4">
          <div className="flex items-center justify-center space-x-2">
            <FaWater className="text-2xl" />
            <div className="text-lg font-semibold">{weather?.humidity ?? "0"}%</div>
          </div>
          <div className="text-sm mt-10">Humidity </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <FaWind className="text-2xl" />
              <div className="text-lg font-semibold">{weather?.wind ?? "0"} km/h</div>
            </div>
            <div className="text-sm ml-10">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
