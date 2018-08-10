# Magic The Gathering JS API Wrapper

This project is a tool to gather and use all datas to fill a html page. The whole library is contained inside the disctionary.js file.

## Tech used

* Axios (cdn version)
* Javascript ES6

/!\ This project is not, and will never, using NodeJS.


## User's Guide

### How to use the library

add in the header of your page : 
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="path/to/dictionary.js"></script>
```
create 2 javascript files you will add to your main code, one where you will return the list the user searched and the other one where you fill display the cards informations. 
you will need a bunch of variables named exatly like this and returing the same thing: 

For the search feature: 
```Javascript
let cardName = document.getElementById('input getting the card nameto search');
let searchButton = document.getElementById('button lauching the research');
let cardContainer = document.getElementById('div containing the list');
let page = document.getElementById('place where the button for pages result will appear');
let extention = document.getElementById('input getting the extention name');
let race = document.getElementById('input getting the type of the card (artifact, creature, vampire,...');
let color = document.getElementById('input getting the mana');
let artist = document.getElementById('input getting the artist');
let position = 1;
let data;
let requestUrl = 'https://api.magicthegathering.io/v1/cards';
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    cardContainer.innerHTML = "";
    search();
});
window.onload = isSearchBlank();
```

for the viewer feature:

```Javascript
let title = document.getElementById('where you will show the card name');
let imageContainer = document.getElementById(' where you will show the card image');
let artist = document.getElementById('where you will show the artist name');
let lore = document.getElementById('where you will show the lore of the card');
let subtypes = document.getElementById('where you will show the subtypes');
let set = document.getElementById('where you will show the set anme');
let rarity = document.getElementById('where you will show the rarity');
let manaCost = document.getElementById('where you will whow the mana cost');
let cardText = document.getElementById('where you will show the effects of th card');
let power = document.getElementById('where you will show the power');
let toughness = document.getElementById('where you will show the toughness');
let ruling = document.getElementById('whee you will show the ruling');
let legality = document.getElementById('where you will show the legality');
let multiverseid = urlSpliter();
if (multiverseid.length > 10) { // if the id retrieved by the urlsplitter is loner than 10 characters it means it's a simple id and not a multiverse id and the card will not have an image as long as some informations
    axios.get('https://api.magicthegathering.io/v1/cards?id='+multiverseid).then((response) => {
        let data = response.data.cards[0];
        htmlFiller(data);
    }); 
} else {
    axios.get('https://api.magicthegathering.io/v1/cards?multiverseid='+multiverseid).then((response) => {
        let data = response.data.cards[0];
        htmlFiller(data);
    });
}
```

### about the functions
 ```Javascript
 let search = () => {
    position = 1;
    page.innerHTML = '';
    requestArg();
    console.log(requestUrl);
    axios.get(requestUrl).then((response) => {
        data = response.data.cards;
        pagination(data);
        requestUrl = 'https://api.magicthegathering.io/v1/cards';
    });
}; 
```

requestArg() is the function that construct throught searchParameters the filters that will be added to the api url to make the most accurate request possible. searchParameters have 2 parameters: the first one is the input value retrieved with Javascript getElementById() and the second is the filter that will be returned in the constructed URL. if a searchParameters is empty, it will return nothing.
Axios will use the constructed url to make his request. Position is the number of the first page of result. pagination() will look for the number of cards retrieved and calculate how much page the view need to show everyting, creating a pages button to modify the actual position in the page and in the range of data showed. Then we reset the original url to allow new requests.

```Javascript
let isSearchBlank = () => {
    if (cardName.value != "" || extention.value != "" || race.value != "" || artist.value != "") {
        search();
    }
};
```
This function will allow you, after you viewed a card and press return to go back in the list of card you got after your search, to show them without having to manually relauch the research.

```Javascript
let display = (data, position) => { 
    cardContainer.innerHTML = "";
    for (let i = (10 * (position - 1)); i < (10 * position); i++) {
        if (i >= data.length) {
            break;
        }
        if (data[i].imageUrl == undefined) {
            cardContainer.innerHTML += "<a href='/card-viewer?id="+data[i].id+"'><div class='missing-card-image' ><p>"+data[i].name+"</p></div></a>";
        } else {
            cardContainer.innerHTML += "<a href='/card-viewer?id="+data[i].multiverseid+"'><img class='card-item' src="+data[i].imageUrl+" /></a>";
        }
    }
};
```

the display function will fill the html container you pointed wit javascript with the cards the user searched, using the pagination() function to only show 10 results per pages. If the card image doesn't exist, it will create a link that you can style as you want. The reason some cards doesn't have images is not an issue with this wrapper but with the api where some cards with a special extention doesn't have one.

