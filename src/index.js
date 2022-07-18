/* eslint-disable no-use-before-define */
import { geocodingLocation, getCurrentWeatherData } from "./weather-data";
import { parseSearchInput } from "./ui-search-util";

// #region CACHED REFS
const form = document.getElementById('location-form');
const searchInput = document.getElementById('search-input');
const errorMsgSpan = document.getElementById('search-error');
// #endregion

// #region ADDING LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsgSpan.textContent = '';
    // Validation
    if (searchInput.validity.valid) {
        // If correct, handle data for API call
        const parsedInput = parseSearchInput(searchInput.value);
        geocodingLocation(parsedInput[0], parsedInput[1], parsedInput[2])
        .then(locationData => getCurrentWeatherData(locationData))
        .then(weatherData => console.log(weatherData));
    }
    // If incorrect, display error message detailing format. 
    else {
        displayInputError();
    }
})
// #endregion

// #region FUNCTION DEFS
    function displayInputError() {
        errorMsgSpan.textContent = 'Please use the following format: "City", "City, Country", or (for USA only) "City, State, Country"';
    }
// #endregion 


geocodingLocation('London', '', '')
.then(locationData => getCurrentWeatherData(locationData))
.then(weatherData => console.log(weatherData));
