// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

let lon = 6.64;
let lat = 49.75;

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=8aa0b13698894c5f56ccba0bd220bcab`;

async function apiFetch() {
    try{
        const response = await fetch(url);
        if (response.ok) { //if the response is true
            
            console.log(response.ok); //testing
            const data = await response.json();
            console.log(data); //testing
            displayResults(data);        
        }
        else { //if not
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', 'Icon');
    captionDesc.textContent = `${desc}`;
}