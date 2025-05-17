const $ = (element) => document.querySelector(element)

const fruitInput = $('#search-button')
console.log(fruitInput)

const getFruitInfo = async fruit => {
    const url = `https://www.fruityvice.com/api/fruit/${fruit}`
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

// console.log(getFruitInfo('apple'))