import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import images from "../images";
import Card from "./common/Card";
import { shuffle } from "../utils";
import {
  CLEAR_PLAYER,
  SET_GAME_FINISHED,
  SET_SCORE,
} from "../redux/actions/types";
import Button from "./common/Button";

const SIZE = 4;
const PREVIEW_TIMEOUT = 5000;
const MAX_SCORE = 100;
const BEST_POSSIBLE_TIME = 10;
const CLOSE_DELAY = 500;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(23% - 10px);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PageTitle = styled.h3`
  margin: auto;
  text-align: center;
  font-size: 14px;
`;

const Header = styled.div`
  display: flex;
  height: 35px;
  width: 100%;
  margin-bottom: 20px;
`;

const isEqualCards = (cardA, cardB) => {
  return cardA.src === cardB.src;
};

const initGame = () => {
  const shuffledImages = shuffle(images.concat(images));
  let index = shuffledImages.length;

  return Array(SIZE)
    .fill(0)
    .map((_, i) => {
      return Array(SIZE)
        .fill(0)
        .map((_, j) => ({
          key: index,
          src: shuffledImages[--index],
          indexes: [i, j],
          open: false,
        }));
    });
};

function Board(props) {
  const { player } = props;
  const [openCard, setOpenCard] = useState(null);
  const [config, setConfig] = useState([]);
  const [isDisabledBoard, setIsDisabledBoard] = useState(false);
  const [showAllCards, setShowAllCards] = useState(true);
  const [timer, setTimer] = useState(5);
  const [gameStart, setGameStart] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setConfig(initGame());
  }, []);

  useEffect(() => {
    let interval = setInterval(() => setTimer((t) => t - 1), 1000);
    let timeoutId = setTimeout(() => {
      setShowAllCards(false);
      setGameStart(new Date().getTime());
      clearInterval(interval);
    }, PREVIEW_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  const isGameFinished = () => {
    return config.flat().every((card) => card.open);
  };

  const handleFinishGame = () => {
    const gameDuration = (new Date().getTime() - gameStart) / 1000;
    const score =
      MAX_SCORE + BEST_POSSIBLE_TIME - gameDuration > 0
        ? MAX_SCORE + BEST_POSSIBLE_TIME - gameDuration
        : 0;

    dispatch({
      type: SET_SCORE,
      payload: {
        player,
        score: Math.floor(score),
        date: new Date().toLocaleString(),
        gameDuration,
      },
    });

    setTimeout(() => dispatch({ type: SET_GAME_FINISHED, payload: {score: Math.floor(score), duration: gameDuration} }), 300);
  };

  const handleClick = ([i, j]) => {
    const clickedCard = config[i][j];

    if (clickedCard.open || isDisabledBoard || showAllCards) {
      return;
    }

    let updatedConfig = config.slice();
    const card = updatedConfig[i][j];

    updatedConfig[i][j] = {
      ...card,
      open: !card.open,
    };

    if (openCard) {
      if (!isEqualCards(clickedCard, openCard)) {
        setIsDisabledBoard(true);
        setTimeout(() => {
          updatedConfig[i][j] = {
            ...card,
            open: false,
          };

          const [x, y] = openCard.indexes;

          updatedConfig[x][y] = {
            ...updatedConfig[x][y],
            open: false,
          };

          setOpenCard(null);
          setConfig(updatedConfig);
          setIsDisabledBoard(false);
        }, CLOSE_DELAY);
      } else {
        setOpenCard(null);
      }
    } else {
      setOpenCard(clickedCard);
    }

    setConfig(updatedConfig);

    if (isGameFinished()) {
      handleFinishGame();
    }
  };

  return (
    <Container>
      <Header>
        <Button text="reset game" onClick={() => dispatch({ type: CLEAR_PLAYER })} />
        {showAllCards && (
          <PageTitle>You have {timer} seconds to remember all cards!</PageTitle>
        )}
      </Header>

      <Column>
        {config.map((row, i) => {
          return (
            <Row key={i}>
              {row.map((props) => {
                return (
                  <Card
                    {...props}
                    onClick={handleClick}
                    showAllCards={showAllCards}
                  />
                );
              })}
            </Row>
          );
        })}
      </Column>
    </Container>
  );
}

export default Board;
