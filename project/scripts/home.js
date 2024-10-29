import generalData from "./base.js";
import { Footer_and_HamBurger, DisplayFetch, DisplayItems } from "./base.js";

const principalDynamic = new Footer_and_HamBurger();

principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();

//Main Script//////////////////////////////////////////////////////
const url_cars = generalData.getJSON_CARS();

const ActionAPI = new DisplayFetch(url_cars);
const containerCars = document.querySelector(".cars-container");
const _dialog = document.getElementById('_dialog');

const dataC = await ActionAPI.getAPIFetch();


const _cars = new DisplayItems(dataC, containerCars, _dialog);
_cars.display_three_random_cars();

const totalCars = dataC.length;

console.log("Esta es mi data");
console.log(totalCars);
console.log(dataC);