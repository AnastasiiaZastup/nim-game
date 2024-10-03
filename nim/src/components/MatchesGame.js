import React, { useState } from "react";
import PlayerInfo from "./PlayerInfo";
import ComputerInfo from "./ComputerInfo";
import matchstickImage from "../images/icons8-matches-64.png";
import "./MatchesGame.css";

const MatchesGame = () => {
  const [matchesLeft, setMatchesLeft] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const takeMatches = (numMatches) => {
    // Only allow taking matches if there are enough left
    if (matchesLeft - numMatches >= 0) {
      setMatchesLeft(matchesLeft - numMatches);
      if (isPlayerTurn) {
        setPlayerMatches(playerMatches + numMatches);
        setIsPlayerTurn(false);
        // Trigger computer's turn after a delay
        setTimeout(computerTurn, 1000);
      }
    }
  };

  const computerTurn = () => {
    if (matchesLeft > 0) {
      const matchesToTake = optimalMove(matchesLeft);
      if (matchesToTake > 0) {
        setMatchesLeft(matchesLeft - matchesToTake);
        setComputerMatches(computerMatches + matchesToTake);
      }
      setIsPlayerTurn(true);
    }
  };

  const optimalMove = (matchesLeft) => {
    if (matchesLeft <= 0) return 0;
    const remainder = matchesLeft % 4;
    if (remainder === 0) {
      return Math.min(3, matchesLeft); // Take 3 if possible
    } else {
      return Math.min(remainder, matchesLeft); // Take 1, 2, or 3
    }
  };

  const checkWinner = () => {
    if (matchesLeft === 0) {
      const playerEven = playerMatches % 2 === 0;
      const computerEven = computerMatches % 2 === 0;
      return playerEven === computerEven
        ? "It's a draw!"
        : playerEven
        ? "Player Wins! 🎉"
        : "Computer Wins! 🤖";
    }
    return "";
  };

  const resetGame = () => {
    setMatchesLeft(25);
    setPlayerMatches(0);
    setComputerMatches(0);
    setIsPlayerTurn(true);
  };

  return (
    <div className="matches-game">
      <h1>Matches Game</h1>
      <p>Matches left:</p>
      <div className="matches-container">
        {/* Render matchstick images based on matchesLeft */}
        {[...Array(matchesLeft)].map((_, index) => (
          <img key={index} src={matchstickImage} alt="Matchstick" />
        ))}
      </div>
      <PlayerInfo matches={playerMatches} />
      <ComputerInfo matches={computerMatches} />
      {matchesLeft > 0 ? (
        <div className="button-container">
          {isPlayerTurn ? (
            <>
              <button onClick={() => takeMatches(1)}>Take 1</button>
              <button onClick={() => takeMatches(2)}>Take 2</button>
              <button onClick={() => takeMatches(3)}>Take 3</button>
            </>
          ) : (
            <p className="computer-turn">Computer is thinking... 🤖</p>
          )}
        </div>
      ) : (
        <div>
          <h2>{checkWinner()}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MatchesGame;
