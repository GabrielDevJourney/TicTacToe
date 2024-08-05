const cardXGifImg = document.getElementById("gif-cardX");
const cardXBtnsContainer = document.getElementById("btns-cardX-container");
const btnCardXPlayer = document.getElementById("cardX-player-btn");
const btnCardXBot = document.getElementById("cardX-bot-btn");
const cardOGifImg = document.getElementById("gif-cardO");
const cardOBtnsContainer = document.getElementById("btns-cardO-container");
const btnCardOPlayer = document.getElementById("cardO-player-btn");
const btnCardOBot = document.getElementById("cardO-bot-btn");
const returnBtn = document.querySelector(".returnBtn");
const homePageWrapper = document.querySelector(".wrapper");
const gamePageWrapper = document.querySelector(".gamePageWrapper");

let isBotX = false;
let isBotO = false;

function handleActiveBtnsAppearence(button) {
	button.classList.add("active");
}

function handlePlayerType(playerType) {
	return playerType;
}

btnCardXPlayer.onclick = function () {
	handlePlayerType("Player");
	changeGifToPlayerHeadCardX();
	this.classList.add("active2");
	btnCardXBot.classList.remove("active1");
	btnCardXPlayer.disabled = true;
	btnCardXBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardX, 0);
	isBotX = false;
};

btnCardXBot.onclick = function () {
	handlePlayerType("Bot");
	changeGifToBotCardX();
	this.classList.add("active1");
	btnCardXPlayer.classList.remove("active2");
	btnCardXPlayer.disabled = true;
	btnCardXBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardX, 0);
	isBotX = true;
};

btnCardOPlayer.onclick = function () {
	handlePlayerType("Player");
	changeGifToPlayerHeadCardO();
	this.classList.add("active2");
	btnCardOBot.classList.remove("active1");
	btnCardOPlayer.disabled = true;
	btnCardOBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardO, 0);
	isBotO = false;
};

btnCardOBot.onclick = function () {
	handlePlayerType("Bot");
	changeGifToBotCardO();
	this.classList.add("active1");
	btnCardOPlayer.classList.remove("active2");
	btnCardOPlayer.disabled = true;
	btnCardOBot.disabled = true;
	timer.startTime(cardInputsManager.createNickInputCardO, 0);
	isBotO = true;
};

returnBtn.addEventListener("click", returnToHomePage);

function returnToHomePage() {
	gamePageWrapper.style.display = "none";
	homePageWrapper.style.display = "block";
}

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

function createTimer() {
	let startTime;
	let timerInterval;

	function initTimer(callback, duration) {
		startTime = Date.now();

		timerInterval = setInterval(() => {
			const elapseTime = (Date.now() - startTime) / 1000;
			if (elapseTime >= duration) {
				clearInterval(timerInterval);
				callback();
			}
		}, 100);
	}

	return { startTime: initTimer };
}

const timer = createTimer();

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
	homePageWrapper.style.display = "none";
	gamePageWrapper.style.display = "block";
}

