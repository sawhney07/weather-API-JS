import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import arrowUP from "../assets/arrow_drop_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";
import arrowDOWN from "../assets/arrow_drop_down_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState({});
  const input = useRef();
  const getWeather = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={your-api-key}`;
      const response = await fetch(url);

      if (!response.ok) {
        alert(data.message);
      }
      const data = await response.json();
      console.log(data);
      setIcon(
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      setWeather({
        humidity: data.main.humidity,
        feelslike: Math.round(data.main.feels_like),
        temp: Math.floor(data.main.temp),
        name: data.name,
        mintemp: Math.floor(data.main.temp_min),
        maxTemp: Math.floor(data.main.temp_max),
        country: data.sys.country,
        desc: data.weather[0].description,
        main: data.weather[0].main,
        wind: Math.floor(data.wind.speed),
      });
    } catch (error) {
      console.log(error);
      setWeather(false);
      alert("Please enter a valid city name");
    }
  };

  useEffect(() => {
    getWeather("Vancouver");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={input} type="text" placeholder="Search..." />
        <img
          src={search_icon}
          alt=""
          onClick={() => getWeather(input.current.value)}
        />
      </div>

      {weather ? (
        <>
          <img src={icon} alt="" className="weather-icon" />
          <p className="tempinfo">{weather.main}</p>
          <p className="temp">{weather.temp}° C</p>
          <p className="location">
            {weather.name}, {weather.country}
          </p>
          <p className="feelslike">
            Feels like {weather.feelslike}° C, with {weather.desc}.
          </p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p>{weather.wind} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>

            <div className="col">
              <img src={arrowUP} alt="" />
              <div>
                <p>{weather.maxTemp}° C</p>
                <span>Max.</span>
              </div>
            </div>

            <div className="col">
              <img src={arrowDOWN} alt="" />
              <div>
                <p>{weather.mintemp}° C</p>
                <span>Min.</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
