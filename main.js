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

    return {displayBoard, setBoard, isEmpty}
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

    function playMove(e) {
        if (Gameboard.isEmpty(e.target.dataset.square)) {
            Gameboard.setBoard(e.target.dataset.square);
            Gameboard.displayBoard();
            switchTurn();
            console.log(e.target);
        }
    }

    return {switchTurn, playMove, getTurn};
})();

const DisplayController = (function () {
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

})();

function createPlayer(name) {
    const getName = () => name;

    return { getName };
}

//DisplayController.watchClick();
//Game.playMove(0);
//Gameboard.displayBoard();