const startGameBtn = document.querySelector(".startGame");
startGameBtn.addEventListener("click", function () {
	displayNicknamesGamePage();
	changeDisplayStatusOfPages();
	handleGame.initializeGame();
	gamePageWrapper.offsetHeight;
});

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
		updateCurrentPlayer();
		setTimeout(() => {
			changeNicknamesContainersStyles();
			addMovePreviewWhenHover();
			addClickingListernersToCards();

			playerXContainer.offsetHeight;
			playerOContainer.offsetHeight;

			if (isCurrentlyPlayerBot()) {
				setGameBoardClickable(false);
				setTimeout(makeBotMoves, 500);
			} else {
				setGameBoardClickable(true);
			}
		}, 50);
	}

	function randomizeFirstPlayer() {
		firstPlayerToPlay = Math.random() < 0.5 ? "X" : "O";
		return firstPlayerToPlay;
	}

	function changeNicknamesContainersStyles() {
		playerXContainer.classList.remove(
			"borderCurrentPlayer",
			"borderPlayerWaiting"
		);
		playerOContainer.classList.remove(
			"borderCurrentPlayer",
			"borderPlayerWaiting"
		);
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

		if (isCurrentlyPlayerBot()) {
			setGameBoardClickable(false);
			setTimeout(() => {
				makeBotMoves();
				setGameBoardClickable(true);
			}, 500);
		} else {
			setGameBoardClickable(true);
		}
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
		const gameState = handleMatchWinsAndPoints.checkWinner(
			currentBoard,
			true
		);

		if (gameState.result === "win") {
			handleMatchWinsAndPoints.updateScore(gameState.winner);
			updateScoreDisplay();
			highlightWinningCombination(gameState.combination);
			setTimeout(() => {
				resetAfterWin();
				const gameWinnerState =
					handleMatchWinsAndPoints.getGameWinnerTracker();
				if (gameWinnerState.winner) {
					createModalForWhenGameIsOver(gameWinnerState.winner);
				}
			}, 1000);
		} else if (gameState.result === "draw") {
			highlightDrawBoard();
			setTimeout(() => resetAfterWin(), 1000);
		}
	}

	function highlightDrawBoard() {
		gameCards.forEach((card) => card.classList.add("game-draw"));
	}

	function highlightWinningCombination(combination) {
		combination.forEach((cell) => {
			gameCards[cell].classList.add("winning-combination");
		});
	}

	function removeHighLightAndCardsContent() {
		gameCards.forEach((card) => {
			card.textContent = "";
			card.classList.remove("winning-combination", "game-draw");
		});
	}

	function updateScoreDisplay() {
		const scores = handleMatchWinsAndPoints.getScores();
		const playerXScoreDisplay = document.querySelector(".playerXScore");
		const playerOScoreDisplay = document.querySelector(".playerOScore");

		playerOScoreDisplay.textContent = scores.playerOScore;
		playerXScoreDisplay.textContent = scores.playerXScore;
	}

	function resetAfterWin() {
		removeHighLightAndCardsContent();
		handleMatchWinsAndPoints.resetGameState();
		initializeGame();
	}

	function resetGameAfterPlayAgain() {
		handleMatchWinsAndPoints.resetScore();
		updateScoreDisplay();
		handleMatchWinsAndPoints.resetDisplayTrophys();
		removeHighLightAndCardsContent();
		handleMatchWinsAndPoints.resetGameState();
		initializeGame();
	}

	function isBotPlaying() {
		return isBotX || isBotO;
	}

	function isCurrentlyPlayerBot() {
		return (
			(currentPlayer === "X" && isBotX) ||
			(currentPlayer === "O" && isBotO)
		);
	}

	function setGameBoardClickable(clickable) {
		const gameBoard = document.querySelector(".gameBoard");
		gameBoard.style.pointerEvents = clickable ? "auto" : "none";
	}

	function makeBotMoves() {
		const currentBoard = getCurrentGameBoardState();
		const gameState = handleMatchWinsAndPoints.checkWinner(
			currentBoard,
			true
		);

		if (gameState.result !== "ongoing") {
			return;
		}

		let move = findWinningMove(currentBoard, currentPlayer);
		if (move === null) {
			move = findWinningMove(
				currentBoard,
				currentPlayer === "X" ? "O" : "X"
			);
			if (move === null) {
				move = findBestMove(currentBoard);
			}
		}

		if (move !== null && currentBoard[move] === "") {
			const selectedCard = gameCards[move];
			handleCardClick({ target: selectedCard });
		}
	}

	function findWinningMove(board, player) {
		for (let i = 0; i < 9; i++) {
			if (board[i] === "") {
				const testBoard = [...board];
				testBoard[i] = player;
				if (
					handleMatchWinsAndPoints.checkWinner(testBoard, false)
						.result === "win"
				) {
					return i;
				}
			}
		}
		return null;
	}

	function findBestMove(board) {
		if (board[4] === "") return 4;
		const corners = [0, 2, 6, 8];
		const availableCorners = corners.filter((i) => board[i] === "");
		if (availableCorners.length > 0) {
			return availableCorners[
				Math.floor(Math.random() * availableCorners.length)
			];
		}
		const edges = [1, 3, 5, 7];
		const availableEdges = edges.filter((i) => board[i] === "");
		if (availableEdges.length > 0) {
			return availableEdges[
				Math.floor(Math.random() * availableEdges.length)
			];
		}
		return null;
	}

	return {
		randomizeFirstPlayer,
		changeNicknamesContainersStyles,
		initializeGame,
		checkForWinOrDraw,
		resetAfterWin,
		updateScoreDisplay,
		resetGameAfterPlayAgain,
		isBotPlaying,
	};
})();

handleGame.initializeGame();

