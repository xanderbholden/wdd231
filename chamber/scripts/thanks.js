
import Footer_and_HamBurger  from "./base.js";

const principalDynamic = new Footer_and_HamBurger();

principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();

/////////////////////////////////////////////////////////////////////////////
const url = window.location.href;
const container = document.querySelector('#thanks-section');
console.log(url);

//Divide the url

const infoFromForm = url.split('?');
console.log(infoFromForm);

const formData = infoFromForm[1].split('&');
console.log(formData);

function show(word) {
    let result = '';
    console.log(word);

    formData.forEach((element) => {
        console.log(element);
        if (element.startsWith(word)) {
            result = element.split('=')[1];
            result = decodeURIComponent(result).replace(/\+/g, ' '); // Decode and replace the + sign
        }
    });
    return result;
}
function date(word) {
    let result = '';
    let end = '';
    console.log(word);

    formData.forEach((element) => {
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
    
    formData.forEach((element) => {
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
        <li>Business: ${show('business')} </li>
        <li>Business Name: ${show('organizational')} </li>
    </ul>
    <br>
    <br>
    <p><strong>Description:</strong> ${show('description')}</p>
    <br>
    <p><strong>Membership Category:</strong> ${show('membership')}</p>
    <br>
    <p><strong>Date:</strong> ${date('timestamp')}</p>
`;
