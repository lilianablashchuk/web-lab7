import React from "react";
import Cross from "./Cross";  
import Circle from "./Circle"; 

export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "winning" : ""}`}
      onClick={onClick}
    >
      {value === "X" && <Cross />}
      {value === "O" && <Circle />}
    </button>
  );
}
