/* eslint-disable no-return-assign */
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import React from 'react';
import styled from 'styled-components';
import { RESTART_GAME, CLEAR_PLAYER } from '../redux/actions/types';
import Button from './common/Button';

const Table = styled(DataTable)`
  width: 100%;
`;

const Container = styled.div`
  @media (min-width: 425px) {
    width: 100%;
  }

  Button {
    margin-right: 10px;
    width: 150px;
  }
`;

const getScore = (state) => state.score.results;

const columns = [
  {
    name: 'Player',
    selector: 'player',
  },
  {
    name: 'Played at',
    selector: 'date',
    sortable: true,
  },
  {
    name: 'Score',
    selector: 'score',
    sortable: true,
  },
];

function ScoreBoard() {
  const dispatch = useDispatch();
  const scoreData = Object.values(useSelector(getScore));
  let data = [];

  scoreData.forEach((game) => (data = data.concat(game)));

  return (
    <Container>
      <Button
        onClick={() => dispatch({ type: RESTART_GAME })}
        text="restart game"
      />
      <Button
        onClick={() => dispatch({ type: CLEAR_PLAYER })}
        text="reset game"
      />
      <Table title="Game Score" columns={columns} data={data} />
    </Container>
  );
}

export default ScoreBoard;
