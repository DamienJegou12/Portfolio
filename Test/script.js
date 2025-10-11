const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusMessage.innerText = "Au tour du joueur X";
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        updateStatus();
    }
}

function endGame(draw) {
    if (draw) {
        statusMessage.innerText = "Match nul !";
    } else {
        statusMessage.innerText = `Le joueur ${oTurn ? "O" : "X"} a gagné ! 🎉`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    // Cela peut être utilisé pour un effet de survol indiquant quel marqueur sera placé
}

function updateStatus() {
    statusMessage.innerText = `Au tour du joueur ${oTurn ? "O" : "X"}`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}