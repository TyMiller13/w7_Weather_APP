//grab form
let form = document.getElementById('weatherForm');

async function handleFormSubmit(e){

    e.preventDefault();

    let cityName = e.target.cityName.value;
    // console.log(cityName)

    let cityInfo = await getWeatherInfo(cityName);

    buildCityCard(cityInfo);

    e.target.cityName.value = '';
}

form.addEventListener('submit', handleFormSubmit);

//build a function that takes in a city and makes a GET request to the weather API and returns data

async function getWeatherInfo(cityName){
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}&units=imperial`)
    let data = await res.json();
    return data;
}

// create a function that will take in city object and build card to post within page
function buildCityCard(cityObj){
    // console.log(cityObj);

    //card div
    let card = document.createElement('div');
    card.className = 'card h-100 bg-warning-subtle shadow-lg';
    

    //card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.style = 'text-align: center;'
  

    //city name element
    let cityName = document.createElement('h1');
    cityName.className = 'card-title';
    cityName.innerHTML = cityObj.name;

    let weatherCondition = document.createElement('h6')
    weatherCondition.className = 'card-subtitle text-muted my-2';
    weatherCondition.innerHTML = cityObj.weather[0].description;

    let currentTemp = document.createElement('h5');
    currentTemp.style = 'color: green'
    currentTemp.className = 'card-text';
    currentTemp.innerHTML = `Current Temp: ${cityObj.main.temp}℉`

    let windSpeed = document.createElement('h5');
    windSpeed.className = 'card-text';
    windSpeed.innerHTML = `Wind Speed: ${cityObj.wind.speed} MPH`

    let feelsLike = document.createElement('h5');
    feelsLike.className = 'card-text';
    feelsLike.innerHTML = `Feels Like: ${cityObj.main.feels_like}℉`

    let lowTemp = document.createElement('h5');
    lowTemp.style = 'color: blue'
    lowTemp.className = 'card-text';
    lowTemp.innerHTML = `Low: ${cityObj.main.temp_min}℉`

    let highTemp = document.createElement('h5');
    highTemp.style = 'color: red'
    highTemp.className = 'card-text';
    highTemp.innerHTML = `High: ${cityObj.main.temp_max}℉`
    
    
    //add elements to card body and add card body to card

    cardBody.append(cityName);
    cardBody.append(weatherCondition);
    cardBody.append(currentTemp);
    cardBody.append(windSpeed);
    cardBody.append(feelsLike);
    cardBody.append(lowTemp);
    cardBody.append(highTemp);

    card.append(cardBody);


    console.log(card)

    //Create a column for the row
    let col = document.createElement('div')
    col.className = 'col-12 col-md-6 col-lg-3 my-3'

    //Add card to column
    col.append(card);

    //Get the country display and add the column
    let display = document.getElementById('cityWeatherDisplay');
    display.append(col)
    
}