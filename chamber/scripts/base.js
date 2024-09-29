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
        const navigation = document.querySelector("nav");
        hamButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            hamButton.classList.toggle('open');
        });

    }

    refreshPage(){
        const logoMain = document.querySelector(".logo-commerce");

        logoMain.addEventListener('click', () =>{
            location.reload();
        })
    }
}

export default Footer_and_HamBurger;