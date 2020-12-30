import React from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import Score from './Score';
import Start from './Start';

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

const getPlayer = (state) => {
  if (!state.player || state.player.player.length === 0) {
    return null;
  }
  return state.player.player;
};

const gameIsFinished = (state) => state.game.gameResult.isFinished;

const getScoreBoard = (state) => state.score.scoreBoard;

function Game() {
  const player = useSelector(getPlayer);
  const gameFinished = useSelector(gameIsFinished);
  const showScoreBoard = useSelector(getScoreBoard);

  const isStartPage = !gameFinished && !player;
  const isGameStarted = !gameFinished && player && !showScoreBoard;
  const isGameFinished = gameFinished && !showScoreBoard;

  return (
    <MainContainer>
      {isStartPage && <Start />}
      {isGameStarted && <Board player={player} />}
      {isGameFinished && <Score />}
      {showScoreBoard && <ScoreBoard />}
    </MainContainer>
  );
}

export default Game;
