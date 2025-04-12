import React, { useState, useEffect } from "react";
import Board from "./Board";

export default function Game({ playerX, playerO }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });
  const [draw, setDraw] = useState(false);
  const [wins, setWins] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("wins"));
    if (storedData && typeof storedData.X === 'object' && typeof storedData.O === 'object') {
      return storedData;
    } else {
      return { X: { wins: 0, name: playerX }, O: { wins: 0, name: playerO } };
    }
  });
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const winnerData = calculateWinner(board);
    if (winnerData.winner) {
      setWinnerInfo(winnerData);
      const newWins = { ...wins };
      newWins[winnerData.winner].wins += 1;
      setWins(newWins);
      localStorage.setItem("wins", JSON.stringify(newWins)); 
    } else if (!board.includes(null)) {
      setDraw(true);
    }
  }, [board]);

  function handleClick(i) {
    if (board[i] || winnerInfo.winner) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setDraw(false);
    setMoves(moves + 1);
  }

  function newGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: [] });
    setDraw(false);
    setMoves(0);
  }

  function resetStats() {
    localStorage.removeItem("wins");
    setWins({ X: { wins: 0, name: playerX }, O: { wins: 0, name: playerO } });
  }

  return (
    <div className="text-center text-white p-6 bg-opacity-75 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-3xl">
      <h1 className="game-title">Tic Tac Toe</h1>
      <Board squares={board} onClick={handleClick} winLine={winnerInfo.line} />
      <div className="game-info mt-6">
        {winnerInfo.winner ? (
          <p className="text-2xl text-green-400 animate-pulse">
            🏆 Переможець: {winnerInfo.winner === 'X' ? wins.X.name : wins.O.name} ({winnerInfo.winner}) за {moves} ходів!
          </p>
        ) : draw ? (
          <p className="text-2xl text-yellow-300">Нічия!</p>
        ) : (
          <p className="text-xl">Хід: {xIsNext ? `${wins.X.name} (X)` : `${wins.O.name} (O)`}</p>
        )}
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={newGame}
            className="px-6 py-2 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Нова гра
          </button>
          <button
            onClick={resetStats}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
          >
            Скинути статистику
          </button>
        </div>
      </div>

      <div className="mt-6 statistics">
        <p>Статистика перемог:</p>
        <p>
           <span className="highlight">{wins.X.name}: {wins.X.wins}</span>
           <span className="separator">|</span>
           <span className="highlight">{wins.O.name}: {wins.O.wins}</span>
         </p>

      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}
