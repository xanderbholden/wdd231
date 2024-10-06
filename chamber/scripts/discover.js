import Footer_and_HamBurger  from "./base.js";

const principalDynamic = new Footer_and_HamBurger();

principalDynamic.setfooter();
principalDynamic.refreshPage();
principalDynamic.setHambutton();

/////////////////////////////////////////////////////////////////////////////

//More details with memberships levels
//DOM Variables

const messageAlert = document.querySelector('#welcome p');

//Class to control the visit of the client
class VisitInfo {
    constructor(){
        this.currentDay = new Date();
        this.counterKey = "counter";
        this.lastDatKey = "lastDay";
        this.counter = this.getCounter();
        this.lastVisitDate = this.getLastVisitDate();
        this.differenceDays = this.calculateDays();
    }

    getCounter(){
        return Number(window.localStorage.getItem(this.counterKey)) || 0;
    }

    getLastVisitDate(){
        let storedDate = window.localStorage.getItem(this.lastDatKey);
        return storedDate ? new Date(storedDate) :  new Date();
    }

    calculateDays(){
        let difference = this.currentDay.getTime() - this.lastVisitDate.getTime();
        let result = Math.floor(difference / (1000 * 60 * 60 * 24));
        return result;
    }

    updateLocalStorage(){
        window.localStorage.setItem(this.counterKey, this.counter);
        window.localStorage.setItem(this.lastDatKey, this.currentDay.toISOString());
    }

    updateCounter(){
        this.counter ++;
        this.updateLocalStorage();
    }

    updateMessage(){
        if (this.counter == 1) {
            messageAlert.textContent = `Welcome! Let us know if you have any questions.`
        }
        else {
            if (this.differenceDays < 1){
            messageAlert.textContent = `Back so soon! Awesome!`;
            }
            else if(this.differenceDays == 1){
                messageAlert.textContent = `You last visited ${this.differenceDays} day ago`;
            }
            else {
                messageAlert.textContent = `You last visited ${this.differenceDays} days ago`;
            }
        }
    }

    handleVisit(){
        //Principal method to run all methods.
        this.updateCounter();   
        this.updateMessage();
        console.log(this.lastVisitDate);
        console.log(this.counter);
    }
}


const visitation = new VisitInfo();
visitation.handleVisit();

//Insert the collage.

const data = "https://raw.githubusercontent.com/xanderbholden/wdd231/main/chamber/data/collage.json";

const spaceForColalge = document.querySelector('.collage');

async function getDataForCollage() {
    try {
        const response = await fetch(data);

        if (!response.ok) {
            throw new Error('Error with the data');
        }
        else {
            console.log('Connections succesful');
        }
        const objectData = await response.json();
        console.log(objectData.collage);
        displayCollage(objectData.collage, spaceForColalge);
    } catch (error) {
        console.error('Error with the data json', error);
    }
}

function displayCollage(object, space) {
    //Function to display the collage into the website

    object.forEach(element => {
        //Creating of the elements to put inside the info and images.
        let card = document.createElement('figure');
        let image = document.createElement('img');
        let caption = document.createElement('figcaption');


        //Working with the data
        image.setAttribute("src", element.link);
        image.setAttribute("alt", `${element.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "300");
        image.setAttribute("class", "moving style-image");

        caption.textContent = `${element.description}`;

        card.setAttribute("class", "fig-images");

        card.appendChild(image);
        card.appendChild(caption);

        space.appendChild(card);

    });
}

getDataForCollage();