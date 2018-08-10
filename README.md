# Magic The Gathering JS API Wrapper

This project is a tool to gather and use all datas to fill a html page.

## Tech used

* Axios (cdn version)
* Javascript ES6

/!\ This project is not, and will never, using NodeJS.


## User's Guide

### retrieving data's functions
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
let display = (data, position) => { // allows you to show every gathered cards (even dose without a card image) with a pages system
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
