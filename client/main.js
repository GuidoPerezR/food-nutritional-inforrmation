const searchBtn = document.querySelector('#search-button')
const themeBtn = document.querySelector('#toggle-dark')
const body = document.querySelector('body');
const contenedorInfo = document.querySelector('#info-container');
const $templateData = document.querySelector('#info').content;
const $templateError = document.querySelector('#error').content;
const form = document.querySelector('#form-content');
const loader = document.querySelector('.loader');


searchBtn.addEventListener('click', (e) =>{
    
    e.preventDefault();
    let inputValue = document.querySelector('#input-text').value;

    LimpiarHtml();
    ExtraerDatos(inputValue);
    form.reset();
})

function cargandoLoader(){
    const span = document.createElement('span');
    span.classList.add("loader")

    contenedorInfo.appendChild(span)
}


async function ExtraerDatos(name){
    
    cargandoLoader()
    
    try {
      
        const data = await fetch(`http://localhost:3001/api/fruit?name=${encodeURIComponent(name)}`);

        if (!data.ok) {           
            // Lanza un error con el mensaje personalizado
            throw new Error("Your fruit was not found. Try with another one!");
        }
        
        const response = await data.json();
      
        LimpiarHtml();
        AgregandoCard(response)

    } catch (error) {
        mensajeError(error)
    }
}

function AgregandoCard(data){

    const tempplateInfo = $templateData.cloneNode(true);
    
    tempplateInfo.querySelector(".nutrition-info-header h3").textContent = data.name;
    tempplateInfo.querySelector('.calories span').textContent = data.nutritions.calories
    tempplateInfo.querySelector('.peso span').textContent = `${data.nutritions.fat} g`
    tempplateInfo.querySelector('.sugar span').textContent = `${data.nutritions.sugar} g`
    tempplateInfo.querySelector('.carbohydrates span').textContent = `${data.nutritions.carbohydrates} g`
    tempplateInfo.querySelector('.protein span').textContent = `${data.nutritions.protein} g`



    contenedorInfo.appendChild(tempplateInfo);
}

function LimpiarHtml(){
    while(contenedorInfo.firstElementChild){
        contenedorInfo.removeChild(contenedorInfo.firstElementChild)
    }
}

function mensajeError(error){
    LimpiarHtml();
    const templateError = $templateError.cloneNode(true);
    templateError.querySelector('p').textContent = error.message;

    contenedorInfo.appendChild(templateError)
}

// Agregando Theme
document.addEventListener('DOMContentLoaded', () => {
    
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';

    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
});

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Guardar en localStorage si tiene el dark-mode o no
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
});