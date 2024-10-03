import React, { useState } from "react";
import PlayerInfo from "./PlayerInfo";
import ComputerInfo from "./ComputerInfo";

const MatchesGame = () => {
  const [matchesLeft, setMatchesLeft] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const takeMatches = (numMatches) => {
    if (matchesLeft - numMatches >= 0) {
      setMatchesLeft(matchesLeft - numMatches);
      if (isPlayerTurn) {
        setPlayerMatches(playerMatches + numMatches);
        setIsPlayerTurn(false);
        setTimeout(computerTurn, 1000); // Хід комп'ютера через 1 секунду
      }
    }
  };

  const computerTurn = () => {
    const matchesToTake = optimalMove(matchesLeft);
    setMatchesLeft(matchesLeft - matchesToTake);
    setComputerMatches(computerMatches + matchesToTake);
    setIsPlayerTurn(true);
  };

  const optimalMove = (matchesLeft) => {
    const remainder = matchesLeft % 4;
    return remainder === 0 ? 3 : remainder;
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Matches Game</h1>
      <p>Matches left: {matchesLeft} 🔥</p>
      <PlayerInfo matches={playerMatches} />
      <ComputerInfo matches={computerMatches} />
      {matchesLeft > 0 ? (
        <div>
          {isPlayerTurn ? (
            <div>
              <button onClick={() => takeMatches(1)}>Take 1 🔥</button>
              <button onClick={() => takeMatches(2)}>Take 2 🔥🔥</button>
              <button onClick={() => takeMatches(3)}>Take 3 🔥🔥🔥</button>
            </div>
          ) : (
            <p>Computer is thinking... 🤖</p>
          )}
        </div>
      ) : (
        <h2>{checkWinner()}</h2>
      )}
    </div>
  );
};

export default MatchesGame;
