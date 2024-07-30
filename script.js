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

function displayNicknamesGamePage() {
	const playerXNicknameSpan = document.querySelector(".playerXName");
	const playerONicknameSpan = document.querySelector(".playerOName");
	playerONicknameSpan.textContent = cardInputsManager.getPlayerONickname();
	playerXNicknameSpan.textContent = cardInputsManager.getPlayerXNickname();
}

function changeDisplayStatusOfPages() {
	const homePageWrapper = document.querySelector(".wrapper");
	const gamePageWrapper = document.querySelector(".gamePageWrapper");

	homePageWrapper.style.display = "none";
	gamePageWrapper.style.display = "block";
}

// START GAME BTN CLICK ACTIONS
const startGameBtn = document.querySelector(".startGame");
startGameBtn.addEventListener("click", function () {
	displayNicknamesGamePage();
	changeDisplayStatusOfPages();
	handleGame.randomizeFirstPlayer();
	handleGame.changeNicknamesContainersStyles();
});

//where most logic of game is handle
const handleGame = (function () {
	let firstPlayerToPlay;
	let playerX;
	let playerO;
	let currentPlayer;
	const playerXContainer = document.querySelector(".playerXContainer");
	const playerOContainer = document.querySelector(".playerOContainer");
	const gameCards = document.querySelectorAll(".gameCards");

	function initializeGame() {
		randomizeFirstPlayer();
		changeNicknamesContainersStyles();
		addMovePreviewWhenHover();
		addClickingListernersToCards();
		updateCurrentPlayer();
	}

	function randomizeFirstPlayer() {
		const randomNumber = Math.random();
		firstPlayerToPlay = randomNumber < 0.5 ? "X" : "O";
		console.log(firstPlayerToPlay);
		return firstPlayerToPlay;
	}

	function changeNicknamesContainersStyles() {
		if (firstPlayerToPlay === "X") {
			playerXContainer.classList.add("borderCurrentPlayer");
			playerOContainer.classList.add("borderPlayerWaiting");
			playerX = 1;
			playerO = 0;
		} else {
			playerXContainer.classList.add("borderPlayerWaiting");
			playerOContainer.classList.add("borderCurrentPlayer");
			playerX = 0;
			playerO = 1;
		}
		addMovePreviewWhenHover();
		updateCurrentPlayer();
	}

	function updateCurrentPlayer() {
		currentPlayer = playerX === 1 ? "X" : "O";
	}

	function addMovePreviewWhenHover() {
		gameCards.forEach((card) => {
			card.addEventListener("mouseover", () => enablePreview(card));
			card.addEventListener("mouseout", () => disablePreview(card));
		});
	}

	function enablePreview(card) {
		if (card.textContent === "") {
			card.setAttribute("data-preview", currentPlayer);
			card.classList.add(`preview-${currentPlayer.toLowerCase()}`);
		}
	}

	function disablePreview(card) {
		card.removeAttribute("data-preview");
		card.classList.remove("preview-x", "preview-o");
	}

	function addClickingListernersToCards() {
		gameCards.forEach((card) => {
			card.addEventListener("click", handleCardClick);
		});
	}

	function handleCardClick(event) {
		const clickedCard = event.target.closest(".gameCards");
		if (!clickedCard) return;

		if (
			isCardEmpty(clickedCard) &&
			!handleMatchWinsAndPoints.getThereIsAWinner() &&
			!handleMatchWinsAndPoints.getIsDraw()
		) {
			renderPlayerMove(clickedCard);
			checkForWinOrDraw();
			if (
				!handleMatchWinsAndPoints.getThereIsAWinner() &&
				!handleMatchWinsAndPoints.getIsDraw()
			) {
				switchPlayerTurn();
			}
		} else {
			console.log("Card is not empty"); //debug log
		}
	}

	function isCardEmpty(card) {
		return card.textContent.trim() === "";
	}

	function renderPlayerMove(card) {
		card.textContent = currentPlayer;
		card.removeAttribute("data-preview");
		card.classList.remove("preview-x", "preview-o");
		card.classList.add(`player${currentPlayer.toUpperCase()}MoveRender`);
	}

	function switchPlayerTurn() {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		updateNicknamesContainerStyles();
	}

	function updateNicknamesContainerStyles() {
		if (currentPlayer === "X") {
			playerXContainer.classList.add("borderCurrentPlayer");
			playerXContainer.classList.remove("borderPlayerWaiting");
			playerOContainer.classList.add("borderPlayerWaiting");
			playerOContainer.classList.remove("borderCurrentPlayer");
		} else {
			playerOContainer.classList.add("borderCurrentPlayer");
			playerOContainer.classList.remove("borderPlayerWaiting");
			playerXContainer.classList.add("borderPlayerWaiting");
			playerXContainer.classList.remove("borderCurrentPlayer");
		}
	}

	function getCurrentGameBoardState() {
		return Array.from(gameCards).map((card) => card.textContent || "");
	}

	function checkForWinOrDraw() {
		const currentBoard = getCurrentGameBoardState();
		/* passing currentBoard to position value of checkwinner
            that will allow to see what are the true or false combinations
            based on the current moves makes sense didn't thought of that detail, and because i am doing this gamestate will have acess to everything inside checkwinner
        */
		const gameState = handleMatchWinsAndPoints.checkWinner(currentBoard);
		if (gameState && gameState.result === "win") {
			console.log(`player ${gameState.winner} wins!`);
			highlightWinningCombination(gameState.combination);
			setTimeout(() => resetAfterWin(), 2000);
		} else if (handleMatchWinsAndPoints.getIsDraw()) {
			console.log("its a draw");
			setTimeout(() => resetAfterWin(), 2000);
		}
	}

	function highlightWinningCombination(combination) {
		combination.forEach((cell) => {
			gameCards[cell].classList.add("winning-combination");
		});
	}

	function removeHighLightAndCardsContent() {
		gameCards.forEach((card) => (card.textContent = ""));
		gameCards.forEach((card) =>
			card.classList.remove("winning-combination")
		);
	}

	function resetAfterWin() {
		removeHighLightAndCardsContent();
		handleMatchWinsAndPoints.resetGameState();
		updateCurrentPlayer();
		updateNicknamesContainerStyles();
	}

	return {
		randomizeFirstPlayer,
		changeNicknamesContainersStyles,
		initializeGame,
		checkForWinOrDraw,
		resetAfterWin,
	};
})();

