import generalData from "./base.js";
import { Footer_and_HamBurger, DisplayFetch, DisplayItems } from "./base.js";

// Initialize the footer and hamburger menu
const principalDynamic = new Footer_and_HamBurger();
principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();

// Get the URL for the cars JSON data
const url_cars = `${generalData.getJSON_CARS()}?t=${new Date().getTime()}`;  // Prevent caching with timestamp

// Create an instance to fetch car data
const ActionAPI = new DisplayFetch(url_cars);

const containerCars = document.querySelector('#container-collection');
const _dialog = document.querySelector('dialog');

// Fetch the car data
const data = await ActionAPI.getAPIFetch();
console.log(data);  // Log the fetched data for debugging

// Initialize the DisplayItems with fetched data
const _displayer = new DisplayItems(data, containerCars, _dialog);
_displayer.displayAll();  // Display all cars initially

// Buttons
const _truckButton = document.querySelector('#truck');
const _all = document.querySelector('#all');
const _gallery = document.querySelector('#grid');
const _list = document.querySelector('#list');

// Filter trucks and log the results
const _trucks = _displayer.get_data_trucks();
console.log(_trucks);

_truckButton.addEventListener('click', () => {
    containerCars.innerHTML = '';  // Clear previous content
    containerCars.classList.remove('list');
    containerCars.classList.add('grid');
    _displayer.displayAll(_trucks);  // Display only trucks
});


_all.addEventListener('click', () => {
    containerCars.innerHTML = '';  // Clear previous content
    containerCars.classList.remove('list');
    containerCars.classList.add('grid');
    _displayer.displayAll();  // Display all cars
});


_gallery.addEventListener('click', () => {
    containerCars.innerHTML = '';  // Clear previous content
    containerCars.classList.remove('list');
    containerCars.classList.add('grid');
    _displayer.display_images();  // Display in gallery format
});


_list.addEventListener('click', () => {
    containerCars.innerHTML = '';  // Clear previous content
    containerCars.classList.remove('grid');
    containerCars.classList.add('list');
    _displayer.displayAll();  // Display all cars in list format
});
