// create variables
var form = document.querySelector('form');
var cityInput = document.getElementById('search-input');
var ul = document.querySelector('.list-group');
var currentInfo = document.getElementById('current-info');
var days = document.querySelectorAll('.day');

var APIKey = '0478340e8da740af37394adbeb28c325'
var city
var cities = []

// save city name to local storage
function saveSearch() {
    // find way to not allow repeat words in cities[]
    cities.push(city)
    localStorage.setItem('cities', JSON.stringify(cities))
    console.log(cities)
}

// get city name out of local storage
function getSearchHistory() {
    var cityHistory = JSON.parse(localStorage.getItem('cities'));
    console.log(cityHistory)
    
    if (cityHistory !== null) {
        cities = cityHistory;
    }
}

// render cities searched into search history list
function renderHistory() {
    ul.innerHTML = ""

    for (var i = 0; i < cities.length; i++) {
        var searchedCity = cities[i];

        var li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = searchedCity;

        ul.appendChild(li);
    }
    // click event listener for li items
}

// function to fetch data for current weather
function getCurrentWeather(city) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey)
        .then(function(response) {
            return response.json()
        })
        .then(function(cityName) {
            console.log(cityName);
            var today = moment().format('l');
            var icon = 'http://openweathermap.org/img/wn/' + cityName.weather[0].icon + '.png';
            var temp = cityName.main.temp
            var wind = cityName.wind.speed
            var humidity = cityName.main.humidity

            // create elements (h2, icon, 3 p)
            var h2 = document.createElement('h2');
            var img = document.createElement('img');
            var tempP = document.createElement('p');
            var windP = document.createElement('p');
            var humidityP = document.createElement('p');
            // modify elements
            img.setAttribute('src', icon);
            img.setAttribute('alt', cityName.weather[0].description)
            h2.textContent = city + ' (' + today + ') ';
            tempP.textContent = 'Temp: ' + temp + '°F';
            windP.textContent = 'Wind: ' + wind + ' mph';
            humidityP.textContent = 'Humidity: ' + humidity + ' %';
            humidityP.setAttribute('style', 'padding-bottom: 10px')

            // append elements
            currentInfo.appendChild(h2);
            currentInfo.appendChild(tempP);
            currentInfo.appendChild(windP);
            currentInfo.appendChild(humidityP);
            h2.appendChild(img);

            saveSearch()
            getSearchHistory()
            renderHistory()
        })

}

// function to fetch data for 5 day forecast
function getForecast(city) {
    // http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
        // moment(date)
        // get icon
        // get temp, wind, and humidity
        // create elements (h2, icon, 3 p)
        // modify elements
        // append elements

}

// function for submit form
function submitForm(event) {
    event.preventDefault();
   
    while (currentInfo.hasChildNodes()) {
        currentInfo.removeChild(currentInfo.firstChild);
    }

    city = cityInput.value;
    getCurrentWeather(city);
    getForecast(city);
    cityInput.value = "";
}

// submit listener for form
form.addEventListener('submit', submitForm)

// click listener for search history cities
    // use text content in <button> to create var that will be used to fetch the data above

getSearchHistory()