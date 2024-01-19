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
        // Obtén el valor del atributo data-level
        const levelName = this.getAttribute('data-level') || 'level01';
  
        // Construye la ruta del archivo de nivel dinámicamente
        const levelFilePath = `./levels/${levelName}.js`;

        this.shadow.innerHTML = /*html*/`
            <style>
                .center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: end;
                }
                .grid-container {
                    background-color: black;
                    display: grid;
                    grid-template-columns: repeat(10, 60px);
                    grid-template-rows: repeat(10, 60px);
                    gap: 3px;
                    border: black 20px solid;
                    border-radius: 1rem;
                    padding: 0.2rem;
                    margin-top: 0.5rem;
                }

                .square {
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
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
                    background-image: url(icons/rock.svg);
                    background-size:cover;
                }

                .yellow-block {
                    background-color: yellow;
                    background-image: url(icons/plus_5.svg);
                    background-size:cover;
                }

                #attempts {
                    position: absolute;
                    top: 1rem;
                    left: 8rem;
                    font-size: 10rem;
                }

                .attempts_counter {
                    background-color: lightgrey;
                    padding: 2rem;
                    border: black solid 3px;
                    border-radius: 2rem;
                    width: 10rem;
                    height: 8rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .custom-message {
                    position: absolute;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #333;
                    color: #fff;
                    padding: 2rem;
                    border-radius: 1.5rem;
                    font-size: 5rem;
                    z-index: 1000;
                    display: none;
                    text-align: center;
                }

                @media only screen and (min-width: 600px) {
                    #attempts {
                        font-size: 5rem;
                    }

                    .attempts_counter {
                        padding: 0.5rem;
                    }

                    .custom-message {
                        font-size: 2.5rem;
                    }
                }
            </style>
            <div class="center">
                <div class="custom-message"></div>
                <div class="grid-container" id="gridContainer"></div>
                <div class="attempts_counter" id="attempts">${this.attempts}</div>
            </div>
        `;
        
        // Importa el módulo dinámicamente usando la ruta construida
        import(levelFilePath).then(module => {
            // Llama a initializeGrid del módulo importado
            module.initializeGrid.call(this);
        });
    }

    setupListeners() {
        this.shadow.querySelector('#gridContainer').addEventListener('click', (event) => {
            const square = event.target;
            if (this.canMakeMove(square)) {
                if (square.classList.contains('yellow-block')) {
                    square.classList.remove('yellow-block');
                    square.classList.add('path');
                    this.attempts += 5;
                } else {
                    square.classList.add('path');
                }

                this.checkConnection(square);
                this.attempts--;
                this.updateAttemptsCount();
                this.checkAttempts();
            }
        });
    }

    addYellowBlock(gridContainer) {
        let randomRow, randomCol;
        do {
            randomRow = Math.floor(Math.random() * 10);
            randomCol = Math.floor(Math.random() * 10);
        } while (this.isProhibitedPosition(randomRow, randomCol));

        const yellowBlock = gridContainer.querySelector(`[data-row="${randomRow}"][data-col="${randomCol}"]`);
        yellowBlock.classList.add('yellow-block');

        return yellowBlock;
    }

    isProhibitedPosition(row, col) {
        const prohibitedPositions = [
            [0, 8], [1, 8], [1, 9], [0, 9],
            [8, 0], [8, 1], [9, 1], [9, 0]
        ];

        return prohibitedPositions.some(pos => pos[0] === row && pos[1] === col);
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
            (square.classList.contains('yellow-block') ||
                this.getNeighbors(square).some(neighbor => neighbor.classList.contains('path') || neighbor.classList.contains('start')));
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
            this.showCustomMessage('¡Conexión establecida!', 5);
            document.dispatchEvent(new CustomEvent('buttonsActivated', {}));

            this.connectionEstablished = true;
            this.attempts = 20;
            this.updateAttemptsCount();
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
}

customElements.define('level-component', Level);
