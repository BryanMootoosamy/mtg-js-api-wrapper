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
let isSearchBlank = () => { // reexecute the request if you open a card then return to the research view
    if (cardName.value != "" || extention.value != "" || race.value != "" || artist.value != "") {
        search();
    }
};
```
This function will allow you, after you viewed a card and press return to go back in the list of card you got after your search, to show them without having to manually relauch the research.
