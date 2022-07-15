const generaDom = document.getElementById('genera');
generaDom.addEventListener('click', startGame );

function startGame() {
    const difficult = parseInt(document.getElementById('difficult').value);

    let cellTotal;
    let cellPerSide;

    switch (difficult) {
        case 1:
        default:
            cellTotal = 100;
            break;
        case 2:
            cellTotal = 81;
            break;
        case 3:
            cellTotal = 49;
            break;
    };

    cellPerSide = Math.sqrt(cellTotal);

    const NUMBER_OF_BOMBS = 16;
    const bomblist = generateBombList(NUMBER_OF_BOMBS, cellTotal);
    let score = 0;
    let gameOver = false;

    function showBombs(arrayOfBombs) {
        const cellsDom = document.getElementsByClassName('square');
        for (i = 0; i < cellsDom.length; i++) {
            const numberInside = parseInt(cellsDom[i].innerText);
            if (arrayOfBombs.includes(numberInside)) {

                cellsDom[i].classList.add('clicked-bomb')
            }
        }
    }

    generatePlayground();

    function generatePlayground() {
        const gridDom = document.getElementById('grid');
        gridDom.innerHTML = '';
        for(let i = 1; i <= cellTotal; i++){
        const currentElement = createGridSquare(i, cellPerSide);
        currentElement.addEventListener('click', 
            function() {
                if (gameOver == false) {
                    if (bomblist.includes(i)) {
                        this.classList.add('clicked-bomb');
                        gameOver = true;
                        writeScore(`Game Over, sei finito su una bomba, il tuo punteggio è: ${score}`);
                        showBombs(bomblist);  
                    } else {
    
                        if (!this.classList.contains('clean')) {
                            score++;
                            writeScore(`Il tuo punteggio è: ${score}`);
                            this.classList.add('clean');
                            checkifyouWin(NUMBER_OF_BOMBS, cellTotal, score);
                        }
                    }
                }

             }
        );
    gridDom.append(currentElement);
    };
    };
    function createGridSquare(number, cellePerLato) {
        const currentElement = document.createElement('div');
        currentElement.style.height = `calc(100% / ${cellePerLato})`;
        currentElement.style.width = `calc(100% / ${cellePerLato})`;
        currentElement.classList.add('square');
        const numberSquare = document.createElement('div');
        numberSquare.classList.add('square-number');
        numberSquare.append(number);
        currentElement.append(numberSquare);

        return currentElement;
    };

    function checkifyouWin(numberOfBombs, totaCell, currentScore) {
        const maxCellFree = totaCell - numberOfBombs;
        if (currentScore == maxCellFree) {
            writeScore('Bravissimo, hai trovato tutte le celle libere!');
            showBombs(bomblist)

        }
    };

    function generateBombList(numberOfBombs, cellTotal) {
    const bomb_list = [];

    for (let i = 0; i < numberOfBombs; i++) {
        const bomb = getUniqueRandomNumber(bomb_list, 1, cellTotal);
        bomb_list.push(bomb);
    }

    return bomb_list;
    };

    function writeScore(text) {
    const scoreDom = document.getElementById('score');
    scoreDom.innerHTML = text;
    };

    function getNumeroCasuale(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function getUniqueRandomNumber(ListaNumeriUsati, min, max) {
    let numeroValido = false;
    let numeroCasualeCreato;
    while(numeroValido == false) {
        numeroCasualeCreato = getNumeroCasuale(min, max);
        if (ListaNumeriUsati.includes(numeroCasualeCreato) == false) {
            numeroValido = true;
        }
    }
    return numeroCasualeCreato;
    };

}