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


const gameBoard = (() => {
    const _board = new Array(9);

    const initializeField = () => {
        const container = document.getElementById('container');
        for(let i = 0; i < _board.length; i++){
            let fieldDiv = document.createElement('div')
            fieldDiv.className = 'field-symbols'
            fieldDiv.setAttribute('data-boardindex', i);
            fieldDiv.addEventListener('click', setField)
            container.appendChild(fieldDiv)
        }
    }

    const setField = event => {
        let boardIndex = event.target.getAttribute('data-boardindex')
        event.target.setAttribute('tick', 'X')
        let sign = 'X';
        _board[boardIndex] = sign;
        event.target.textContent = sign;
        checkGameStatus();
        //computerTurn
        console.log(_board)
    }

    const checkGameStatus = () => {
        
        if(     _board[0] === _board[1] && _board[1] === _board[2]
            ||  _board[3] === _board[4] && _board[4] === _board[5]
            ||  _board[6] === _board[7] && _board[7] === _board[8]
            ||  _board[0] === _board[3] && _board[3] === _board[6]
            ||  _board[1] === _board[4] && _board[4] === _board[7]
            ||  _board[2] === _board[5] && _board[5] === _board[8]
            ||  _board[0] === _board[4] && _board[4] === _board[8]
            ||  _board[2] === _board[4] && _board[4] === _board[6]){
            console.log('ok')
        }
    }

    return {
        initializeField
    }
})()

gameBoard.initializeField()