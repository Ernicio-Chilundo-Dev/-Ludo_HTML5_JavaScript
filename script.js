const boardSize = 10;
const board = document.getElementById('board');
let currentPlayer = 1;
let diceResult = 0;
let positions = { player1: 0, player2: 0 };

// Cria o tabuleiro
function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
    }
}

// Rola o dado
function rollDice() {
    diceResult = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').innerText = diceResult;
    movePiece(currentPlayer, diceResult);
    togglePlayer();
}

// Move a peça do jogador
function movePiece(player, steps) {
    const playerClass = `player${player}`;
    const currentSquare = board.children[positions[playerClass]];
    if (currentSquare) {
        currentSquare.classList.remove(playerClass);
    }
    positions[playerClass] += steps;
    if (positions[playerClass] >= boardSize * boardSize - 1) {
        alert(`Player ${player} wins!`);
        resetGame();
    } else {
        board.children[positions[playerClass]].classList.add(playerClass);
    }
}

// Alterna a vez dos jogadores
function togglePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('playerTurn').innerText = currentPlayer;
}

// Reinicia o jogo
function resetGame() {
    positions = { player1: 0, player2: 0 };
    currentPlayer = 1;
    document.getElementById('playerTurn').innerText = currentPlayer;
    document.getElementById('diceResult').innerText = 0;
    Array.from(board.children).forEach(square => {
        square.classList.remove('player1', 'player2');
    });
}

// Inicializa o jogo
createBoard();
resetGame();
