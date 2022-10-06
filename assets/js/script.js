// create variables
var form = document.querySelector('form');
var cityInput = document.getElementById('search-input');
var ul = document.querySelector('.list-group');
var currentInfo = document.getElementById('current-info');
var days = document.querySelectorAll('.day');

var APIKey = '0478340e8da740af37394adbeb28c325'
var city
var cities = []

// function save to local storage
    // save city name into blank array

// function to get city name out of local storage
    // call fetch functions?

// function to fetch data for current weather
function getCurrentWeather(city) {
    // http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        // get city name / date
        // get icon
        // get temp, wind, and humidity
        // create elements (h2, icon, 3 p)
        // modify elements
        // append elements
        // call save to local storage function
        // for loop for array of cities searched
            // create button
            // modify button
            // append button

}

// function to fetch data for 5 day forecast
function getForecast(city) {
    // http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        // get date
        // get icon
        // get temp, wind, and humidity
        // create elements (h2, icon, 3 p)
        // modify elements
        // append elements

}

// function for submit form
function submitForm(event) {
    event.preventDefault();
    city = cityInput.value;
    getCurrentWeather(city);
    getForecast(city);
    cityInput.value = "";
}
    // prevent default
    // modify var city to input.value
    // call fetch functions with var city

// submit listener for form
form.addEventListener('submit', submitForm)
// click listener for search history cities
    // use text content in <button> to create var that will be used to fetch the data above