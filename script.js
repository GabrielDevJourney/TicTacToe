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

//CARD X 
btnCardXPlayer.onclick = function(){
    handlePlayerType('Player')
    changeGifToPlayerHeadCardX()
    this.classList.add('active2')
    btnCardXBot.classList.remove('active1')
    btnCardXPlayer.disabled = true;
	btnCardXBot.disabled = true;
    timer.startTime(createNickInputCardX,3)
}
btnCardXBot.onclick = function () {
	handlePlayerType("Bot");
    changeGifToBotCardX();
    this.classList.add("active1");
    btnCardXPlayer.classList.remove('active2')
    btnCardXPlayer.disabled = true;
	btnCardXBot.disabled = true;
    timer.startTime(createNickInputCardX, 3);
};

//CARD O
btnCardOPlayer.onclick = function () {
	handlePlayerType("Player");
    changeGifToPlayerHeadCardO()
    this.classList.add("active2");
    btnCardOBot.classList.remove('active1')
    btnCardOPlayer.disabled = true;
	btnCardOBot.disabled = true;
    timer.startTime(createNickInputCardO, 3);
};
btnCardOBot.onclick = function () {
	handlePlayerType("Bot");
    changeGifToBotCardO()
    this.classList.add("active1");
    btnCardOPlayer.classList.remove('active2')
    btnCardOPlayer.disabled = true;
	btnCardOBot.disabled = true;
    timer.startTime(createNickInputCardO, 3);
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

//Timer for how long has been since user has click playertype btns
function createTimer(){
    let startTime
    let timerInterval
    
    //callback is what will happen after x duration of time 
    function initTimer(callback,duration){
        startTime = Date.now()

        timerInterval = setInterval(() => {
            const elapseTime = (Date.now() - startTime) / 1000
            if(elapseTime >= duration){
                clearInterval(timerInterval)
                callback();
            }
        }, 100)//reapet at every 100ms
    }

    return {startTime : initTimer} //create literal object and pointing it to inittimer
}

//Pointing and enable interaction within closure
const timer = createTimer()

//Function to create inputs on each card after a player has choosen it's type
function createNickInputCardX(){
    try{
        cardXBtnsContainer.innerHTML = ''
        const inputCardX = document.createElement('input')
        inputCardX.type = 'text'
        inputCardX.placeholder = 'Nickname'
        inputCardX.classList.add('inputsStyling')
        cardXBtnsContainer.appendChild(inputCardX)
        inputCardX.focus()
    }catch(error){
        console.error('error', error);
    }
}
function createNickInputCardO() {
	cardOBtnsContainer.innerHTML = "";
	const inputCardO = document.createElement("input");
	inputCardO.type = "text";
	inputCardO.placeholder = "Nickname";
    inputCardO.classList.add('inputsStyling')
	cardOBtnsContainer.appendChild(inputCardO);
    inputCardO.focus()
}
