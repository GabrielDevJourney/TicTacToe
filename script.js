const cardXGifImg = document.getElementById("gif-cardX");
const cardXBtnsContainer = document.getElementById("btns-cardX-container");
const btnCardXPlayer = document.getElementById("cardX-player-btn");
const btnCardXBot = document.getElementById("cardX-bot-btn");

const cardOGifImg = document.getElementById("gif-cardO");
const cardOBtnsContainer = document.getElementById("btns-cardO-container");
const btnCardOPlayer = document.getElementById("cardO-player-btn");
const btnCardOBot = document.getElementById("cardO-bot-btn");

//make the change to btn appearence to a more clicked on
function handleActiveBtnsAppearence(button) {
	button.classList.add("active");
}
//Check player type so i can use it to change the gif and create the input of nick name
function handlePlayerType(playerType) {
	return playerType;
}

//CARD X
btnCardXPlayer.onclick = function () {
	handlePlayerType("Player");
	changeGifToPlayerHeadCardX();
	this.classList.add("active2");
	btnCardXBot.classList.remove("active1");
	btnCardXPlayer.disabled = true;
	btnCardXBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardX, 0);
};
btnCardXBot.onclick = function () {
	handlePlayerType("Bot");
	changeGifToBotCardX();
	this.classList.add("active1");
	btnCardXPlayer.classList.remove("active2");
	btnCardXPlayer.disabled = true;
	btnCardXBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardX, 0);
};

//CARD O
btnCardOPlayer.onclick = function () {
	handlePlayerType("Player");
	changeGifToPlayerHeadCardO();
	this.classList.add("active2");
	btnCardOBot.classList.remove("active1");
	btnCardOPlayer.disabled = true;
	btnCardOBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardO, 0);
};
btnCardOBot.onclick = function () {
	handlePlayerType("Bot");
	changeGifToBotCardO();
	this.classList.add("active1");
	btnCardOPlayer.classList.remove("active2");
	btnCardOPlayer.disabled = true;
	btnCardOBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardO, 0);
};

//change gif based on player type and card
function changeGifToBotCardX() {
	cardXGifImg.src = "Assets/bot.gif";
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
function createTimer() {
	let startTime;
	let timerInterval;

	//callback is the action to be fufill after x duration of time
	function initTimer(callback, duration) {
		startTime = Date.now();

		timerInterval = setInterval(() => {
			const elapseTime = (Date.now() - startTime) / 1000;
			if (elapseTime >= duration) {
				clearInterval(timerInterval);
				callback();
			}
		}, 100); //reapet at every 100ms
	}

	return { startTime: initTimer }; //create literal object and pointing it to inittimer
}

//Pointing and enable interaction within closure
const timer = createTimer();

//Function to create inputs on each card after a player has choosen it's type
const cardInputsManager = (function () {
	let inputCardX = null;
	let inputCardO = null;

	function createNickInputCardX() {
		cardXBtnsContainer.innerHTML = "";
		inputCardX = document.createElement("input");
		inputCardX.type = "text";
		inputCardX.placeholder = "Nickname";
		inputCardX.classList.add("inputsStyling");
		cardXBtnsContainer.appendChild(inputCardX);
		inputCardX.focus();
	}

	function createNickInputCardO() {
		cardOBtnsContainer.innerHTML = "";
		inputCardO = document.createElement("input");
		inputCardO.type = "text";
		inputCardO.placeholder = "Nickname";
		inputCardO.classList.add("inputsStyling");
		cardOBtnsContainer.appendChild(inputCardO);
		inputCardO.focus();
	}

	function getPlayerXNickname() {
		return inputCardX ? inputCardX.value : "";
	}

	function getPlayerONickname() {
		return inputCardO ? inputCardO.value : "";
	}

	return {
		createNickInputCardX,
		createNickInputCardO,
		getPlayerXNickname,
		getPlayerONickname,
	};
})();



function displayNicknamesGamePage(){
    const playerXNicknameSpan = document.querySelector(".playerXName");
	const playerONicknameSpan = document.querySelector(".playerOName");
    playerONicknameSpan.textContent = cardInputsManager.getPlayerONickname()
    playerXNicknameSpan.textContent = cardInputsManager.getPlayerXNickname()
}

function changeDisplayStatusOfPages(){
    const homePageWrapper = document.querySelector(".wrapper");
    const gamePageWrapper = document.querySelector(".gamePageWrapper");

    homePageWrapper.style.display = 'none'
    gamePageWrapper.style.display = 'block'
}

// START GAME BTN CLICK ACTIONS
const startGameBtn = document.querySelector('.startGame')
startGameBtn.addEventListener('click', function(){
    displayNicknamesGamePage();
    changeDisplayStatusOfPages();
    handleGame.randomizeFirstPlayer();
    handleGame.changeNicknamesContainersStyles();
} )

const handleGame = (function(){

    let firstPlayerToPlay
    let playerX 
	let playerO 

    function randomizeFirstPlayer() {
        const randomNumber = Math.random();
        firstPlayerToPlay = randomNumber < 0.5 ? 'X' : 'O';
        return firstPlayerToPlay
    }

    function changeNicknamesContainersStyles(){
        const playerXContainer = document.querySelector('.playerXContainer')
        const playerOContainer = document.querySelector('.playerOContainer')

        if (firstPlayerToPlay === 'X'){
            playerXContainer.classList.add('borderCurrentPlayer')
            playerOContainer.classList.add("borderPlayerWaiting");
            playerX = 1
            playerO = 0
        }else{
            playerXContainer.classList.add("borderPlayerWaiting");
            playerOContainer.classList.add("borderCurrentPlayer");
            playerX = 0
            playerO = 1
        }
    }

    return{
        randomizeFirstPlayer,
        changeNicknamesContainersStyles
    }
})()
