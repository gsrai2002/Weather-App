const searchButton = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search');
const cityName = document.querySelector('.js-city-name');
const temperature = document.querySelector('.js-temperature');
const humidity = document.querySelector('.js-humidity-percent');
const wind = document.querySelector('.js-wind-speed');


searchButton.addEventListener('click', async function () {
    const city = searchInput.value;

    if(city){
        try{
            const data = await getWeather(city);
            console.log(data);

            cityName.innerHTML = data.name;
            temperature.innerHTML = `${Math.round(data.main.temp)}&degC` ;
        } catch(error){

        }
    }
});

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