document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('gridContainer');
    const attemptsCountElement = document.getElementById('attemptsCount');
    const resetButton = document.getElementById('resetButton');
    let attempts = 20;
    let connectionEstablished = false;

    const grid = [];
    const rows = 10;
    const cols = 10;

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            const square = createSquare(i, j);
            grid[i][j] = square;
            gridContainer.appendChild(square);
        }
    }

    const startSquare = grid[9][0];
    const endSquare = grid[0][9];

    startSquare.classList.add('start');
    endSquare.classList.add('end');

    function createSquare(row, col) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = row;
        square.dataset.col = col;

        square.addEventListener('click', () => {
            if (canMakeMove(square)) {
                square.classList.add('path');
                checkConnection(square);
                attempts--;
                updateAttemptsCount();
                checkAttempts();
            }
        });

        return square;
    }

    function canMakeMove(square) {
        return !connectionEstablished && !square.classList.contains('end') &&
            !square.classList.contains('path') && attempts > 0 &&
            getNeighbors(square).some(neighbor => neighbor.classList.contains('path') || neighbor.classList.contains('start'));
    }

    function getNeighbors(clickedSquare) {
        const clickedRow = parseInt(clickedSquare.dataset.row, 10);
        const clickedCol = parseInt(clickedSquare.dataset.col, 10);

        const neighbors = [];

        [grid[clickedRow - 1]?.[clickedCol], grid[clickedRow + 1]?.[clickedCol], grid[clickedRow][clickedCol - 1], grid[clickedRow][clickedCol + 1]]
            .filter(Boolean)
            .forEach(neighbor => neighbors.push(neighbor));

        return neighbors;
    }

    function checkConnection(clickedSquare) {
        const clickedRow = parseInt(clickedSquare.dataset.row, 10);
        const clickedCol = parseInt(clickedSquare.dataset.col, 10);

        if (getNeighbors(clickedSquare).some(neighbor => neighbor.classList.contains('end'))) {
            alert('¡Conexión establecida!');
            connectionEstablished = true;
            attemptsCountElement.style.display = 'none';
        }
    }

    function updateAttemptsCount() {
        attemptsCountElement.textContent = attempts;
    }

    function checkAttempts() {
        if (attempts === 0) {
            alert('Sin intentos disponibles');
        }
    }

    function addObstacle(row, col) {
        const square = grid[row][col];
        square.classList.add('obstacle');
    }

    const obstaclesPositions = [
        [9, 5], [9, 4],
        [8, 5], [8, 4],
        [7, 5], [7, 4],
        [6, 5], [6, 4],
        [3, 5], [3, 4],
        [2, 5], [2, 4],
        [1, 5], [1, 4],
        [0, 5], [0, 4]
    ];

    obstaclesPositions.forEach(pos => addObstacle(...pos));

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    function resetGame() {
        document.location.reload();
    }
});
