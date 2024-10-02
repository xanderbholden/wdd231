//Javacript file of directory.html


//Footer & Hamburger
const currentYear = document.getElementById('currentyear');
const lastModified = document.getElementById('modified');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last modification: ${document.lastModified}`;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

//Click on the logo and refreshit:

const logoMain = document.querySelector(".logo-commerce");

logoMain.addEventListener('click', () =>{
    location.reload();
})

//Get the data:

const data = 'https://raw.githubusercontent.com/xanderbholden/wdd231/main/chamber/data/members.json';


const directory = document.querySelector('#directory');

async function getDataDirectory() {
    try {

        const response = await fetch(data);

        if (!response.ok){
            throw new Error('Error al cargar los datos');
        }

        const objectData = await response.json();
        console.log(objectData.directory);
        displayDirectory(objectData.directory);
    
    } catch(error) {
        console.error('Error with the data json', error)
    }
}


const displayDirectory = (companies) => {
    companies.forEach(element => {
        //Creating the cards per business

        let card = document.createElement('section');
        let name = document.createElement('h2');
        let portrait = document.createElement('img');
        let number = document.createElement('p');
        let address = document.createElement('p');
        let website = document.createElement('a');
        // let website = document.createElement('p');
        let kind = document.createElement('p');
        let space = document.createElement('br')

        //Content

        name.textContent = `Business: ${element.name}`;
        
        portrait.setAttribute("src", element.image);
        portrait.setAttribute("alt", "logo business");
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "150");
        portrait.setAttribute("height", "150");

        website.setAttribute('href', element.website_url)
        website.setAttribute('target', '_blank')
        website.textContent = `Web Site`;
        number.textContent = `${element.phone_number}`;
        address.textContent = `${element.address}`;
        kind.textContent = `Industry: ${element.type}`;


        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(number);
        card.appendChild(kind);
        card.appendChild(website);
        card.appendChild(space)
        card.appendChild(space)

        //adding into the directory section:
        directory.appendChild(card)

    });
}


getDataDirectory();


//Butons----------------------------------------------------------------------------------------------------
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	directory.classList.add("grid");
	directory.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
	directory.classList.add("list");
	directory.classList.remove("grid");
}