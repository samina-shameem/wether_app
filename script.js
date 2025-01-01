// script to fetch weather data using openweather api
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');

const API_KEY = '0cede45c2541d939f4ddbdc37801b8c7';//replace with API key

form.addEventListener('submit', function (event) {
    event.preventDefault();//prevent the form from refreshing the page

    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherDisplay.innerHTML = '<p>Please enter a city name.</p>';
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('City not found');
        }
        const data=await response.json();
        displayWeather(data);
    }catch(error){
         weatherDisplay.innerHTML=`<p>Error:${error.message}</p>`;
    }
    
}

function displayWeather(data){
    const{ name, main, weather }=data;
    weatherDisplay.innerHTML=`
          <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}
