class Level extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.attempts = 20;
        this.connectionEstablished = false;
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.shadow.innerHTML =
        /*html*/`

        <style>
            .grid-container {
                display: grid;
                grid-template-columns: repeat(10, 60px);
                grid-template-rows: repeat(10, 60px);
                gap: 2px;
                border: rgb(22, 1, 1) 20px solid;
                border-radius: 1rem;
                padding: 0.2rem;
            }

            .square {
                width: 100%;
                height: 100%;
                background-color: #fff;
                border: 1px solid #ccc;
                box-sizing: border-box;
            }

            .start {
                grid-row: 10;
                grid-column: 1;
                background-color: black;
                background-image: url(icons/start.svg);
                border-radius: 0.5rem;
            }

            .end {
                grid-row: 1;
                grid-column: 10;
                background-color: black;
                background-image: url(icons/end.svg);
                border-radius: 0.5rem;
            }

            .path {
                background-color: green;
            }

            .obstacle {
                background-color: brown;
                pointer-events: none;
            }

            #attempts {
                position: absolute;
                top: 50px;
                left: 50px;
                font-size: 10rem;
            }

            .attempts_counter {
                background-color: lightgrey;
                padding: 2rem;
                border: black solid 3px;
                border-radius: 2rem;
                width:10rem;
                display:flex;
                align-items:center;
                justify-content:center;
            }

            .custom-message {
                position: absolute;
                top: 10%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #333;
                color: #fff;
                padding: 2rem;
                border-radius: 1.5rem;
                font-size: 5rem;
                z-index: 1000;
                display:none;
            }


        </style>
        <div class="custom-message"></div>
        <div class="grid-container" id="gridContainer"></div>
        <div class="attempts_counter" id="attempts">${this.attempts}</div>
        `;
        this.initializeGrid();
    }

    setupListeners() {
        this.shadow.querySelector('#gridContainer').addEventListener('click', (event) => {
            const square = event.target;
            if (this.canMakeMove(square)) {
                square.classList.add('path');
                this.checkConnection(square);
                this.attempts--;
                this.updateAttemptsCount();
                this.checkAttempts();
            }
        });
    }

    initializeGrid() {
        const gridContainer = this.shadow.querySelector('#gridContainer');
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = this.createSquare(i, j);
                gridContainer.appendChild(square);
            }
        }

        const startSquare = gridContainer.querySelector('[data-row="9"][data-col="0"]');
        const endSquare = gridContainer.querySelector('[data-row="0"][data-col="9"]');
        startSquare.classList.add('start');
        endSquare.classList.add('end');
    }

    createSquare(row, col) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = row;
        square.dataset.col = col;

        return square;
    }

    canMakeMove(square) {
        return !this.connectionEstablished && !square.classList.contains('end') &&
            !square.classList.contains('path') && this.attempts > 0 &&
            this.getNeighbors(square).some(neighbor => neighbor.classList.contains('path') || neighbor.classList.contains('start'));
    }

    getNeighbors(clickedSquare) {
        const clickedRow = parseInt(clickedSquare.dataset.row, 10);
        const clickedCol = parseInt(clickedSquare.dataset.col, 10);

        const neighbors = [];

        [this.shadow.querySelector(`[data-row="${clickedRow - 1}"][data-col="${clickedCol}"]`),
        this.shadow.querySelector(`[data-row="${clickedRow + 1}"][data-col="${clickedCol}"]`),
        this.shadow.querySelector(`[data-row="${clickedRow}"][data-col="${clickedCol - 1}"]`),
        this.shadow.querySelector(`[data-row="${clickedRow}"][data-col="${clickedCol + 1}"]`)]
            .filter(Boolean)
            .forEach(neighbor => neighbors.push(neighbor));

        return neighbors;
    }

    showCustomMessage(message, durationInSeconds) {
        const messageContainer = this.shadow.querySelector('.custom-message');
        messageContainer.textContent = message;
        messageContainer.style.display = 'block';
    
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, durationInSeconds * 1000);
    
        this.connectionEstablished = true;
        this.shadow.querySelector('#attempts').style.display = 'none';
    }
    

    checkConnection(clickedSquare) {
        const clickedRow = parseInt(clickedSquare.dataset.row, 10);
        const clickedCol = parseInt(clickedSquare.dataset.col, 10);

        if (this.getNeighbors(clickedSquare).some(neighbor => neighbor.classList.contains('end'))) {
            this.showCustomMessage('¡conexión establecida!', 5);
            this.connectionEstablished = true;
            this.shadow.querySelector('#attempts').style.display = 'none';
        }
    }

    updateAttemptsCount() {
        this.shadow.querySelector('#attempts').textContent = this.attempts;
    }

    checkAttempts() {
        if (this.attempts === 0) {
            this.showCustomMessage('Sin intentos disponibles', 3);
        }
    }

    addObstacle(row, col) {
        const gridContainer = this.shadow.querySelector('#gridContainer');
        const obstacleSquare = gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);

        if (obstacleSquare && !obstacleSquare.classList.contains('start') && !obstacleSquare.classList.contains('end') && !obstacleSquare.classList.contains('obstacle')) {
            obstacleSquare.classList.add('obstacle');
        }
    }
}

customElements.define('level-component', Level);

// Coordenadas obstáculos
const levelComponent = document.querySelector('level-component');
levelComponent.addObstacle(9, 5);
levelComponent.addObstacle(9, 4);
levelComponent.addObstacle(8, 5);
levelComponent.addObstacle(8, 4);
levelComponent.addObstacle(7, 5);
levelComponent.addObstacle(7, 4);
levelComponent.addObstacle(6, 5);
levelComponent.addObstacle(6, 4);
levelComponent.addObstacle(2, 5);
levelComponent.addObstacle(2, 4);
levelComponent.addObstacle(1, 5);
levelComponent.addObstacle(1, 4);
levelComponent.addObstacle(0, 5);
levelComponent.addObstacle(0, 4); 
