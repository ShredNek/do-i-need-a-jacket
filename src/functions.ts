import axios from "axios";
import {
  IpData,
  IndividualWeatherData,
  AllWeatherData,
  UiMessages,
} from "./interfaces";

export async function getIp() {
  let ip;
  await axios.get("https://ip.seeip.org/jsonip?").then((res) => {
    ip = res.data.ip;
  });
  return ip;
}

export async function getLatLon(ip: string) {
  let latLonData;
  await axios.get(`https://ipwho.is/${ip}`).then((res) => {
    latLonData = { lat: res.data.latitude, lon: res.data.longitude };
  });
  return latLonData;
}

export async function setIndividialUnitWeatherData(
  units: string,
  ipData: IpData
) {
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

export async function setAllWeatherData(ipData: IpData) {
  let tempData: AllWeatherData;

  const celsius = await setIndividialUnitWeatherData("metric", ipData);
  const fahrenheit = await setIndividialUnitWeatherData("imperial", ipData);

  tempData = { celsius: celsius!, fahrenheit: fahrenheit! };
  return tempData;
}

export function uiMessageSetter(
  rain: number,
  temp: number,
  weatherDesc: string,
  unit: string,
  rainLimit: number,
  celsTempLimit: number,
  fahrenTempLimit: number
) {
  let newWeatherDesc = toCaps(weatherDesc);
  let uiConfigured;

  if (unit === "celsius") {
    rain >= rainLimit || temp < celsTempLimit
      ? (uiConfigured = {
          jacket: true,
          heading: "Yes, you need a jacket today.",
          subheading: "Here's why you need a jacket...",
          weatherIconDescription: newWeatherDesc,
        })
      : (uiConfigured = {
          jacket: false,
          heading: "No, you do not need a jacket today.",
          subheading: "Here's why you don't need a jacket...",
          weatherIconDescription: newWeatherDesc,
        });
    return uiConfigured;
  }
  if (unit === "fahrenheit") {
    rain >= rainLimit || temp < fahrenTempLimit
      ? (uiConfigured = {
          jacket: true,
          heading: "Yes, you need a jacket today.",
          subheading: "Here's why you need a jacket...",
          weatherIconDescription: newWeatherDesc,
        })
      : (uiConfigured = {
          jacket: false,
          heading: "No, you do not need a jacket today.",
          subheading: "Here's why you don't need a jacket...",
          weatherIconDescription: newWeatherDesc,
        });
    return uiConfigured;
  }
}

export function checkUnitsAndSetUi(
  tempUnitState: string,
  weatherData: AllWeatherData,
  rainLimit: number,
  celsTempLimit: number,
  fahrenTempLimit: number
) {
  switch (tempUnitState) {
    case "celsius":
      return uiMessageSetter(
        weatherData.celsius.rain,
        weatherData.celsius.temp,
        weatherData.celsius.imageDetails.description,
        "celsius",
        rainLimit,
        celsTempLimit,
        fahrenTempLimit
      );
    case "fahrenheit":
      return uiMessageSetter(
        weatherData.celsius.rain,
        weatherData.celsius.temp,
        weatherData.celsius.imageDetails.description,
        "fahrenheit",
        rainLimit,
        celsTempLimit,
        fahrenTempLimit
      );
  }
}

export function toCaps(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function focusOnButton(ref: React.RefObject<HTMLButtonElement>) {
  ref.current?.focus();
}
