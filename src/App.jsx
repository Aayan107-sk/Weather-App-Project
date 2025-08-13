import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const apiKey = "cfb0ac39c32ac9d766f3da26c8caf7f4";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const convertToKmph = (ms) => {
    return (ms * 3.6).toFixed(1);
  };

  const handleTempToggle = () => {
    setIsFahrenheit((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        darkMode
          ? "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800"
      } flex flex-col items-center justify-center p-6`}
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-5 right-5">
        <button
          onClick={toggleDarkMode}
          className="text-3xl hover:scale-110 transition-transform"
          title="Toggle Light/Dark Mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      <h1 className="text-5xl font-extrabold mb-10 animate-fade-in">
        🌦️ WeatherNow
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center w-full max-w-xl">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`flex-1 px-5 py-3 rounded-lg text-lg backdrop-blur-md shadow-md transition-all duration-300 focus:outline-none ${
            darkMode
              ? "bg-white bg-opacity-10 text-black placeholder-white focus:ring-cyan-300"
              : "bg-white text-gray-800 placeholder-gray-400 focus:ring-indigo-300"
          }`}
        />
        <button
          onClick={getWeather}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Weather
        </button>
      </div>

      {error && (
        <p className="text-red-400 font-medium animate-pulse mb-4">{error}</p>
      )}

      {weather && (
        <div
          className={`backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-3xl text-center transform transition-all duration-500 hover:scale-[1.02] animate-fade-in ${
            darkMode
              ? "bg-white bg-opacity-10 text-gray-800"
              : "bg-white text-gray-800 bg-opacity-70"
          }`}
        >
          <h2 className="text-4xl font-bold mb-2">{weather.name}</h2>
          <p
            className={`text-xl capitalize mb-8 ${
              darkMode ? "text-gray-200" : "text-gray-600"
            }`}
          >
            {weather.weather[0].description}
          </p>

          {/* Boxes with Video Background */}
          <div className=" text-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Temperature Box */}
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform">
             
         
              <div className="absolute inset-0  bg-opacity-30"></div>
              <div className="relative z-10 p-6 text-gray-800 text-center">
                <p className="text-lg font-semibold text-cyan-300">Temperature</p>
                 <div className="h-20 w-20 ">
                    <video
                      autoPlay
                      loop
                      muted
                    >
                      <source src="/videos/sun.mp4" type="video/mp4" />
                    </video>
                  </div>
                <p className="text-3xl font-bold mt-2">
                  {isFahrenheit
                    ? `${convertToFahrenheit(weather.main.temp).toFixed(1)}°F`
                    : `${weather.main.temp}°C`}
                </p>
                <button
                  onClick={handleTempToggle}
                  title="Toggle °C / °F"
                  className="text-2xl mt-3 hover:scale-110 transition-transform"
                >
                  🌡️
                </button>
              </div>
            </div>

            {/* Wind Box */}
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform">
              
              <div className="absolute inset-0  bg-opacity-30"></div>
              <div className="relative z-10 p-6 text-gray-800 text-center">
                <p className="text-lg font-semibold text-cyan-300">Wind Speed</p>
                <div className="h-20 w-20 ">
                  <video
                    autoPlay
                    loop
                    muted
                  >
                    <source src="/videos/wind.mp4" type="video/mp4" />
                  </video>
                </div>
                <p className="text-xl mt-2">
                  {weather.wind.speed} m/s <br /> {convertToKmph(weather.wind.speed)} km/h
                </p>
                <div className="text-2xl mt-3">💨</div>
              </div>
            </div>

            {/* Humidity Box */}
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform">
              
            
             
              <div className="absolute inset-0  bg-opacity-30"></div>
              <div className="relative z-10 p-6 text-gray-800 text-center">
                <p className="text-lg font-semibold text-cyan-300">Humidity</p>
                 <div className="h-20 w-20">
                    <video
                    autoPlay
                    loop
                    >
                      <source src="/videos/water.mp4" type="video/mp4" />
                    </video>
                  </div>
            
                <p className="text-xl mt-2">{weather.main.humidity}%</p>
                <div className="text-2xl mt-3">💧</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
