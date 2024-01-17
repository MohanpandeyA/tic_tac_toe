const X_class='x'
const Circle_class ='circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

const cellElements = document.querySelectorAll('[data-cell')
const board =document.getElementById('board') 
const winningMessageElement =document.getElementById('winningMessage')

const restartbutton =document.getElementById('restartButton')

const winningMessageTextElement =document.querySelector('[data-winning-message-text]')

let circleTurn

STARTGAME()

restartbutton.addEventListener('click', STARTGAME)

function STARTGAME(){
    circleTurn=false
    cellElements.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(Circle_class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentclass =circleTurn ? Circle_class :X_class
    placeMark(cell,currentclass)

    if(checkwin(currentclass)){
        console.log('winner')
        endgame(false)
    }else if(isDraw()){
        endgame(true)
    }else{

    swapTurns()
    setBoardHoverClass()
    }
    //place marks
    //check for win
    //check for draw 
    //switch turns
}

function endgame(draw){
    if(draw){
        winningMessageTextElement.innerText ='Draw!'
    }else{
        winningMessageTextElement.innerText =`${circleTurn ? "O's":"X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_class) || 
        cell.classList.contains(Circle_class)
    })
}

function placeMark(cell,currentclass){
    cell.classList.add(currentclass)
}
function swapTurns(){
    circleTurn =!circleTurn
}

function setBoardHoverClass () {
    board.classList.remove(X_class)
    board.classList.remove(Circle_class)

    if(circleTurn) {
        board.classList.add(Circle_class)
    }
    else{
        board.classList.add(X_class)
    }
}

function checkwin(currentclass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentclass)
        })
    })
}