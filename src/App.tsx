import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  clouds: number;
  rain: number;
  imageDetails: {
    description: string;
    icon: string;
  };
  dailyMax: number;
  dailyMin: number;
}

interface UiMessages {
  heading: string;
  subheading: string;
  weatherIconDescription: string;
}

function App() {
  const [tempMetric, setTempMetric] = useState("Celcius");
  const [celsiusWeatherDataState, setCelsiusWeatherDataState] =
    useState<WeatherData>();
  const [fahrenheitWeatherDataState, FahrenheitWeatherDataState] =
    useState<WeatherData>();
  const [uiMessages, setUiMessages] = useState<UiMessages>();
  const [weatherIconUrl, setWeatherIconUrl] = useState<string>();

  const jacketWorthyTemp = 14;
  const jackWorthyRainLevel = 1;

  function uiMessageSetter(rain: number, temp: number, weatherDesc: string) {
    // ? The ui was in lowercase, which looked ameteur, so
    // ? I decided to uppercase the first letter in this helper function
    let newWeatherDesc =
      weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);

    rain >= jackWorthyRainLevel && temp < jacketWorthyTemp
      ? setUiMessages({
          heading: "Yes, you need a jacket",
          subheading: "Why you need a jacket",
          weatherIconDescription: newWeatherDesc,
        })
      : setUiMessages({
          heading: "No, you do not need a jacket",
          subheading: "Why you don't need a jacket",
          weatherIconDescription: newWeatherDesc,
        });
  }

  function setCelsiusData() {}

  function mamothFunction() {
    axios.get("http://ip-api.com/json/").then((res) => {
      let ipDataRes = res.data;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${ipDataRes.lat}&lon=${ipDataRes.lon}&exclude=hourly,minutely&units=${tempMetric}&appid=5c892443551065aa4bd7819d94ccffcd`
        )
        .then((res) => {
          console.log(res);

          const { temp, feels_like, humidity, wind_speed, clouds } =
            res.data.current;
          const { description, icon } = res.data.current.weather[0];
          const { max, min } = res.data.daily[0].temp;
          let currentRain;
          res.data.current.rain !== undefined
            ? (currentRain = res.data.current.rain)
            : (currentRain = 0);

          setCelsiusWeatherDataState({
            temp: Math.round(temp),
            feels_like: Math.round(feels_like),
            humidity: humidity,
            wind_speed: wind_speed,
            clouds: clouds,
            rain: currentRain,
            imageDetails: {
              description: description,
              icon: icon,
            },
            dailyMax: Math.round(max),
            dailyMin: Math.round(min),
          });

          uiMessageSetter(currentRain, temp, description);
          setWeatherIconUrl(`http://openweathermap.org/img/wn/${icon}@2x.png`);
        });
    });
  }

  useEffect(() => {
    mamothFunction();
  }, [tempMetric]);

  return (
    <div className="App">
      <nav className="page-header">
        <h1>Do I Need A Jacket?</h1>
        <div id="right-side-container">
          <div id="button-container">
            <button
              onClick={() => {
                setTempMetric("Celcius");
                mamothFunction();
              }}
            >
              Celsius
            </button>
            <button
              onClick={() => {
                setTempMetric("Fahrenheit");
                mamothFunction();
              }}
            >
              Fahrenheit
            </button>
          </div>
          <p>Current setting: {tempMetric}</p>
        </div>
      </nav>
      <div className="container" id="main-container">
        <h2>{uiMessages?.heading}</h2>
      </div>
      <div className="container" id="weather-details">
        <h3>{uiMessages?.subheading}</h3>
        <h2>
          {celsiusWeatherDataState?.temp}° {}
        </h2>
        <img src={weatherIconUrl} alt="icon for today's weather" />
        <h3>{uiMessages?.weatherIconDescription}</h3>
        <div>
          <h4>High: {celsiusWeatherDataState?.dailyMax}</h4>
          <h4>Low: {celsiusWeatherDataState?.dailyMin}</h4>
        </div>
        <pre>{JSON.stringify(celsiusWeatherDataState, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
