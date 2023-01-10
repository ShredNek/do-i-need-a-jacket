import React from "react";
import { UiMessages, AllWeatherData } from "./interfaces";
import "./styles/App.css";
import "./styles/MainAndWeatherDetailsContainers.css";

interface WeatherDetailsContainer {
  tempUnitState: string;
  uiMessages: UiMessages | undefined;
  weatherDataState: AllWeatherData | undefined;
  weatherIconUrl: string | undefined;
}

const WeatherDetailsContainer: React.FC<WeatherDetailsContainer> = ({
  tempUnitState,
  uiMessages,
  weatherDataState,
  weatherIconUrl,
}: WeatherDetailsContainer) => {
  return (
    <div className="container" id="weather-details">
      {tempUnitState === "celsius" ? (
        <>
          <h3 id="details-heading">{uiMessages?.subheading}</h3>
          <h2 id="temperature">
            It's {weatherDataState?.celsius.temp}° {}
          </h2>
          <div id="details-under-temperature">
            <div id="icon-and-desc">
              <img src={weatherIconUrl} alt="icon for today's weather" />
              <h3>{uiMessages?.weatherIconDescription}</h3>
            </div>
            <div id="hi-and-lo">
              <h4 id="hi">{weatherDataState?.celsius.dailyMax}°</h4>
              <h4 id="lo">{weatherDataState?.celsius.dailyMin}°</h4>
            </div>
          </div>
          <div className="mini-containers-container">
            <div className="mini-container">
              <h4>Feels like:</h4>
              <p>{weatherDataState?.celsius.feels_like}°</p>
            </div>
            <div className="mini-container">
              <h4>Humidity:</h4>
              <p>{weatherDataState?.celsius.humidity}%</p>
            </div>
            <div className="mini-container">
              <h4>Chance of rain:</h4>
              <p>{weatherDataState?.celsius.rain}%</p>
            </div>
            <div className="mini-container">
              <h4>Wind speed:</h4>
              <p>{weatherDataState?.fahrenheit.wind_speed} km/h</p>
            </div>
          </div>
        </>
      ) : tempUnitState === "fahrenheit" ? (
        <>
          <h3 id="details-heading">{uiMessages?.subheading}</h3>
          <h2 id="temperature">
            It's {weatherDataState?.fahrenheit.temp}° {}
          </h2>
          <div id="details-under-temperature">
            <div id="icon-and-desc">
              <img src={weatherIconUrl} alt="icon for today's weather" />
              <h3>{uiMessages?.weatherIconDescription}</h3>
            </div>
            <div id="hi-and-lo">
              <h4 id="hi">{weatherDataState?.fahrenheit.dailyMax}°</h4>
              <h4 id="lo">{weatherDataState?.fahrenheit.dailyMin}°</h4>
            </div>
          </div>
          <div className="mini-containers-container">
            <div className="mini-container">
              <h4>Feels like:</h4>
              <p>{weatherDataState?.fahrenheit.feels_like}°</p>
            </div>
            <div className="mini-container">
              <h4>Humidity:</h4>
              <p>{weatherDataState?.fahrenheit.humidity}%</p>
            </div>
            <div className="mini-container">
              <h4>Chance of rain:</h4>
              <p>{weatherDataState?.fahrenheit.rain}%</p>
            </div>
            <div className="mini-container">
              <h4>Wind speed:</h4>
              <p>{weatherDataState?.celsius.wind_speed} m/h</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>
            Click any button in the rop right corner of the page to choose a
            metric!
          </h2>
        </>
      )}
    </div>
  );
};

export default WeatherDetailsContainer;
