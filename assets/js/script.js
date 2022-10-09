// create variables
var form = document.querySelector('form');
var cityInput = document.getElementById('search-input');
var ul = document.querySelector('.list-group');
var currentInfo = document.getElementById('current-info');
var days = document.querySelectorAll('.day');

var APIKey = '0478340e8da740af37394adbeb28c325'
var city
var cities = []
var fiveDays = []

// save city name to local storage
function saveSearch() {
    if (!cities.includes(city)) {
        cities.push(city)
        localStorage.setItem('cities', JSON.stringify(cities))
    }
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
            tempP.textContent = 'Temp: ' + temp + ' °F';
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
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey)
        .then(function(response) {
            return response.json()
        })
        .then(function(cityName) {
            console.log(cityName);
            for (var i = 6; i < cityName.list.length; i = i + 8) {
                fiveDays.push(cityName.list[i]);
                console.log(fiveDays)   
            }

            for (var i = 0; i < fiveDays.length; i++) {
                var forecastDate = moment(fiveDays[i].dt, 'X').format('l');
                var forecastIcon = 'http://openweathermap.org/img/wn/' + fiveDays[i].weather[0].icon + '.png';
                var forecastTemp = fiveDays[i].main.temp
                var forecastWind = fiveDays[i].wind.speed;
                var forecastHumidity = fiveDays[i].main.humidity;
                
                // create elements (date p, icon, 3 p)
                var forecastDateP = document.createElement('p');
                var forecastImg = document.createElement('img');
                var forecastTempP = document.createElement('p');
                var forecastWindP = document.createElement('p');
                var forecastHumidityP = document.createElement('p');

                // modify elements
                forecastDateP.textContent = forecastDate;
                forecastImg.setAttribute('src', forecastIcon);
                forecastImg.setAttribute('alt', fiveDays[i].weather[0].description);
                forecastTempP.textContent = 'Temp: ' + forecastTemp + ' °F';
                forecastWindP.textContent = 'Wind: ' + forecastWind + ' mph';
                forecastHumidityP.textContent = 'Humidity: ' + forecastHumidity + ' %';

                // append elements
                days[i].appendChild(forecastDateP);
                days[i].appendChild(forecastImg);
                days[i].appendChild(forecastTempP);
                days[i].appendChild(forecastWindP);
                days[i].appendChild(forecastHumidityP);

            }
        })

}

// function for submit form
function submitForm(event) {
    event.preventDefault();
   
    while (currentInfo.hasChildNodes()) {
        currentInfo.removeChild(currentInfo.firstChild);
    }
    
    fiveDays = [];

    for (var i = 0; i < days.length; i++) {
        while (days[i].hasChildNodes()) {
            days[i].removeChild(days[i].firstChild);
        }
    }

    var value = cityInput.value;
    value = value.toLowerCase();
    var valueWords = value.split(" ");

    for (var i = 0; i < valueWords.length; i++) {
        valueWords[i] = valueWords[i][0].toUpperCase() + valueWords[i].substr(1);
    }

    city = valueWords.join(" ");

    getCurrentWeather(city);
    getForecast(city);
    cityInput.value = "";
}

// submit listener for form
form.addEventListener('submit', submitForm)

ul.addEventListener('click', function(event) {
    event.preventDefault();
   
    while (currentInfo.hasChildNodes()) {
        currentInfo.removeChild(currentInfo.firstChild);
    }
    
    fiveDays = [];
    
    for (var i = 0; i < days.length; i++) {
        while (days[i].hasChildNodes()) {
            days[i].removeChild(days[i].firstChild);
        }
    }
    
    var element = event.target 

    if (element.matches('li')) {
        city = element.innerHTML
        getCurrentWeather(city);
        getForecast(city);
    }
})


getSearchHistory()
renderHistory()