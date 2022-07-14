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
    }

    cellPerSide = Math.sqrt(cellTotal);

    generatePlayground();

    function generatePlayground() {
        const gridDom = document.getElementById('grid');
        gridDom.innerHTML = '';
        for(let i = 1; i <= cellTotal; i++){
        const currentElement = createGridSquare(i, cellPerSide);
        currentElement.addEventListener('click', 
            function() {
            this.classList.toggle('clicked');
            console.log(currentElement.textContent);
        }
    );
    gridDom.append(currentElement);
    }
}
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
    }
}