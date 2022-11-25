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

    const PLAYER_AI_DIFFICULTY = {
        0: 'Human',
        1: 'AI Easy',
        2: 'AI Medium',
        3: 'AI Hard'

    }

    let circleTurn
    let player1
    let player2


    function createPlayer(name, difficulty){
        return{name, difficulty}
    }

    const playerAiButton = document.querySelectorAll('.player-ai-button')
    const startGameButton = document.getElementById('start-game')
    const gameFormBackground = document.getElementById('game-form-background')
    const field = document.getElementById('field')
    const fieldElements = field.querySelectorAll('div')
    const roundResultBackground = document.getElementById('round-result-background')
    const playAgainButton = document.getElementById('new-round-button')

    
    playAgainButton.addEventListener('click', newRound)
    startGameButton.addEventListener('click', (e) => {
        e.preventDefault()
        loadGameParameters()
        setScoreBoard()
        startGame()
        gameFormBackground.classList.add('hidden')
    })
    
    function setScoreBoard(){
        let scoreboardPlayer1Name = document.getElementById('scoreboard-player1-name')
        scoreboardPlayer1Name.textContent = player1.name
        let scoreboardPlayer2Name = document.getElementById('scoreboard-player2-name')
        scoreboardPlayer2Name.textContent = player2.name
    }

    function loadGameParameters(){
        let player1Input = document.getElementById('player1-name')
        let player1Name = player1Input.value
        let player1Difficulty = player1Input.nextElementSibling.getAttribute('data-difficulty')
        player1 = createPlayer(player1Name, player1Difficulty)

        let player2Input = document.getElementById('player2-name')
        let player2Name = player2Input.value
        let player2Difficulty = player2Input.nextElementSibling.getAttribute('data-difficulty')
        player2 = createPlayer(player2Name, player2Difficulty)
    }
    
    playerAiButton.forEach((element) => {
        element.addEventListener('click', switchDifficulty)
    })
    
    function switchDifficulty(event){
        event.preventDefault()
        let currentDifficulty = event.target.getAttribute('data-difficulty')
            if(currentDifficulty === (Object.keys(PLAYER_AI_DIFFICULTY).length-1).toString()){
                currentDifficulty = 0;
            }else{
                currentDifficulty++
            }
        updateDifficultyDisplay(currentDifficulty, event.target)
    }

    function updateDifficultyDisplay(index, element){
        element.textContent = PLAYER_AI_DIFFICULTY[index]
        element.setAttribute('data-difficulty', index)
    }

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
            updateScore(currentSymbol)
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

    function updateScore(winner){
        if(winner === CIRCLE_CLASS){
            let circleScore = document.getElementById('player2-score')
            circleScore.textContent++
        }else{
            let crossScore = document.getElementById('player1-score')
            crossScore.textContent++
        }
    }

    return{
        startGame
    }
})()

gameBoard.startGame()