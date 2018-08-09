let url = window.location.href;
let cardName = document.getElementById('cardName');
let searchButton = document.getElementById('cardSearch');
let cardContainer = document.getElementById('card-container');
let page = document.getElementById('page');
let extention = document.getElementById('extention');
let race = document.getElementById('race');
let color = document.getElementById('color');
let artist = document.getElementById('artist');
let position = 1;
let data;;
let requestUrl = 'https://api.magicthegathering.io/v1/cards';
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    cardContainer.innerHTML = "";
    search();
});
window.onload = isSearchBlank();
