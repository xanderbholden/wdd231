
import Footer_and_HamBurger from "./base.js";

const principalDynamic = new Footer_and_HamBurger();

principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();


// document.addEventListener("DOMContentLoaded", () => {
//     document.body.classList.add('loaded');
// })


//Three Business
const data = 'https://raw.githubusercontent.com/EduardOrellana/wdd231/main/chamber/data/members.json';

//API Weather----------------------------------------------------------------------------------------------
const weatherContainer = document.querySelector('#weather-list');
const placeForecast = document.querySelector('#weather-forecast');
const weatherIcon = document.querySelector('#icon-weather');

// 14.529898598648922, -90.59526334935519

let lat = 14.5269;
let lon = -90.5875;
let apiKey = '8aa0b13698894c5f56ccba0bd220bcab';

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const urlForecast = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function apiFetch() {
    try {
        const response = await fetch(url);
        const response2 = await fetch(urlForecast);
        if (response.ok && response2.ok) {
            console.log(response.ok);
            const data = await response.json();
            const data2 = await response2.json();

            console.log(data);
            console.log(data2);

            displayResultsWeather(data);
            displayForecastWeather(data2)
        }
        else {
            throw Error(await response.text());
            throw Error(await response2.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displayResultsWeather(data) {
    //URL of the Icon
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconURL);
    weatherIcon.setAttribute('alt', 'Icon');

    //List with the weather information-----------------------------------------------------------------------
    const grades = document.createElement('li');
    const kindWeather = document.createElement('li');
    const high = document.createElement('li');
    const low = document.createElement('li');
    const humidity = document.createElement('li');
    const sunrise = document.createElement('li');
    const sunset = document.createElement('li');

    //Set and write the values---------------------------------------------------------------
    grades.textContent = `${Math.round(data.main.temp)}° F`;
    kindWeather.textContent = data.weather[0].description;
    high.textContent = `High: ${Math.round(data.main.temp_max)}°`;
    low.textContent = `Low: ${Math.round(data.main.temp_min)}°`;
    humidity.textContent = `Humidity: ${data.main.humidity}`;
    sunrise.textContent = `Sunrise: ${timing(data.sys.sunrise)}`;
    sunset.textContent = `Sunset: ${timing(data.sys.sunset)}`;

    weatherContainer.appendChild(grades);
    weatherContainer.appendChild(kindWeather);
    weatherContainer.appendChild(high);
    weatherContainer.appendChild(low);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(sunrise);
    weatherContainer.appendChild(sunset);
}

let timing = (sunrise_or_sunset) => {
    const date = new Date(sunrise_or_sunset * 1000);
    const hrs = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formatting = `${hrs.toString().padStart(2, '0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    return formatting
}

function displayForecastWeather(data) {
    const tomorrowTemp = document.createElement('p');
    const tempTomorrow = converterTem(data.list[4].main.temp)
    const getDay = selectDay(data.list[4].dt);
    tomorrowTemp.textContent = `${getDay}: ${tempTomorrow}`;
    placeForecast.appendChild(tomorrowTemp);

    const dayAfterTomorrow = document.createElement('p');
    const temp2 = converterTem(data.list[12].main.temp)
    const getDay2 = selectDay(data.list[12].dt);
    dayAfterTomorrow.textContent = `${getDay2}: ${temp2}`;
    placeForecast.appendChild(dayAfterTomorrow);

    const dayAfterTomorro2 = document.createElement('p');
    const temp3 = converterTem(data.list[20].main.temp)
    const getDay3 = selectDay(data.list[20].dt);
    dayAfterTomorro2.textContent = `${getDay3}: ${temp3}`;
    placeForecast.appendChild(dayAfterTomorro2);

}

let converterTem = (value) => {
    let result = (value - 273.15) * 9/5 + 32;
    return `${Math.round(result)}  ℉`;
}

let selectDay = (value) => {
    const day = new Date(value * 1000);
    const dayText = daysOfWeek[day.getDay()];
    return dayText;
}

apiFetch();

const directory = document.querySelector('#contacts');

async function getDataDirectory() {
    try {
        const response = await fetch(data);
        if (!response.ok){
            throw new Error('Error al cargar los datos');
        }
        const objectData = await response.json();
        // console.log(objectData.directory);
        displayDirectory(objectData.directory);
    } catch(error) {
        console.error('Error with the data json', error)
    }
}
const displayDirectory = (companies) => {

    let count = 0;

    companies.forEach(element => {
        //Creating the cards per business
        if (count < 3){
            count ++;
            let card = document.createElement('div');
            let subcard = document.createElement('div');
            let subcard2 = document.createElement('div');

            let name = document.createElement('h3');
            let portrait = document.createElement('img');
            let number = document.createElement('p');
            let address = document.createElement('p');
            let website = document.createElement('a');
            // let website = document.createElement('p');
            let kind = document.createElement('p');
            let space = document.createElement('br')

    
            //Content
    
            name.textContent = `Business: ${element.name}`;
            
            subcard.setAttribute("id", "subcard-business");
            subcard2.setAttribute("id", "subcard2");

            portrait.setAttribute("src", element.image);
            portrait.setAttribute("alt", "logo business");
            portrait.setAttribute("loading", "lazy");
            portrait.setAttribute("width", "150");
            portrait.setAttribute("height", "100");
    
            website.setAttribute('href', element.website_url)
            website.setAttribute('target', '_blank')
            website.textContent = `Web Site`;
            number.textContent = `${element.phone_number}`;
            address.textContent = `${element.address}`;
            kind.textContent = `Industry: ${element.type}`;
    
            card.appendChild(name);
            card.appendChild(subcard);
            subcard.append(subcard2);

            subcard.appendChild(portrait);
            subcard2.appendChild(address);
            subcard2.appendChild(number);
            subcard2.appendChild(kind);
            subcard2.appendChild(website);
            subcard2.appendChild(space)
            subcard2.appendChild(space)

            
    
            //adding into the directory section:
            directory.appendChild(card)


        }
    });
}


getDataDirectory();
