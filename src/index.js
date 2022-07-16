import { geocodingLocation } from "./weather-data";

geocodingLocation('London', '', '').then(data => console.log(data));
