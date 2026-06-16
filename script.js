const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const timerEl = document.getElementById('timer');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let timeLeft = 30;
let timerInterval = null;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  timerEl.classList.remove('danger');

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 10) {
      timerEl.classList.add('danger');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      status.textContent = `Time's up! Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
      if (currentPlayer === 'X') {
        scoreO++;
        scoreOEl.textContent = scoreO;
      } else {
        scoreX++;
        scoreXEl.textContent = scoreX;
      }
      gameActive = false;
    }
  }, 1000);
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      status.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameActive = false;
      clearInterval(timerInterval);
      if (currentPlayer === 'X') {
        scoreX++;
        scoreXEl.textContent = scoreX;
      } else {
        scoreO++;
        scoreOEl.textContent = scoreO;
      }
      return;
    }
  }

  if (!board.includes('')) {
    status.textContent = "It's a Draw!";
    gameActive = false;
    clearInterval(timerInterval);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
    startTimer();
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  startTimer();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

startTimer();
