import React, { useState } from "react";
import Game from "./components/Game";
import './App.css';

export default function App() {
  const [players, setPlayers] = useState({ playerX: "", playerO: "" });
  const [gameStarted, setGameStarted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startGame = () => {
    if (players.playerX && players.playerO) {
      setGameStarted(true);
    } else {
      alert("Будь ласка, введіть імена обох гравців!");
    }
  };

  return (
    <div className="game-container">
      {!gameStarted ? (
        <div>
          <h1 className="game-title">Tic Tac Toe</h1>
          <input
            type="text"
            name="playerX"
            placeholder="Ім'я гравця X"
            className="input-player"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="playerO"
            placeholder="Ім'я гравця O"
            className="input-player"
            onChange={handleInputChange}
          />
          <button className="btn" onClick={startGame}>Почати гру</button>
        </div>
      ) : (
        <Game playerX={players.playerX} playerO={players.playerO} />
      )}
    </div>
  );
}
