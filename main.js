const Gameboard = (function () {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    function displayBoard () {
        let i = 0;
        
       board.forEach(element => {
            if (element == 1) {
                //Div correlated to the index of element set to an X
                let block = document.getElementById(i);
                let x = document.createElement('img');
                x.src = 'img/close.svg';
                x.classList.add('game-icon');
                if (!block.hasChildNodes(x)) {
                    block.appendChild(x);
                }
            } else if (element == 2){
                //Div correlated to the index of element set to an O
                let block = document.getElementById(i);
                let o = document.createElement('img');
                o.src = 'img/circle.svg';
                o.classList.add('game-icon');
                if (!block.hasChildNodes(o)) {
                    block.appendChild(o);
                }
            }
            i++;
        });

        console.log(board);
    }

    function setBoard(square) {
        board[square] = Game.getTurn();
    }

    function isEmpty(square) {
        let ans = board[square] == 0 ? true : false;
        return ans;
    }

    function inARow() {
        if (board[0] == board[1] && board[0] == board[2]) {
            return board[0];
        } else if (board[3] == board[4] && board[3] == board[5]) {
            return board[3];
        } else if (board[6] == board[7] && board[6] == board[8]) {
            return board[6];
        } else if (board[0] == board[3] && board[0] == board[6]) {
            return board[0];
        } else if (board[1] == board[4] && board[1] == board[7]) {
            return board[1];
        } else if (board[2] == board[5] && board[2] == board[8]) {
            return board[2];
        } else if (board[0] == board[4] && board[0] == board[8]) {
            return board[0];
        } else if (board[2] == board[4] && board[2] == board[6]) {
            return board[2];
        }

        return false;
    }

    function isFull() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] == 0) {
                return false;
            }
        }
        return true;
    }

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== 0) {
                board[i] = 0;
            }
            let block = document.getElementById(i);
            if (block.hasChildNodes()) {
                block.firstChild;
                block.removeChild(block.lastChild);
            }
        }
        displayBoard();
        Game.resetTurn();
    }

    return {displayBoard, setBoard, isEmpty, inARow, isFull, resetBoard};
})();

const Game = (function () {
    let turn = 1;

    function getTurn() {
        return turn;
    }

    function switchTurn() {
        if (turn == 1) {
            turn = 2;
        } else {
            turn = 1;
        }
    }

    function resetTurn() {
        turn = 1;
    }

    function playMove(e) {
        if (Gameboard.isEmpty(e.target.dataset.square)) {
            Gameboard.setBoard(e.target.dataset.square);
            Gameboard.displayBoard();
            isGameOver();
            switchTurn();
            console.log(e.target);
        }
    }

    function checkWin() {
        if (Gameboard.inARow()) {
            if (Gameboard.inARow() == 1) {
                return "Player 1";
            } else {
                return "Player 2";
            }
        }

        return false;
    }

    function checkTie() {
        if (Gameboard.isFull()) {
            return "Tie";
        }
        return false;
    }

    function isGameOver() {
        if (checkWin()) {
            DisplayController.displayResult(checkWin());
        } else if (checkTie()) {
            DisplayController.displayResult(checkTie());
        }
    }

    return {switchTurn, playMove, getTurn, resetTurn};
})();

const DisplayController = (function () {
    

    const startRestart = document.getElementById('start-restart');
    const player1name = document.getElementById('player-1-name');
    const player2name = document.getElementById('player-2-name');
    const player1textbox = document.getElementById('player-1-textbox');
    const player2textbox = document.getElementById('player-2-textbox');
    const output = document.getElementById('player-2-output');

    const player1 = createPlayer('player1');
    const player2 = createPlayer('player2');

    startRestart.addEventListener('click', function() {
        //On first click initalize board and event listeners for the squares and toggle the start button to restart button. Additionally remove the name entry box replace h4 with player names.
        //On click of restart, reset the board.
        if (!startRestart.classList.contains('restart')) {

            if (player1textbox.value && player2textbox.value) {
                const zero = document.getElementById('0');
                const one = document.getElementById('1');
                const two = document.getElementById('2');
                const three = document.getElementById('3');
                const four = document.getElementById('4');
                const five = document.getElementById('5');
                const six = document.getElementById('6');
                const seven = document.getElementById('7');
                const eight = document.getElementById('8');

                zero.dataset.square = 0;
                one.dataset.square = 1;
                two.dataset.square = 2;
                three.dataset.square = 3;
                four.dataset.square = 4;
                five.dataset.square = 5;
                six.dataset.square = 6;
                seven.dataset.square = 7;
                eight.dataset.square = 8;

                zero.addEventListener('click', Game.playMove);
                one.addEventListener('click', Game.playMove);
                two.addEventListener('click', Game.playMove);
                three.addEventListener('click', Game.playMove);
                four.addEventListener('click', Game.playMove);
                five.addEventListener('click', Game.playMove);
                six.addEventListener('click', Game.playMove);
                seven.addEventListener('click', Game.playMove);
                eight.addEventListener('click', Game.playMove);

                startRestart.classList.toggle('restart');
                startRestart.textContent = 'Restart';

                player1.setName(player1textbox.value);
                player2.setName(player2textbox.value);

                player1textbox.classList.add('hidden');
                player2textbox.classList.add('hidden');

                player1name.classList.add('named');
                player2name.classList.add('named');

                player1name.textContent = player1.getName();
                player2name.textContent = player2.getName();


            } else {
                alert('Both players must have names to start.');
            }
        } else {
            Gameboard.resetBoard();
            if (output.textContent) {
                output.textContent = "";
            }
        }

    })

    function displayResult(result) {
        if (result == "Player 1") {
            output.textContent = `${player1.getName()} won the game!`;
        } else if(result == "Player 2") {
            output.textContent = `${player2.getName()} won the game!`;
        } else if (result == "Tie") {
            output.textContent = "It's a tie!";
        }
    }

    return {displayResult};

})();

function createPlayer(name) {
    let playerName = name;

    const getName = () => {return playerName;}

    const setName = (newName) => playerName = newName;

    return { getName, setName };
}
