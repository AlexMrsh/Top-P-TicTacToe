/*
const createPlayer = (name, playerType) => {
    (function confirmCreation(){
        console.log(`Player ${playerType} : ${name} have been created`)
    })()

    return{name}
}

player1 = createPlayer('Alex', 'X')
player2 = createPlayer('AI', 'O')
*/

const CROSS_SYMBOL = 'X'
const CIRCLE_SYMBOL = 'O'
let circleTurn = false


const gameBoard = (() => {
    const _board = new Array(9);
    let currentSymbol = 'X';

    const initializeField = () => {
        const container = document.getElementById('container');
        for(let i = 0; i < _board.length; i++){
            let fieldDiv = document.createElement('div')
            fieldDiv.setAttribute('data-boardindex', i);
            fieldDiv.addEventListener('click', handleClick, {once: true})
            container.appendChild(fieldDiv)
        }
    }

    const handleClick = event => {
        const boardElement = e.target;
        const currentSymbol = circleTurn ? CIRCLE_SYMBOL : CROSS_SYMBOL
        let boardIndex = event.target.getAttribute('data-boardindex')
        boardElement.textContent = currentSymbol;
        
        _board[boardIndex] = currentSymbol;
        event.target.textContent = currentSymbol;
        
        checkGameStatus();
        //computerTurn
        console.log(_board)
    }

    const checkGameStatus = () => {
        const winingCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        return winingCombinations.some(combination => {
            return combination.every(index => {
                const boardElements = document.querySelectorAll('[data-boardindex]')
                return boardElements[index].textContent
            })
        })
    }

    return {
        initializeField
    }
})()

gameBoard.initializeField()