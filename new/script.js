const CROSS_CLASS = 'cross'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let circleTurn;

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restart-button')

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(CROSS_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}

function handleClick(event){
    const cell = event.target
    const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS

    //placeMark
    placeMark(cell, currentClass)

    // CheckforWin
    if(checkWin(currentClass)){ //true = un gagnant
        endGame(false)
    } else if (isDraw()){       //true = grille complète, pas de gagnant
        endGame(true)
    } else {                    //
        swapTurns()
        setBoardHoverClass()
    }

    // check for draw

    // swhitch turns
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.textContent = 'Draw!'
    }else{
        winningMessageTextElement.textContent = `${circleTurn ? 'O' : 'X'} wins !`
    }
    winningMessage.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return  cell.classList.contains(CROSS_CLASS) ||
                cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(CROSS_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(CROSS_CLASS)

}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

/*  La fonction checkWin prend currentClass comme argument.
    Elle itère sur WINNING_COMBINATION avec le test .some()
    .some prend combination comme argument, correspondant à chaque élément de l'array WINNING_COMBINATION
    combination passe le test .every, qui renvoie index (la valeur de chaque des sous élément de l'élément de l'array)
    celleElements est la nodeList renvoyé par querySelectorAll
    On passe la valeur de chaque index dans cellElements comme index de référence à la nodelist testée
    On vérifie que toutes les valeurs de la nodeList testée contiennent la class currentClass
*/