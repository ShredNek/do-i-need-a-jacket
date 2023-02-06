import React, { useEffect, useState, useRef } from "react";
import "./styles/App.css";
import Header from "./Header";
import MainContainer from "./MainContainer";
import WeatherDetailsContainer from "./WeatherDetailsContainer";
import LoadingScreen from "./LoadingScreen";

import { AllWeatherData, UiMessages } from "./interfaces";

import {
  getIp,
  getLatLon,
  setAllWeatherData,
  checkUnitsAndSetUi,
  focusOnButton,
} from "./functions";

function App() {
  const [tempUnitState, setTempUnitState] = useState("celsius");
  const [weatherDataState, setWeatherDataState] = useState<AllWeatherData>();
  const [uiMessages, setUiMessages] = useState<UiMessages>();
  const [weatherIconUrl, setWeatherIconUrl] = useState<string>();

  const jacketWorthyTempCelsius = 21;
  const jacketWorthyTempFahrenheit = 58;
  const jackWorthyRainLevel = 0.5;

  async function startApplication() {
    const userIp = await getIp();
    if (userIp === undefined) {
      console.error("ERROR: Could not obtain User Ip");
    }
    const res = await getLatLon(userIp!);
    if (res === undefined) {
      console.error("ERROR: Could not obtain Latitue & Longitute");
    }
    const sortedWeatherData = await setAllWeatherData(res!);
    setWeatherDataState(sortedWeatherData);
    let uiDataToSet = checkUnitsAndSetUi(
      tempUnitState,
      sortedWeatherData,
      jackWorthyRainLevel,
      jacketWorthyTempCelsius,
      jacketWorthyTempFahrenheit
    );
    setUiMessages(uiDataToSet);
    setWeatherIconUrl(
      `https://openweathermap.org/img/wn/${sortedWeatherData.celsius.imageDetails.icon}@2x.png`
    );
  }

  const celsiusButton = useRef<HTMLButtonElement>(null);
  const fahrenheitButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    startApplication();
    celsiusButton.current?.focus();
  }, []);

  return (
    <div className="App">
      <Header>
        <div id="button-container">
          <button
            onClick={() => {
              setTempUnitState("celsius");
              focusOnButton(celsiusButton);
            }}
            id={"celsius-selector"}
            ref={celsiusButton}
          >
            Celsius
          </button>
          <button
            onClick={() => {
              setTempUnitState("fahrenheit");
              focusOnButton(fahrenheitButton);
            }}
            id={"fahrenheit-selector"}
            ref={fahrenheitButton}
          >
            Fahrenheit
          </button>
        </div>
      </Header>
      <div className="containers">
        {weatherDataState !== undefined ? (
          <>
            <MainContainer
              uiText={uiMessages?.heading}
              jacket={uiMessages?.jacket}
            ></MainContainer>
            <WeatherDetailsContainer
              tempUnitState={tempUnitState}
              uiMessages={uiMessages}
              weatherDataState={weatherDataState}
              weatherIconUrl={weatherIconUrl}
            ></WeatherDetailsContainer>
          </>
        ) : (
          <LoadingScreen></LoadingScreen>
        )}
      </div>
    </div>
  );
}

export default App;