handleGame.initializeGame();

const handleMatchWinsAndPoints = (function () {
	const winningMoves = [
		[0, 1, 2], //rows
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6], // columns
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8], // diagonals
		[2, 4, 6],
	];

	let isDraw = false;
	let isThereAWinner = false;

	function checkWinner(position) {
		isDraw = true;
		for (let [pos1, pos2, pos3] of winningMoves) {
			if (
				position[pos1] != "" &&
				position[pos1] === position[pos2] &&
				position[pos2] === position[pos3]
			) {
				isDraw = false;
				isThereAWinner = true;
				return {
					result: "win",
					winner: position[pos1],
					combination: [pos1, pos2, pos3],
				};
			}
			if (
				position[pos1] === "" ||
				position[pos2] === "" ||
				position[pos3] === "" ||
				position[pos1] === position[pos2] ||
				position[pos2] === position[pos3] ||
				position[pos1] === position[pos3]
			) {
				isDraw = false;
			}
		}
	}

	function getThereIsAWinner() {
		return isThereAWinner;
	}

	function getIsDraw() {
		return isDraw;
	}

	function resetGameState() {
		isDraw = false;
		isThereAWinner = false;
	}

	return {
		checkWinner: checkWinner,
		getIsDraw: getIsDraw,
		getThereIsAWinner: getThereIsAWinner,
		resetGameState: resetGameState,
	};
})();
