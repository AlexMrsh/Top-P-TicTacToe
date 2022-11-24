const gameBoard = (() => {
    const CIRCLE_CLASS = 'circle'
    const CROSS_CLASS = 'close'
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

    let circleTurn

    const field = document.getElementById('field')
    const fieldElements = field.querySelectorAll('div')
    const roundResultBackground = document.getElementById('round-result-background')
    const playAgainButton = document.getElementById('new-round-button')

    playAgainButton.addEventListener('click', newRound)

    function startGame(){
        field.innerHTML = ''            //reset field content
        for(i = 0; i < 9; i++){         //create field grid
            let fieldDiv = document.createElement('div')
            fieldDiv.setAttribute('data-cellindex', i)
            fieldDiv.classList.add('material-symbols-outlined')
            fieldDiv.addEventListener('click', handleClick, {once: true})
            field.appendChild(fieldDiv)
        }
        circleTurn = false;
    }

    function handleClick(e){
        cell = e.target
        let currentSymbol = circleTurn ? CIRCLE_CLASS : CROSS_CLASS

        if(currentSymbol === CIRCLE_CLASS){
            e.target.textContent = 'circle'
        }else{
            e.target.textContent = 'close'
        }
        
        if(checkWin(currentSymbol)){
            showRoundResult(true, currentSymbol)        //true == someone won
            //update scores et roundCount
        }else if(checkFull()){
            showRoundResult(false)                      //false == no winner
        }else{
            circleTurn = !circleTurn
        }
    }
    
    function checkWin(symbol){
        return WINNING_COMBINATION.some(combination => {
            return combination.every(index => {
                let cellElements = document.querySelectorAll('[data-cellindex]')
                return cellElements[index].textContent === symbol
            })
        })
    }

    function checkFull(){
        let cellElements = document.querySelectorAll('[data-cellindex]')
        return [...cellElements].every(element => element.textContent !== '')
    }

    function showRoundResult(roundResult, currentSymbol){
        roundResultBackground.classList.remove('hidden')
        let resultText = document.getElementById('result-text')

        if(roundResult){
            let roundWinner
            (currentSymbol === CIRCLE_CLASS) ? roundWinner = '0' : roundWinner = 'X'
            resultText.textContent = `${roundWinner} won the round`
        }else{
            resultText.textContent = 'No winner'
        }
    }

    function newRound(){
        roundResultBackground.classList.add('hidden')
        startGame()
    }

    return{
        startGame
    }
})()

gameBoard.startGame()