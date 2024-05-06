import { useState } from "react";
import axios from "axios"; // Import the axios package
import "./App.css";
import { Oval } from "react-loader-spinner";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  function toDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because January is 0
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // Example usage
  const currentDate = toDate();
  console.log(currentDate); // Output will be something like: "2024-05-06"

  const search = (event) => {
    if (event.key === "Enter") {
      // corrected typo from "kkey" to "key"
      setInput(""); // Clear the input after pressing Enter
      setWeather({ ...weather, loading: true });
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: input,
            units: "metric",
            appid: "0403e1e50f6696be16cc44bc712054f8",
          },
        })
        .then((res) => {
          console.log(res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((err) => {
          setWeather({ ...weather, data: {}, error: true });
        });
    }
  };

  return (
    <div className="App">
      <div className="weather-app">
        <div className="city-search">
          <input
            type="text"
            className="city"
            placeholder="Enter city name: "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {weather.loading && <Oval color="green" height={70} width={70}></Oval>}
        {weather.error && (
          <div className="error-message">
            <span>City Not Found</span>
          </div>
        )}
        {weather && weather.data && weather.data.main && (
          <div>
            <div className="city-name">
              <h2>
                {weather.data.name}, <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className="date">
              <span>{toDate()}</span>
            </div>
            <div className="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt=""
              />
              {Math.round(weather.data.main.temp)} <sup className="deg">°C</sup>
            </div>
            <div className="des-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed: {weather.data.wind.speed}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
