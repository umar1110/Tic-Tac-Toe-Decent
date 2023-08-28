const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById('board')
const winningMesage = document.querySelector('[data-winning-message-text]')
const winningMessageBox = document.querySelector('#winning-message')
const restartBtn =document.querySelector('#restart-btn') ;
const X_CLASS = 'x';
const O_CLASS ='o';
let xturn;
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

startGame();

function startGame(){
    xturn = true;
    cellElements.forEach((cell)=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener("click",
        handleClick ,{once :true})
    })
setBoardHoverClass();
winningMessageBox.classList.remove("show");

}


function handleClick(e){
    const cell = e.target
    const currentClass = xturn ? X_CLASS :O_CLASS;
    // PLace the Mark 
    placeMark(cell,currentClass);
    // check for win
    if(checkWin(currentClass)){
            endGame(false,currentClass)    
        }
    // check for draw'
    else if(isDraw()){
        endGame(true)
    }
    // switch turn
    else{
    switchTurn();
    setBoardHoverClass();
    }
}

// 
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}
function switchTurn(){
    xturn = !xturn;
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(xturn){
        board.classList.add(X_CLASS)
    }
    else {
        board.classList.add(O_CLASS)
    }
}
function checkWin(currentClass){
    return winningConditions.some((condition)=>{
        return condition.every((index)=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}


function isDraw(){
    return [...cellElements].every((cell)=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}
function endGame(isDraw,whoWin){
if(isDraw){
    winningMesage.textContent = "Draw"
}
else{
    winningMesage.textContent = `${whoWin.toUpperCase()} Wins!`
}
winningMessageBox.classList.add("show")}



restartBtn.addEventListener('click',startGame);
