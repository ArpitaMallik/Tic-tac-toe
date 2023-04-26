const cells = [...document.querySelectorAll('.cell')];
const statusText = document.querySelector("#status");
const restart = document.querySelector("#rest");

// let winIndicator = getComputedStyle(document.body).getPropertyValue("--winning-blocks");

const oText = "O";
const xText = "X";
const running = false;
let currentPlayer = xText;
let spaces = Array(9).fill("");

const winCombos = [
     [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];


startGame();
cellClicked();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restart.addEventListener("click", restartGame);
}

function cellClicked(){
    const cellInd = this.getAttribute("id");
    
    if(spaces[cellInd] == ""){
        spaces[cellInd] = currentPlayer;
        this.textContent = currentPlayer;

        checkWinner();
    
    }
}

function changePlayer(){
    currentPlayer = ((currentPlayer == xText) ? oText : xText);

    statusText.textContent = `${currentPlayer}'s turn!`;
}

function checkWinner(){
    let roundWon = false;
    for(const i of winCombos){
        let [a,b,c] = i;

        if(spaces[a]!="" && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            roundWon = true;
            statusText.textContent = `${currentPlayer} has won!`;
            return [a,b,c];
        }
    } 

    if(!spaces.includes("")){
        statusText.textContent = "It's a draw!"
    }
    else{
        changePlayer();
    }
}


restart.addEventListener("click", restartGame);

function restartGame(){
    statusText.textContent = `${currentPlayer}'s turn!`;
    spaces.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
    })
    currentPlayer = xText;
}

