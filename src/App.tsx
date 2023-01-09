import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header";
import MainContainer from "./MainContainer";

interface IpData {
  lat: "";
  lon: "";
}

interface IndividualWeatherData {
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

interface AllWeatherData {
  celsius: IndividualWeatherData;
  fahrenheit: IndividualWeatherData;
}

interface UiMessages {
  heading: string;
  subheading: string;
  weatherIconDescription: string;
}

export function toCaps(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function App() {
  const [tempUnitState, setTempUnitState] = useState("celsius");
  const [weatherDataState, setWeatherDataState] = useState<AllWeatherData>();
  const [uiMessages, setUiMessages] = useState<UiMessages>();
  const [weatherIconUrl, setWeatherIconUrl] = useState<string>();

  const jacketWorthyTempCelsius = 14;
  const jacketWorthyTempFahrenheit = 35;
  const jackWorthyRainLevel = 1;

  function uiMessageSetter(
    rain: number,
    temp: number,
    weatherDesc: string,
    unit: string
  ) {
    let newWeatherDesc = toCaps(weatherDesc);

    if (tempUnitState === "celsius") {
      rain >= jackWorthyRainLevel && temp < jacketWorthyTempCelsius
        ? setUiMessages({
            heading: "Yes, you need a jacket",
            subheading: "Why you need a jacket...",
            weatherIconDescription: newWeatherDesc,
          })
        : setUiMessages({
            heading: "No, you do not need a jacket",
            subheading: "Why you don't need a jacket...",
            weatherIconDescription: newWeatherDesc,
          });
      return;
    }
    if (tempUnitState === "fahrenheit") {
      rain >= jackWorthyRainLevel && temp < jacketWorthyTempFahrenheit
        ? setUiMessages({
            heading: "Yes, you need a jacket",
            subheading: "Why you need a jacket...",
            weatherIconDescription: newWeatherDesc,
          })
        : setUiMessages({
            heading: "No, you do not need a jacket",
            subheading: "Why you don't need a jacket...",
            weatherIconDescription: newWeatherDesc,
          });
      return;
    }
  }

  async function setIndividialUnitWeatherData(units: string, ipData: IpData) {
    let finalObject;

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${ipData.lat}&lon=${ipData.lon}&exclude=hourly,minutely&units=${units}&appid=5c892443551065aa4bd7819d94ccffcd`
      )
      .then((res) => {
        const { temp, feels_like, humidity, wind_speed, clouds } =
          res.data.current;
        const { description, icon } = res.data.current.weather[0];
        const { max, min } = res.data.daily[0].temp;
        let currentRain;
        res.data.current.rain !== undefined
          ? (currentRain = res.data.current.rain)
          : (currentRain = 0);

        finalObject = {
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
        };
      });
    return finalObject;
  }

  async function setAllWeatherData(ipData: IpData) {
    let tempData: AllWeatherData;

    const celsius = await setIndividialUnitWeatherData("metric", ipData);
    const fahrenheit = await setIndividialUnitWeatherData("imperial", ipData);

    tempData = { celsius: celsius!, fahrenheit: fahrenheit! };
    setWeatherDataState(tempData);
    return tempData;
  }

  function checkUnitsAndSetUi(
    tempUnitState: string,
    weatherData: AllWeatherData
  ) {
    switch (tempUnitState) {
      case "celsius":
        uiMessageSetter(
          weatherData.celsius.rain,
          weatherData.celsius.temp,
          weatherData.celsius.imageDetails.description,
          "celsius"
        );
      case "fahrenheit":
        uiMessageSetter(
          weatherData.celsius.rain,
          weatherData.celsius.temp,
          weatherData.celsius.imageDetails.description,
          "fahrenheit"
        );
    }
  }

  function startApplication() {
    axios.get("http://ip-api.com/json/").then(async (res) => {
      await setAllWeatherData(res.data).then((sortedData) => {
        checkUnitsAndSetUi(tempUnitState, sortedData);
        setWeatherIconUrl(
          `http://openweathermap.org/img/wn/${sortedData.celsius.imageDetails.icon}@2x.png`
        );
      });
    });
  }

  useEffect(() => {
    startApplication();
  }, [tempUnitState]);

  return (
    <div className="App">
      <Header currentUnitState={tempUnitState}>
        <div id="button-container">
          <button onClick={() => setTempUnitState("celsius")}>Celsius</button>
          <button onClick={() => setTempUnitState("fahrenheit")}>
            Fahrenheit
          </button>
        </div>
      </Header>
      <MainContainer uiText={uiMessages?.heading}></MainContainer>
      <div className="container" id="weather-details">
        {tempUnitState === "celsius" ? (
          <>
            <h3>{uiMessages?.subheading}</h3>
            <h2>
              {weatherDataState?.celsius.temp}° {}
            </h2>
            <img src={weatherIconUrl} alt="icon for today's weather" />
            <h3>{uiMessages?.weatherIconDescription}</h3>
            <div>
              <h4>Hi: {weatherDataState?.celsius.dailyMax}</h4>
              <h4>Lo: {weatherDataState?.celsius.dailyMin}</h4>
            </div>
            <h4>Feels like:</h4>
            <p>{weatherDataState?.celsius.feels_like}</p>
            <pre>{JSON.stringify(weatherDataState, null, 2)}</pre>
          </>
        ) : tempUnitState === "fahrenheit" ? (
          <>
            <h2>Fahrenheit</h2>
          </>
        ) : (
          <>
            <h2>unforseen error</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
