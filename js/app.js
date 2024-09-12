//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner = false;
let tie = false;


/*------------------------ Cached Element References ------------------------*/
const squareE1s = document.querySelectorAll('.sqr');
const messageE1 = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

//console.log(squareE1s)
//console.log(messageE1)
/*-------------------------------- Functions --------------------------------*/

function render() {
    updateMessage()
    updatedBoard()
    // handleClick()
};
render()

const updatedBoard =  () => {
    board.forEach((square, squareIndex) => {
        // console.log(square + 'is at index' + squareIndex)
        squareE1s[squareIndex].textContent = square;
        if(square === "X") {
            square.style.color = "red";
        } else if (square === "O") {
            square.style.color = "blue";
        } else {
            square.style.color = "black";
        }
    });
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageE1.textContent = `It's ${turn}'s turn`;
    } else if (winner === false && tie === true) {
        messageE1.textContent = "It's a tie!"
    } else {
        messageE1.textContent = `${turn} is the winner!`
    }
};

const placePiece = (index) => {
    board[index] = turn
};

const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
        let currentCombo = winningCombos[i];

        if (board[currentCombo[i] [0]].length > 0) {
           
            if (board[currentCombo[i] [0]] === board[currentCombo[i] [1]]) {

                if (board[currentCombo[i] [0]] === board[currentCombo[i] [2]]) {

                    winner = true;
                    console.log(winner)
                }
            }
        }
    }
};

const checkForTie = () => {
    if (winner) return; 
    if (!board.includes('')) tie = true;
};

const switchPlayerTurn = () => {
    if(winner) return;
    if (turn === 'X') {
        turn = 'O' 
    } else { 
      turn = "X"   
    }
}
 

const handleClick = (e) => {
    // console.log([...e.target.classList].includes('sqr'))
    //console.log(e.target.classList.contains(sqr))
    if (winner === true ) {
        return
    }    
    if (e.target.classList.contains('sqr')) {
        const squareIndex = e.target.id
        if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
            //if (board[squareIndex].length > 0) {   
            return
        }
        placePiece(squareIndex)
    }
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    return
};
// squareE1s.forEach(square => {
//     square.addEventListener('click', handleClick)
// })
const init = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = 'x';
    winner = false;
    tie = false;
    // console.log(board);
    // console.log(turn);
    // console.log(winner);
    // console.log(tie);

    render()
};

window.onload = () => {
    init();
};

/*----------------------------- Event Listeners -----------------------------*/
squareE1s.forEach(square => {
    square.addEventListener('click', handleClick)
});

document.querySelector(".board").addEventListener("click", handleClick)

resetBtnEl.addEventListener("click", init)
