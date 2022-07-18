/* eslint-disable no-use-before-define */
import { geocodingLocation, getCurrentWeatherData } from "./weather-data";
import { parseSearchInput } from "./ui-search-util";

// #region CACHED REFS
const form = document.getElementById('location-form');
const searchInput = document.getElementById('search-input');
const errorMsg = document.getElementById('search-error');

let tempUnits = 'metric';  // Can be 'metric' or 'imperial'
const tempToggleSwitch = document.querySelector('#temperature-settings input');
tempToggleSwitch.addEventListener('change', toggleTempUnits);
// #endregion

// #region ADDING LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    // Validation
    if (searchInput.validity.valid) {
        // If correct, handle data for API call
        const parsedInput = parseSearchInput(searchInput.value);
        geocodingLocation(parsedInput[0], parsedInput[1], parsedInput[2])
        .then(locationData => getCurrentWeatherData(locationData, tempUnits))
        .then(weatherData => console.log(weatherData))
        .catch(() => displayInputError('Location not found. '));
    }
    // If incorrect, display error message detailing format. 
    else {
        displayInputError('Invalid format. ');
    }
})
// #endregion

// #region FUNCTION DEFS
    
    // Displays error message upon failed search request. It is possible to add a preface to the message.
    function displayInputError(preface) {
        errorMsg.textContent = `${preface}Please use the following format: 
        "City", "City, Country", or (for USA only) "City, State, Country".`;
    }

    // Toggles value of tempUnits between metric and imperial
    function toggleTempUnits() {
        tempUnits = (tempUnits === 'metric') ? 'imperial' : 'metric';
        console.log(tempUnits);
    }
// #endregion 


geocodingLocation('London', '', '')
.then(locationData => getCurrentWeatherData(locationData))
.then(weatherData => console.log(weatherData));
