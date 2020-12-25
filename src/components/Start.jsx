import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./common/Button";
import Select from "./common/Select";
import styled from "styled-components";
import { SET_PLAYER } from "../redux/actions/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;

  Button {
    width: 250px;
    margin-top: 25px;
  }
`;

const getUsers = (state) => state.game.players;

function Start() {
  const dispatch = useDispatch();
  const players = useSelector(getUsers);
  const [userName, setUserName] = useState("");

  const startGame = () => {
    if (!players[userName]) {
      players[userName] = userName;
    }

    dispatch({
      type: SET_PLAYER,
      payload: {
        players,
        player: userName,
      },
    });
  };

  return (
    <Container>
      <Select
        onChange={(value) => value && value.value && setUserName(value.value)}
        players={players}
        value={userName}
      />
      <Button text="Start" onClick={startGame} />
    </Container>
  );
}

export default Start;
