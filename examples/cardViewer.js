let title = document.getElementById('card-name');
let imageContainer = document.getElementById('card-image');
let artist = document.getElementById('artist');
let lore = document.getElementById('lore');
let subtypes = document.getElementById('subtypes');
let set = document.getElementById('set');
let rarity = document.getElementById('rarity');
let manaCost = document.getElementById('mana-cost');
let cardText = document.getElementById('card-text');
let power = document.getElementById('power');
let toughness = document.getElementById('toughness');
let ruling = document.getElementById('ruling');
let legality = document.getElementById('legality');
let multiverseid = urlSpliter();
if (multiverseid.length > 10) {
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
