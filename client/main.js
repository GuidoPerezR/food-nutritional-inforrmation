const $ = (element) => document.querySelector(element)

const fruitInput = $('#input-text')
const searchButton = $('#search-button')
const form = $('#form-content')
const infoContainer = $('#info-container')

const createCardInfo = (data) => {
    infoContainer.innerHTML = '';
    const article = document.createElement('article');
    article.className = 'nutrition-info-container';
    article.innerHTML = `
        <div class="nutrition-info">
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
        </div>
    `;
    infoContainer.appendChild(article)
}

const getFruitInfo = async fruit => {
    const url = `http://localhost:8000/fruit-info/?fruit=${encodeURIComponent(fruit)}`
    try {
        const response = await fetch(url);
        const result = await response.json();
        createCardInfo(result)
        infoContainer.style.display = 'block'
    } catch (error) {
        //Mensaje de error
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fruitText = fruitInput.value
    getFruitInfo(fruitText)
})