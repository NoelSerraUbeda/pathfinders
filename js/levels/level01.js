// gridInitializer.js

function initializeGrid() {
  const gridContainer = this.shadow.querySelector('#gridContainer');
  for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
          const square = this.createSquare(i, j);
          gridContainer.appendChild(square);
      }
  }

  // Añadir bloques amarillos
  const yellowBlock = this.addYellowBlock(gridContainer);

  const startSquare = gridContainer.querySelector('[data-row="9"][data-col="0"]');
  const endSquare = gridContainer.querySelector('[data-row="0"][data-col="9"]');
  startSquare.classList.add('start');
  endSquare.classList.add('end');

  for (let i = 0; i < 30; i++) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      const obstacleSquare = gridContainer.querySelector(`[data-row="${randomRow}"][data-col="${randomCol}"]`);

      // Asegurarse de que el obstáculo no esté en las posiciones prohibidas
      if (obstacleSquare && !this.isProhibitedPosition(randomRow, randomCol) && obstacleSquare !== yellowBlock) {
          obstacleSquare.classList.add('obstacle');
      } else {
          // Si está en una posición prohibida o es el bloque amarillo, intentar de nuevo
          i--;
      }
  }
}

// Export the function for use in other files
export { initializeGrid };
