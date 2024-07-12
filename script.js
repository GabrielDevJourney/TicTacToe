const cardXGifImg = document.getElementById('gif-cardX')
const cardXBtnsContainer = document.getElementById("btns-cardX-container");
const btnCardXPlayer = document.getElementById('cardX-player-btn')
const btnCardXBot = document.getElementById('cardX-bot-btn')

const cardOGifImg = document.getElementById("gif-cardO");
const cardOBtnsContainer = document.getElementById('btns-cardO-container');
const btnCardOPlayer = document.getElementById("cardO-player-btn");
const btnCardOBot = document.getElementById("cardO-bot-btn");

//make the change to btn appearence to a more clicked on
function handleActiveBtnsAppearence(button){
    button.classList.add("active");
}
//Check player type so i can use it to change the gif and create the input of nick name
function handlePlayerType(playerType){
    return playerType;
}
btnCardXPlayer.onclick = function(){
    handlePlayerType('Player')
    changeGifToPlayerHeadCardX()
}
btnCardXBot.onclick = function () {
	handlePlayerType("Bot");
    changeGifToBotCardX();
};
btnCardOPlayer.onclick = function () {
	handlePlayerType("Player");
    changeGifToPlayerHeadCardO()
};
btnCardOBot.onclick = function () {
	handlePlayerType("Bot");
    changeGifToBotCardO()
};

//change gif based on player type and card
function changeGifToBotCardX(){
    cardXGifImg.src = 'Assets/bot.gif'
}
function changeGifToPlayerHeadCardX() {
	cardXGifImg.src = "Assets/player.gif";
}
function changeGifToBotCardO() {
	cardOGifImg.src = "Assets/bot.gif";
}
function changeGifToPlayerHeadCardO() {
	cardOGifImg.src = "Assets/player.gif";
}