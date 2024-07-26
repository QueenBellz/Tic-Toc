const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
  
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    const setCell = (index, mark) => {
      if (board[index] === '') {
        board[index] = mark;
        return true;
      }
      return false;
    };
  
    return { getBoard, resetBoard, setCell };
  })();
  
  const Player = (name, mark) => {
    return { name, mark };
  };

  const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameActive = true;
  
    const init = (player1, player2) => {
      players = [Player(player1, 'X'), Player(player2, 'O')];
      currentPlayerIndex = 0;
      gameActive = true;
      Gameboard.resetBoard();
      DisplayController.renderBoard();
    };
  
    const switchPlayer = () => {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    };

    const playRound = (index) => {
        if (!gameActive) return;

        const currentPlayer = players[currentPlayerIndex];
        if (Gameboard.setCell(index, currentPlayer.mark)) {
            DisplayController.renderBoard();
            if (checkWinner(currentPlayer.mark)) {
                alert('${currentPlayer.name} wins!');
                gameActive = false;
                return;
            }
            if (Gameboard.getBoard().every(cell => cell !== '')) {
                alert('It\'s a tie!');
                gameActive = false;
                return;
            }
            switchPlayer();
        }
    };

    const checkWinner = (mark) => {
        const winPatterns = [
            [0, 1,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => Gameboard.getBoard()[index] === mark)
        );
    };

    return { int, playRound };

})();

const DisplayController = (() => {
    const renderBoard = () => {
        const gameboard = document.getElementById('gameboard');
        gameboard.innerHTML = '';
        Gameboard.getBoard().forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => GameController.playRound(index));
            Gameboard.appendChild(cellElement);
        });
    };

    return { renderBoard };
})();

document.addEventListener('DOMContentLoaded', () => {
    GameController.init('Player 1', 'Player 2');
});