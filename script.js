const GameBoard = (function () {

    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    return { getBoard};

})();

const CreatePlayer = (name, marker) => {
    return { name, marker };
}

const GameController = (function () {

    const board = GameBoard.getBoard();

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

        }

        if(CheckWinner(marker)){
            console.log(`${currentPlayer.name} Marker:${currentPlayer.marker} is Winner!`);
            gameOver = true;
        }

        else if(checkTies()){
            console.log("Tied Up!");
            gameOver = true;
        }

        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer; 

    }

    function CheckWinner(marker) {
        return winningCombos.some(combo => combo.every(index => 
            board[index] === marker
        ))
    }

    function checkTies(){
        return board.every(index => index !== "");
    }

    const getCurrentPlayer = () => currentPlayer;

    return{playRound,getCurrentPlayer}

})();