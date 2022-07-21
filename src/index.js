/* eslint-disable no-use-before-define */
import { geocodingLocation, getCurrentWeatherData } from "./weather-data";
import { parseSearchInput } from "./ui-search-util";
import { updateUi } from "./dom-methods";

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
    hideErrorMsg();  // In case the error message is not already hidden. 
    // Validation
    if (searchInput.validity.valid) {
        // If correct, handle data for API call
        const parsedInput = parseSearchInput(searchInput.value);
        geocodingLocation(parsedInput)
        .then(locationData => getCurrentWeatherData(locationData, tempUnits))
        .then(weatherData => updateUi(weatherData, tempUnits))
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
        errorMsg.classList.add('visible');
        errorMsg.textContent = `${preface}Please use the following format: 
        "City", "City, Country", or (for USA only) "City, State, Country".`;
        setTimeout(hideErrorMsg, 8000);
    }

    function hideErrorMsg() {
        errorMsg.textContent = '';
        errorMsg.classList.remove('visible');
    }

    // Toggles value of tempUnits between metric and imperial
    function toggleTempUnits() {
        tempUnits = (tempUnits === 'metric') ? 'imperial' : 'metric';
    }

    function showDefaultLocation() {
        geocodingLocation({city: 'London', state: '', country: ''})
        .then(locationData => getCurrentWeatherData(locationData, tempUnits))
        .then(weatherData => updateUi(weatherData, tempUnits))
        .catch(() => displayInputError('Location not found. '));
    }
// #endregion 

// #region INIT
showDefaultLocation();

// #endregion
