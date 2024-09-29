
import Footer_and_HamBurger  from "./base.js";

const principalDynamic = new Footer_and_HamBurger();

principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();

/////////////////////////////////////////////////////////////////////////////

//More details with memberships levels

const data = "https://raw.githubusercontent.com/EduardOrellana/wdd231/main/chamber/data/memberships-leves.json";

const spaceMemberships = document.querySelector('#details-memberships');
const dialogMembership = document.querySelector('#dialog-membership');

async function getDataMembershiops() {
    try {
        const response = await fetch(data);

        if (!response.ok) {
            throw new Error('Error with the data');
        }
        else {
            console.log('Connection Succesful');
        }
        const objectData = await response.json();
        console.log(objectData.memberships)
        displayMemberships(objectData.memberships, spaceMemberships);

    } catch (error) {
        console.error('Error with the data json', error);
    }
}

function displayMemberships(object, space) {
    //Function to create and display the elements into the HTML

    object.forEach(element => {

        //Creation of the elements
        let card = document.createElement('div');
        let imageLogo = document.createElement('img');

        //Logo and Image
        imageLogo.setAttribute("src", element.image);
        imageLogo.setAttribute("alt", "Badge Membership");
        imageLogo.setAttribute("loading", "lazy");
        imageLogo.setAttribute("width", "100");
        imageLogo.setAttribute("height", "100");
        imageLogo.setAttribute('class', 'badges');

        card.setAttribute('id', "container-img");

        card.appendChild(imageLogo);

        space.appendChild(card);

        imageLogo.addEventListener('click', () => {  
            displayDetailsMemberships(element);
        })
    });
}

function displayDetailsMemberships(membership) {
    //Function to display the details of the memberships
    dialogMembership.innerHTML = `
    <button id="closeModal">❌</button>
    <h3>${membership.name}</h3>
    <p>
    <strong>Description</strong>:<br>
    ${membership.description}
    </p>
    `;
    dialogMembership.showModal();
    dialogMembership.classList.add('open');

    const closeMOdal = document.getElementById('closeModal');
    closeMOdal.addEventListener('click', (event) => {
        dialogMembership.classList.remove('open');
        event.preventDefault();
        dialogMembership.close();
    })
}

getDataMembershiops();

const form = document.querySelector('form');
const timestampInput = document.querySelector('#timestamp');

form.addEventListener('submit', function(event) {
    const today = new Date().toString();
    // Set the value of the hidden input field
    timestampInput.value = today;
});
