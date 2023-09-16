const searchButton = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search');
const cityName = document.querySelector('.js-city-name');
const temperature = document.querySelector('.js-temperature');
const humidity = document.querySelector('.js-humidity-percent');
const wind = document.querySelector('.js-wind-speed');
const feel = document.querySelector('.js-real-feel-temp');
const pressure = document.querySelector('.js-pressure-hPa');
const icon = document.querySelector('.js-icon');

const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if(lastSearchedCity){
    searchInput.value = lastSearchedCity;
    updateWeather();
}

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        updateWeather();
    }
});

searchButton.addEventListener('click', () =>{
    updateWeather();
});

async function updateWeather() {
    const city = searchInput.value;

    if(city){
        try{
            localStorage.setItem('lastSearchedCity', city);

            const data = await getWeather(city);
            console.log(data);

            cityName.innerHTML = data.name;
            temperature.innerHTML = `${Math.round(data.main.temp)}&degC`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed} km/h`;
            feel.innerHTML = `${Math.round(data.main.feels_like)}&degC`;
            pressure.innerHTML = `${data.main.pressure} hPa`;

            if(data.weather[0].main === 'Clouds'){
                icon.src = 'images/clouds.png';
            }
            else if(data.weather[0].main === 'Clear'){
                icon.src = 'images/clear.png';
            }
            else if(data.weather[0].main === 'Drizzle'){
                icon.src = 'images/drizzle.png';
            }
            else if(data.weather[0].main === 'Mist'){
                icon.src = 'images/mist.png';
            }
            else if(data.weather[0].main === 'Rain'){
                icon.src = 'images/rain.png';
            }
            else if(data.weather[0].main === 'Snow'){
                icon.src = 'images/snow.png';
            }
            else if(data.weather[0].main === 'Thunderstorm'){
                icon.src = 'images/thunderstorm.png';
            }
            else if(data.weather[0].main === 'Haze'){
                icon.src = 'images/haze.png';
            }
            else if(data.weather[0].main === 'Fog' || 'Smoke' || 'Dust' || 'Sand' || 'Ash' || 'Squall' || 'Tornado'){
                icon.src = 'images/fog.png';
            }
            
            
        } catch(error){
            console.error("Error fetching weather data:", error);

            cityName.innerHTML = 'City not found';
            temperature.innerHTML = ``;
            humidity.innerHTML = '';
            wind.innerHTML = ``;
            icon.src = ``;
        }
    }
}

async function getWeather(city){
    const apiKey = "807b0a1f0c5726475a4225e8eb35a177";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    return data;
}