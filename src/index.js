import { geocodingLocation, getCurrentWeatherData } from "./weather-data";

geocodingLocation('London', '', '')
.then(locationData => getCurrentWeatherData(locationData))
.then(weatherData => console.log(weatherData));