const gameBoard = (() => {
    const field = document.getElementById('field')
    const fieldElements = field.querySelectorAll('div')
    let circleTurn

    function startGame(){
        field.innerHTML = ''            //reset field content
        for(i = 0; i < 9; i++){         //create field grid
            let fieldDiv = document.createElement('div')
            fieldDiv.setAttribute('data-index', i)
            fieldDiv.classList.add('material-symbols-outlined')
            fieldDiv.addEventListener('click', handleClick, {once: true})
            field.appendChild(fieldDiv)
        }
        circleTurn = false;
    }



    function handleClick(e){
        cell = e.target
        console.log(cell)
    }

    return{
        startGame
    }
})()

gameBoard.startGame()