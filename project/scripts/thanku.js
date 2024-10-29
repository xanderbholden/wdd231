import generalData from "./base.js";
import { Footer_and_HamBurger, DisplayFetch, DisplayItems } from "./base.js";

const principalDynamic = new Footer_and_HamBurger();

principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();

////////////////////////////////////////////////df

const urlInfo = window.location.href;
const container = document.querySelector('#thanks-section');
console.log(urlInfo);

//Spliting URL

const cleanURL = urlInfo.split('?');

console.log(cleanURL);

const data = cleanURL[1].split('&');
console.log(data);

function show(word) {
    let result;

    console.log(word);

    data.forEach((element) => {
        console.log(element);

        if (element.startsWith(word)) {
            result = element.split('=')[1];
            result = decodeURIComponent(result).replace(/\+/g, ' ');
        }
    })
    return result;
}

function date(word) {
    let result = '';
    let end = '';
    console.log(word);

    data.forEach((element) => {
        console.log(element);
        if (element.startsWith(word)) {
            result = element.split('=')[1];
            result = decodeURIComponent(result);
            end = result.replace(/\+/g, ' ');
            console.log(end);
        } // end of the if
    });
    return end;
}

function email(word){
    let result = '';
    console.log(word);
    
    data.forEach((element) => {
        console.log(element);
        if (element.startsWith(word)){
            result = element.split('=');
            result = result[1].replace('%40', '@'); //replace the + sign
        } //end of the if
    })
    return(result);
}

container.innerHTML = `
    <h2>Thanks for your submition ${show('first')}</h2>
    <p><br>We have this information:</p><br>
    <ul id="list-info">
        <li>First Name: ${show('first')}</li>
        <li>Last Name: ${show('last')}</li>
        <li>Number: ${show('phone')}</li>
        <li>Email: ${email('email')}</li>
        <li>You selected the car: ${show('cars')}</li>
    </ul>
    <br>
    <br>
    <p>We are going to contact you soon</p>
`;