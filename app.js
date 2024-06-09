const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const status = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    gameActive = false;
    status.textContent = `${currentPlayer} wins!`;
    highlightWinningCells(currentPlayer);
  } else if (checkDraw()) {
    gameActive = false;
    status.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === player);
  });
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function highlightWinningCells(player) {
  winningConditions.forEach(condition => {
    if (condition.every(index => gameState[index] === player)) {
      condition.forEach(index => {
        cells[index].classList.add('win');
      });
    }
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'win');
  });
  status.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
