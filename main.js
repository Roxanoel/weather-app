/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-methods.js":
/*!****************************!*\
  !*** ./src/dom-methods.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateUi\": () => (/* binding */ updateUi)\n/* harmony export */ });\nfunction updateLocationName(locationName) {\n    document.querySelector('h1').textContent = locationName;\n}\n\nfunction updateUi(weatherData) {\n    updateLocationName(weatherData.location);\n}\n\n\n\n//# sourceURL=webpack://weather-app/./src/dom-methods.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-data */ \"./src/weather-data.js\");\n/* harmony import */ var _ui_search_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui-search-util */ \"./src/ui-search-util.js\");\n/* harmony import */ var _dom_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-methods */ \"./src/dom-methods.js\");\n/* eslint-disable no-use-before-define */\n\n\n\n\n// #region CACHED REFS\nconst form = document.getElementById('location-form');\nconst searchInput = document.getElementById('search-input');\nconst errorMsg = document.getElementById('search-error');\n\nlet tempUnits = 'metric';  // Can be 'metric' or 'imperial'\nconst tempToggleSwitch = document.querySelector('#temperature-settings input');\ntempToggleSwitch.addEventListener('change', toggleTempUnits);\n// #endregion\n\n// #region ADDING LISTENERS\nform.addEventListener('submit', (e) => {\n    e.preventDefault();\n    hideErrorMsg();  // In case the error message is not already hidden. \n    // Validation\n    if (searchInput.validity.valid) {\n        // If correct, handle data for API call\n        const parsedInput = (0,_ui_search_util__WEBPACK_IMPORTED_MODULE_1__.parseSearchInput)(searchInput.value);\n        (0,_weather_data__WEBPACK_IMPORTED_MODULE_0__.geocodingLocation)(parsedInput[0], parsedInput[1], parsedInput[2])\n        .then(locationData => (0,_weather_data__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeatherData)(locationData, tempUnits))\n        .then(weatherData => (0,_dom_methods__WEBPACK_IMPORTED_MODULE_2__.updateUi)(weatherData))\n        .catch(() => displayInputError('Location not found. '));\n    }\n    // If incorrect, display error message detailing format. \n    else {\n        displayInputError('Invalid format. ');\n    }\n})\n// #endregion\n\n// #region FUNCTION DEFS\n    \n    // Displays error message upon failed search request. It is possible to add a preface to the message.\n    function displayInputError(preface) {\n        errorMsg.classList.add('visible');\n        errorMsg.textContent = `${preface}Please use the following format: \n        \"City\", \"City, Country\", or (for USA only) \"City, State, Country\".`;\n        setTimeout(hideErrorMsg, 8000);\n    }\n\n    function hideErrorMsg() {\n        errorMsg.textContent = '';\n        errorMsg.classList.remove('visible');\n    }\n\n    // Toggles value of tempUnits between metric and imperial\n    function toggleTempUnits() {\n        tempUnits = (tempUnits === 'metric') ? 'imperial' : 'metric';\n    }\n// #endregion \n\n\n(0,_weather_data__WEBPACK_IMPORTED_MODULE_0__.geocodingLocation)('London', '', '')\n.then(locationData => (0,_weather_data__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeatherData)(locationData))\n.then(weatherData => console.log(weatherData));\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/ui-search-util.js":
/*!*******************************!*\
  !*** ./src/ui-search-util.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parseSearchInput\": () => (/* binding */ parseSearchInput)\n/* harmony export */ });\nfunction parseSearchInput(searchInput) {\n    // Turn input into array by splitting at commas \n    const split = searchInput.split(',');\n    // Check length of array to determine what to do (might need to add empty strings to make it total 3 so it fits well in function call)\n    while(split.length < 3) {\n        split.push('');\n    }\n    return split;\n}\n\n\n\n//# sourceURL=webpack://weather-app/./src/ui-search-util.js?");

/***/ }),

/***/ "./src/weather-data.js":
/*!*****************************!*\
  !*** ./src/weather-data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"geocodingLocation\": () => (/* binding */ geocodingLocation),\n/* harmony export */   \"getCurrentWeatherData\": () => (/* binding */ getCurrentWeatherData)\n/* harmony export */ });\n/* eslint-disable no-useless-catch */\nasync function geocodingLocation(city, state, country) {\n    try {\n        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=2a896af0add10ce545b2b79922b2e72a`);\n        const json = await response.json();\n        return {\n            lat: json[0].lat, \n            lon: json[0].lon,\n        };\n    } catch(err) {\n        throw err;\n    }\n}\n\nasync function getCurrentWeatherData(location, tempUnits) {\n    try {\n        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=2a896af0add10ce545b2b79922b2e72a&units=${tempUnits}`);\n        const json = await response.json();\n        return {\n            location: json.name,\n            description: json.weather[0].description,\n            temp: json.main.temp,\n            humidity: json.main.humidity,\n            feels_like: json.main.feels_like,\n        };\n    } catch(err) {\n        console.error('Problem with getting weather data! Perhaps later I will want a UI thing to happen here.');\n        throw err;\n    }\n}\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/weather-data.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;