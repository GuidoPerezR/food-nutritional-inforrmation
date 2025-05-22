const $ = (element) => document.querySelector(element)

const fruitInput = $('#input-text')
const searchButton = $('#search-button')
const form = $('#form-content')
const infoContainer = $('#info-container')
const errorContainer = $('#error-message-container')
const loaderContainer = $('#loader-container')
const toggleButton = $('#toggle-dark');
const body = $('#body')

const createCardInfo = (data) => {
    infoContainer.innerHTML = '';
    const article = document.createElement('article');
    article.className = 'nutrition-info';
    article.innerHTML = `
            <header class="nutrition-info-header">
                <h2>Nutrition Info</h2>
                <span></span>
                <h3>${data?.name}</h3>
                <span></span>
            </header>
            <div class="nutrition-info-content">
                <div class="nutrition-item">
                    <p>Calories</p>
                    <p>${data?.nutritions?.calories}</p>
                </div>
                <div class="nutrition-item">
                    <p>Fat</p>
                    <p>${data?.nutritions?.fat} g</p>
                </div>
                <div class="nutrition-item">
                    <p>Sugar</p>
                    <p>${data?.nutritions?.sugar} g</p>
                </div>
                <div class="nutrition-item">
                    <p>Carbohydrates</p>
                    <p>${data?.nutritions?.carbohydrates} g</p>
                </div>
                <div class="nutrition-item">
                    <p>Protein</p>
                    <p>${data?.nutritions?.protein} g</p>
                </div>
            </div>
    `;
    infoContainer.appendChild(article)

    const div = document.createElement('div')
    div.className = 'up-button-container'
    div.innerHTML = `<a class="up-button" href="#fruit-track-container"><i class="fa-solid fa-arrow-up"></i></a>`

    infoContainer.appendChild(div)

    infoContainer.style.display = 'flex'
}

const createMessageError = () => {
    errorContainer.innerHTML = ''
    const errorMessage = document.createElement('div')
    errorMessage.className = 'error-message'
    errorMessage.innerHTML = `
    <p class="error-text">Your fruit was not found. Try with another one!</p>
    <img class="error-image" src="./images/sad-apple.png" alt="Image of a sad apple">`
    errorContainer.appendChild(errorMessage)

    const div = document.createElement('div')
    div.className = 'up-button-container'
    div.innerHTML = `<a class="up-button" href="#fruit-track-container"><i class="fa-solid fa-arrow-up"></i></a>`

    errorContainer.appendChild(div)

    errorContainer.style.display = 'flex'

}

const getFruitInfo = async fruit => {
    const url = `https://fruit-track.onrender.com/fruit-info/?fruit=${encodeURIComponent(fruit)}`

    try {
        const response = await fetch(url);
        const result = await response.json();
        return { status: response.ok, result }
    } catch (error) {
        //Mensaje de error
        console.log(error)
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    fruitInput.blur(); // Hacer que se cierre el input, Caso en moviles
    infoContainer.style.display = 'none';
    errorContainer.style.display = 'none';

    searchButton.setAttribute('disabled', '')
    searchButton.classList.add('disabled')


    loaderContainer.style.display = 'flex';
    setTimeout(() => {
        loaderContainer.scrollIntoView();
    }, 300);


    const fruitText = fruitInput.value
    const fruitInfo = await getFruitInfo(fruitText)

    if (fruitInfo?.status) {
        createCardInfo(fruitInfo?.result)
    } else {
        createMessageError()
    }
    fruitInput.value = ''

    loaderContainer.style.display = 'none'
    searchButton.removeAttribute('disabled', '')
    searchButton.classList.remove('disabled')
})


toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Guardar en localStorage si tiene el dark-mode o no
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
});

window.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
});