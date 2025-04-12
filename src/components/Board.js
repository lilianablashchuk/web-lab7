import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick, winLine }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onClick(i)} isWinning={winLine.includes(i)} />;
  }

  return (
    <div className="board">
      {squares.map((_, i) => renderSquare(i))}
    </div>
  );
}
