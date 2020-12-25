import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./common/Button";
import { CLEAR_PLAYER, RESTART_GAME, SHOW_SCORE } from "../redux/actions/types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  margin: auto;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  Button {
    margin-top: 10px;
  }
`;

const getResult = (state) => state.game.gameResult;

function Score(props) {
  const dispatch = useDispatch();
  const { score, duration } = useSelector(getResult);

  return (
    <Container>
      <h3>Your Score: {score}</h3>
      <h3>Game duration: {duration}</h3>
      <ButtonContainer>
        <Button
          text="Reset game"
          onClick={() => dispatch({ type: CLEAR_PLAYER })}
        />
        <Button
          text="Restart game"
          onClick={() => dispatch({ type: RESTART_GAME })}
        />
        <Button
          text="Show Result"
          onClick={() => dispatch({ type: SHOW_SCORE })}
        />
      </ButtonContainer>
    </Container>
  );
}

export default Score;