const handleMatchWinsAndPoints = (function () {
    const winningMoves = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let isDraw = false;
    let isThereAWinner = false;
    let playerXScore = 0;
    let playerOScore = 0;

    function checkWinner(position, setWinnerState = true) {
        let isDraw = true;
        let winnerFound = false;
        for (let [pos1, pos2, pos3] of winningMoves) {
            if (
                position[pos1] !== "" &&
                position[pos1] === position[pos2] &&
                position[pos2] === position[pos3]
            ) {
                isDraw = false;
                winnerFound = true;
                if (setWinnerState) {
                    isThereAWinner = true;
                }
                return {
                    result: "win",
                    winner: position[pos1],
                    combination: [pos1, pos2, pos3],
                };
            }
            if (position[pos1] === "" || position[pos2] === "" || position[pos3] === "") {
                isDraw = false;
            }
        }
        if (isDraw) {
            return { result: "draw" };
        }
        if (setWinnerState) {
            isThereAWinner = false;
        }
        return { result: "ongoing" };
    }

    function getGameWinnerTracker() {
        const winnerScore = 2;
        let winner;
        if (playerXScore === winnerScore) {
            updateDisplayLoadTrophyPlayerX();
            createModalForWhenGameIsOver();
            winner = "X";
        } else if (playerOScore === winnerScore) {
            updateDisplayLoadTrophyPlayerO();
            createModalForWhenGameIsOver();
            winner = "O";
        }
        return { winner: winner };
    }

    function getThereIsAWinner() {
        return isThereAWinner;
    }

    function getIsDraw() {
        return isDraw;
    }

    function getScores() {
        return { playerOScore, playerXScore };
    }

    function resetGameState() {
        isDraw = false;
        isThereAWinner = false;
    }

    function updateScore(winner) {
        if (winner === "X") {
            playerXScore++;
        } else {
            playerOScore++;
        }
    }

    function updateDisplayLoadTrophyPlayerX() {
        const playerXTrophy = document.querySelector(".trophyPlayerX");
        playerXTrophy.style.display = "block";
    }

    function updateDisplayLoadTrophyPlayerO() {
        const playerOTrophy = document.querySelector(".trophyPlayerO");
        playerOTrophy.style.display = "block";
    }

    function resetScore() {
        playerXScore = 0;
        playerOScore = 0;
    }

    function resetDisplayTrophys() {
        const playerOTrophy = document.querySelector(".trophyPlayerO");
        playerOTrophy.style.display = "none";
        const playerXTrophy = document.querySelector(".trophyPlayerX");
        playerXTrophy.style.display = "none";
    }

    return {
        checkWinner,
        getIsDraw,
        getThereIsAWinner,
        resetGameState,
        updateScore,
        getScores,
        getGameWinnerTracker,
        updateDisplayLoadTrophyPlayerO,
        updateDisplayLoadTrophyPlayerX,
        resetScore,
        resetDisplayTrophys,
    };
})();

function createModalForWhenGameIsOver(winner) {
    const existingModal = document.querySelector(".modal-container");
    if (existingModal) {
        existingModal.remove();
    }

    const displayWinnerNick =
        winner === "X"
            ? cardInputsManager.getPlayerXNickname()
            : cardInputsManager.getPlayerONickname();

    const gameBoard = document.querySelector(".gameBoard");
    gameBoard.style.visibility = "hidden";
    gameBoard.style.pointerEvents = "none";

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const headerContainer = document.createElement("div");
    headerContainer.classList.add("modal-header-container");

    const modalHeader = document.createElement("p");
    modalHeader.classList.add("modal-header");
    modalHeader.textContent = `${displayWinnerNick} HAS WON THE GAME`;

    const btnsContainer = document.createElement("div");
    btnsContainer.classList.add("modal-btns-container");

    const btnPlayAgain = document.createElement("button");
    btnPlayAgain.classList.add("modal-btn", "btn-play-again");
    btnPlayAgain.textContent = "PLAY AGAIN";

    const btnExit = document.createElement("button");
    btnExit.classList.add("modal-btn", "btn-exit");
    btnExit.textContent = "EXIT";

    btnsContainer.appendChild(btnPlayAgain);
    btnsContainer.appendChild(btnExit);
    headerContainer.appendChild(modalHeader);
    modalContainer.appendChild(headerContainer);
    modalContainer.appendChild(btnsContainer);

    function removeModal() {
        gameBoard.style.visibility = "visible";
        gameBoard.style.pointerEvents = "auto";
        btnPlayAgain.removeEventListener("click", playAgainHandler);
        btnExit.removeEventListener("click", exitHandler);
        modalContainer.remove();
    }

    const playAgainHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleGame.resetGameAfterPlayAgain();
        removeModal();
    };

    const exitHandler = () => {
        removeModal();
        gamePageWrapper.style.display = 'none'
        homePageWrapper.style.display = 'block'
    };

    btnPlayAgain.addEventListener("click", playAgainHandler);
    btnExit.addEventListener("click", exitHandler);

    document.body.appendChild(modalContainer);
}