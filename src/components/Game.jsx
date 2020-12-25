import React from "react";

import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import Score from "./Score";
import Start from "./Start";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 30px;
`;

const getUser = (state) => {
  if (!state.game || state.game.player.length === 0) {
    return null;
  }
  return state.game.player;
};

const gameIsFinished = (state) => {
  return state.game.gameResult.isFinished;
};

const getScoreBoard = (state) => {
  return state.game.scoreBoard;
};

function Game() {
  const player = useSelector(getUser);
  const gameFinished = useSelector(gameIsFinished);
  const showScoreBoard = useSelector(getScoreBoard);

  return (
    <MainContainer>
      {!gameFinished && !player && <Start />}
      {!gameFinished && player && !showScoreBoard && <Board player={player} />}
      {gameFinished && !showScoreBoard && <Score />}
      {showScoreBoard && <ScoreBoard />}
    </MainContainer>
  );
}

export default Game;
