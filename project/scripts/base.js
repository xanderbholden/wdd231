//This file is the principal script to set the footer and the hambutton and refreshPage.

class Footer_and_HamBurger {

    setfooter(){

        const currentYear = document.getElementById('currentyear');
        const lastModified = document.getElementById('modified');
    
        currentYear.textContent = new Date().getFullYear();
        lastModified.textContent = `Last modification: ${document.lastModified}`;

    }

    setHambutton(){

        const hamButton = document.querySelector("#menu");
        const navigation = document.querySelector("#navMenu");
        
        hamButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            hamButton.classList.toggle('open');
        });

    }

    refreshPage(){
        const logoMain = document.querySelector("#logo-page");

        logoMain.addEventListener('click', () =>{
            location.reload();
        })
    }
}
//Class to get the api in each page without code it each time I want to
class DisplayFetch {

    constructor(url){
        this.url = url;
    }

    async getAPIFetch(){
        try {
            const response = await fetch(this.url);
            
            if (response.ok){
                // console.log(response.ok);
                let data = await response.json();

                // console.log(data);
                this.data = data.collection;

                return this.data;
            }
            else {
                throw Error(await response.text());
            }
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
}

const generalData = {

    json_cars : "https://raw.githubusercontent.com/EduardOrellana/wdd231/main/project/data/car-collection.json",

    api_weather(lat, lon, apiKey) {
        const baseURL = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        return baseURL;
    },

    api_weather_forecast(lat, lon, apiKey) {
        const baseURL = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        return baseURL;
    },

    getJSON_CARS() {
        return this.json_cars;
    }

}

class DisplayItems {

    constructor(item, container, dial) {
        this.item = item;
        this.container = container;
        this.dial = dial;
    }

    displayItems_Image_Title(object) {
        //This Method will display the items for the cars
        object = this.item;

        object.forEach(i => {

            let imagen = document.createElement('img');
            let title = document.createElement('h3');
            
            imagen.setAttribute('src', i.ilustration);
            imagen.setAttribute('alt', `${i.brand}`);
            imagen.setAttribute('width', 200);
            imagen.setAttribute('height', 200);
            imagen.setAttribute('loading', 'lazy');

            title.textContent = `${i.name}`;
            
            this.container.appendChild(title);
            this.container.appendChild(imagen);
        })
    }

    displayAll(object = this.item) {
        //This Method will display the items for the cars
        // object = this.item;

        object.forEach(i => {

            let slot1 = document.createElement('div');
            let slot2 = document.createElement('div');
            let imagen = document.createElement('img');
            let description = document.createElement('p');
            let details = document.createElement('article');
            
            imagen.setAttribute('src', i.ilustration);
            imagen.setAttribute('alt', `${i.brand}`);
            imagen.setAttribute('width', 200);
            imagen.setAttribute('height', 200);
            imagen.setAttribute('loading', 'lazy');

            description.innerHTML = `
                <p>Description:
                ${i.name}<br>
                Brand: ${i.brand}<br>
                Category: ${i.category}<br>
                Year: ${i.year}<br>
                Price: ${i.price}<br>
                </p>
            `;
            details.innerHTML = `
            <button id="more-details">More Details</button>
            `;

            slot1.appendChild(imagen);
            slot2.appendChild(description);
            slot2.appendChild(details);
            this.container.appendChild(slot1);
            this.container.appendChild(slot2);

            details.addEventListener('click', (event) => {
                event.preventDefault();
                this.display_dialog(i)
            })
        })
    }

    display_three_random_cars(object){

        object = this.item;

        const selectIndexes = new Set();

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        while (selectIndexes.size < 3){
            let index = getRandomNumber(0, object.length -1);
    
            if (!selectIndexes.has(index)){
                selectIndexes.add(index);
    
                let imagen = document.createElement('img');
                let title = document.createElement('h3');
                
                imagen.setAttribute('src', object[index].ilustration);
                imagen.setAttribute('alt', `${object[index].brand}`);
                imagen.setAttribute('width', 200);
                imagen.setAttribute('height', 200);
                imagen.setAttribute('loading', 'lazy');
    
                title.textContent = `${object[index].name}`;
                
                // this.container.appendChild(title);
                this.container.appendChild(imagen);

                imagen.addEventListener('click', (event) =>{
                    event.preventDefault();
                    this.display_dialog(object[index]);
                })
            }
        }
    }

    display_images(object){

        object = this.item;

        const selectIndexes = new Set();

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        while (selectIndexes.size < 10){
            let index = getRandomNumber(0, object.length -1);
    
            if (!selectIndexes.has(index)){
                selectIndexes.add(index);
    
                let imagen = document.createElement('img');
                let title = document.createElement('h3');
                
                imagen.setAttribute('src', object[index].ilustration);
                imagen.setAttribute('alt', `${object[index].brand}`);
                imagen.setAttribute('width', 200);
                imagen.setAttribute('height', 200);
                imagen.setAttribute('loading', 'lazy');
    
                title.textContent = `${object[index].name}`;
                
                // this.container.appendChild(title);
                this.container.appendChild(imagen);

                imagen.addEventListener('click', (event) =>{
                    event.preventDefault();
                    this.display_dialog(object[index]);
                })
            }
        }
    }

    display_dialog(item) {
        if (this.dial) {
            this.dial.innerHTML = '';
            this.dial.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${item.name}</h2>
            <h3>${item.category}</h3>
            <p><strong>Brand: </strong> ${item.brand}</p>
            <p><strong>Category: </strong> ${item.category}</p>
            <p><strong>Year: </strong> ${item.year}</p>
            <p><strong>Engine: </strong> ${item.engine}</p>
            <p><strong>Cylinder: </strong> ${item.cylinder}</p>
            <p><strong>Transmission: </strong> ${item.transmission}</p>
            <p><strong>Fuel: </strong> ${item.fuel}</p>
            <p><strong>Price: </strong> ${item.price}</p>
            <p><strong>Color: </strong> ${item.color}</p>
            `;
            this.dial.showModal();
            this.dial.classList.add('open');
        
            const closeModal = document.getElementById('closeModal');
            closeModal.addEventListener('click', (event) => {
                event.preventDefault();
                this.dial.classList.remove('open');
                this.dial.close();
            });
        }
    }

    get_data_trucks(){
        //Methods to filter trucks
        const trucks = this.item.filter(truck => truck.category === "Truck");
        return trucks;
    }

    get_names_cars(object = this.item){
        let cars = [];

        object.forEach(i => {
            cars.push(i.name);
        })

        return cars;
    }
}

export default generalData;
export { DisplayFetch, Footer_and_HamBurger, DisplayItems };