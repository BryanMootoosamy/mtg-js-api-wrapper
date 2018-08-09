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
}; ```
