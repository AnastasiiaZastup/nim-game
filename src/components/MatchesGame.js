import React, { useState, useEffect, useCallback } from "react";
import PlayerInfo from "./PlayerInfo";
import ComputerInfo from "./ComputerInfo";
import matchstickImage from "../images/icons8-matches-64.png";
import "./MatchesGame.css";

const MatchesGame = () => {
  const [matchesLeft, setMatchesLeft] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const computerTurn = useCallback(() => {
    const matchesToTake = optimalMove(matchesLeft);
    setMatchesLeft(matchesLeft - matchesToTake);
    setComputerMatches(computerMatches + matchesToTake);
    setIsPlayerTurn(true);
  }, [matchesLeft, computerMatches]);

  useEffect(() => {
    if (!isPlayerTurn && matchesLeft > 0) {
      const timer = setTimeout(() => {
        computerTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, matchesLeft, computerTurn]);

  const takeMatches = (numMatches) => {
    if (isPlayerTurn && matchesLeft - numMatches >= 0) {
      setMatchesLeft(matchesLeft - numMatches);
      setPlayerMatches(playerMatches + numMatches);
      setIsPlayerTurn(false);
    }
  };

  const optimalMove = (matchesLeft) => {
    if (matchesLeft <= 0) return 0;
    const maxTake = Math.min(3, matchesLeft);
    const remainder = matchesLeft % 4;

    if (remainder === 0) {
      return maxTake;
    } else {
      return Math.min(remainder, maxTake);
    }
  };

  const checkWinner = () => {
    if (matchesLeft === 0) {
      const playerEven = playerMatches % 2 === 0;
      const computerEven = computerMatches % 2 === 0;
      return playerEven === computerEven
        ? "A draw!"
        : playerEven
        ? "The player won! 🎉"
        : "The computer won! 🤖";
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
      <p>There are no matches left:</p>
      <div className="matches-container">
        {[...Array(matchesLeft)].map((_, index) => (
          <img key={index} src={matchstickImage} alt="Match" />
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
            <p className="computer-turn">The computer thinks... 🤖</p>
          )}
        </div>
      ) : (
        <div>
          <h2>{checkWinner()}</h2>
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
    </div>
  );
};

export default MatchesGame;
