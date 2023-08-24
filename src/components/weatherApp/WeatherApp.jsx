import React, { useState } from 'react'
import "./WeatherApp.css"
import backgroundImage from "../assets/background.jpg"
import searchIcon from "../assets/search.png"
import clearIcon from "../assets/clearSky.png"
import fewCloudIcon from "../assets/fewCloud.png"
import cloudIcon from "../assets/cloud.png"
import drizzleIcon from "../assets/drizzle.png"
import rainIcon from "../assets/rain.png"
import thunderIcon from "../assets/thunder.png"
import snowIcon from "../assets/snow.png"
import windIcon from "../assets/wind.png"
import humidityIcon from "../assets/humidity.png"

export default function WeatherApp() {

  let apiKey = "f77028fec8f9262502a8cea19c127d90";

  const [wicon, setWicon] = useState(fewCloudIcon);
  const [err, setErr] = useState("");

  const search = async () => {

    const element = document.getElementsByClassName("cityInput");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");

    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === "404") {
      setErr("City not found");
      return;
    }

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clearIcon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(fewCloudIcon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(cloudIcon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n" || data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(drizzleIcon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rainIcon);
    } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
      setWicon(thunderIcon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snowIcon);
    }

    setErr("");

    temp[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = data.wind.speed + " km/h";

  }
  return (
    <>
      <div className="background">
        <img src={backgroundImage} alt="" className="bg-image" />

      </div>
      <div className='container'>
        <div className='top-bar'>
          <input type="text" className="cityInput" placeholder='enter city name' />
          <div className="search-icon" onClick={search}>
            <img src={searchIcon} alt="search-icon" height={"19px"} />
          </div>
        </div>
        {err && <div className='error'>{err + "*"}</div>}
        <div className="weather-image">
          <img src={wicon} alt="" height={"200px"} />
        </div>
        <div className="weather-temp">00 °C</div>
        <div className="weather-location">Mumbai</div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="icon" className="icon" height={"47px"} />
            <div className="data">
              <div className="humidity-percent">00 %</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} alt="icon" className="icon" height={"47px"} />
            <div className="data">
              <div className="wind-speed">5 km/h</div>
              <div className="text">Wind-speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
