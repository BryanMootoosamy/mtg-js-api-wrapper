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
let searchParameters = (type, arg) => { // construct the parameters to include in the api url
    if (type == type && type.value != '') {
        if (requestUrl.includes('?')) {
            let name = type.value;
            let newArg = '&'+arg+'='+name+'';
            requestUrl = requestUrl + newArg;
        } else {
            let name = type.value;
            let newArg = '?'+arg+'='+name+'';
            requestUrl = requestUrl + newArg;
        }
    }
};
let requestArg = () => { // put the parameters together
    searchParameters(cardName, 'name');
    searchParameters(extention,'setName');
    searchParameters(race, 'type');
    searchParameters(color, 'colors');
    searchParameters(artist, 'artist');
};
let pagination = (data) => { // pages system
    for (let a = 1; a < (Math.ceil((data.length / 10) + 1)); a++) {
        page.innerHTML += '<button type="button" onclick="position = '+a+'; display(data, position);" >Page '+a+'</button>';   
    }
    console.log(Math.round((data.length / 10) + 1));
    display(data, position);
};
let search = () => { // launch the request using Axios CDN (function to execute after requestArg() and searchParameters())
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
let isSearchBlank = () => { // reexecute the request if you open a card then return to the research view
    if (cardName.value != "" || extention.value != "" || race.value != "" || artist.value != "") {
        search();
    }
};
let urlSpliter = () => { // get the multiverse id if exist or the ID inside the card-viewer url to launch a request that will display the informations
    let urlToSplit = window.location;
    urlToSplit = String(urlToSplit);
    let urlSplited = urlToSplit.split('?');
    let arg = urlSplited[1].split('=');
    return arg[1];
};
let manaReplace = (data) => {
    const regex = /{(\w+)\/?(\w)?}/g;
    const mana = data.manaCost;
    return (mana.replace(regex, convertToManaCSS)).split(',');
};
let convertToManaCSS = (matching, group1, group2) => {
    let convertedSymbols = ['ms'];
    const prefix = 'ms-';
    if(group1 !== undefined){
        if(group2 === undefined){ // A simple mana symbol
            convertedSymbols.push(prefix + group1.toLowerCase());
        }
        else{ // A complexe mana symbol
            if(group2 == 'P'){
                convertedSymbols.push(prefix + group2.toLowerCase() + group1.toLowerCase());
            }
            else{
                convertedSymbols.push(prefix + group1.toLowerCase() + group2.toLowerCase());
            }
        }
        return convertedSymbols;
    }
};
let htmlFiller = (data) => { // fill the card-viewer with card information
    title.innerHTML = 'Nom de la carte: '+data.name;
    let mana = manaReplace(data);
    if (data.imageUrl == undefined) {
        imageContainer.innerHTML = "<div class='missing-image'></div>";
    } else {
        imageContainer.innerHTML = "<img src="+data.imageUrl+" alt='card image' />";
    }
    artist.innerHTML = 'Nom de l\'artiste: ' +data.artist;
    if (data.flavor != undefined) {
        lore.innerHTML = 'Lore: '+data.flavor;
    }
    if (data.subtypes == undefined) {
        subtypes.innerHTML = 'Type(s): ';
        data.types.forEach(element => {
            subtypes.innerHTML += '<p class="subtypes">'+element+', </p>';
        });
    } else {
        subtypes.innerHTML = 'Type(s): ';
        data.subtypes.forEach(element => {
            subtypes.innerHTML += '<p class="subtypes">'+element+', </p>';
        });
    }
    if (data.setname == undefined) {
        set.innerHTML = 'Nom du Set: '+data.setName+' ('+data.set+')';
    } else {
        set.innerHTML = 'Nom du Set: '+data.setname;
    };
    rarity.innerHTML = 'Rareté: '+data.rarity;
    manaCost.innerHTML = 'Coût en mana: '+mana;
    if (data.text != undefined) {
        cardText.innerHTML = 'Description des effets: '+data.text;  
    }
    if (data.power != undefined) {  
        power.innerHTML = 'Puissance: '+data.power;
    }
    if (data.toughness != undefined) {    
        toughness.innerHTML = 'Endurance: '+data.toughness;
    }
    if (data.rulings != undefined) {  
        data.rulings.forEach(element => {
            ruling.innerHTML = 'Règles additionnelles: ';
            ruling.innerHTML += '<p class="ruling-date">'+element.date+'</p><p class="ruling-text">'+element.text+'</p>';
        });
    }
    data.legalities.forEach(element => {
        legality.innerHTML += '<p class="ruling-date">'+element.format+': </p><p class="ruling-text">'+element.legality+'</p>';
    });
};