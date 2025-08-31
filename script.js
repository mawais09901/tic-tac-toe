const GameBoard = (function () {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    return { getBoard };

})();

const CreatePlayer = (name, marker) => {
    return { name, marker };
}

const GameController = (function (doc) {

    const board = GameBoard.getBoard();
    const dialog = doc.getElementById("winning-dialog");
    const closeDialog = doc.getElementById("dialog-button");
    const startButton = doc.querySelector(".start-button");

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const firstPlayer = CreatePlayer("John", "X");
    const secondPlayer = CreatePlayer("WesBos", "O");
    let currentPlayer = firstPlayer;
    let gameOver = false;
    
    startButton.addEventListener("click",(event) => {
        event.preventDefault();

        firstPlayer.name = doc.getElementById("first-player").value;
        secondPlayer.name = doc.getElementById("second-player").value;

        doc.querySelector(".form-container").style.display = "none";
        doc.querySelector(".game-container").style.display = "flex";
        doc.querySelector(".buttons-container").style.display = "flex";
    });

    const playRound = (marker, index) => {

        if (!gameOver) {

            if (board[index] === "") {
                board[index] = marker;
            }

            else if (marker === undefined || index === undefined) {
                console.log("Please enter marker and index");
            }

            else {
                console.log("Place is already Takened.");
            }

            if (CheckWinner(marker)) {
                dialog.querySelector("p").textContent = `${currentPlayer.name} Marker:${currentPlayer.marker} is Winner!`
                dialog.showModal();
                gameOver = true;
            }

            else if (checkTies()) {
                dialog.querySelector("p").textContent = "Tied Up!";
                dialog.showModal();
                gameOver = true;
            }
        }

        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;

    }

    function CheckWinner(marker) {
        return winningCombos.some(combo => combo.every(index =>
            board[index] === marker
        ))
    }

    function checkTies() {
        return board.every(index => index !== "");
    }

    function restartGame() {
        gameOver = false;
        currentPlayer = firstPlayer;
    }

    closeDialog.addEventListener("click", () => {
        dialog.close();
    });


    const getCurrentPlayer = () => currentPlayer;

    const getGameOver = () => gameOver;

    return { playRound, getCurrentPlayer, getGameOver, restartGame }

})(document);

const DisplayController = (function (doc) {

    const gameContainer = doc.querySelector(".game-container");
    const restart = doc.querySelector(".restart-button");

    const board = GameBoard.getBoard();
    let id = 0;

    const renderCells = () => {
        board.forEach(el => {
            const div = doc.createElement("div");
            div.classList.add("cell");
            div.setAttribute("data-id", id)
            div.textContent = el;
            gameContainer.appendChild(div);

            div.addEventListener("click", (event) => {
                let currentPlayer = GameController.getCurrentPlayer();
                let playGame = GameController.playRound;
                let gameOver = GameController.getGameOver();
                let target = event.target.getAttribute("data-id");

                if (div.textContent === "" && !gameOver) {
                    div.textContent = currentPlayer.marker;
                    playGame(currentPlayer.marker, target);
                }
            })
            id += 1;
        })
    }

    restart.addEventListener("click", () => {

        // this code is also for filling every index "";
        // for(let i = 0; i < board.length; i++){
        //     board[i] = "";
        // }

        board.fill("");

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.textContent = "");

        GameController.restartGame();
    });

    doc.querySelector(".reset-button").addEventListener("click",() => {

        board.fill("");

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.textContent = "");

        GameController.restartGame();

        doc.querySelector(".game-container").style.display = "none";
        doc.querySelector(".buttons-container").style.display = "none";
        doc.querySelector(".form-container").style.display = "block";

    });



    return { renderCells }

})(document);

DisplayController.renderCells();