import React from "react";
import Cross from "./Cross";  // Імпортуємо компонент Cross
import Circle from "./Circle"; // Імпортуємо компонент Circle

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
