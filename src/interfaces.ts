export interface IpData {
  lat: "";
  lon: "";
}

export interface IndividualWeatherData {
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

export interface AllWeatherData {
  celsius: IndividualWeatherData;
  fahrenheit: IndividualWeatherData;
}

export interface UiMessages {
  jacket: boolean;
  heading: string;
  subheading: string;
  weatherIconDescription: string;
}
