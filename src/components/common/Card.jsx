import React from 'react';
import styled, { css } from 'styled-components';

const POKEBALL_SRC = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxcwMDuiAAtkfKc9otS5t4CEJ4aCKQwPqGQ&usqp=CAU';

const flipFront = css`
  z-index: 0;
  transform: rotateY(180deg);
`;
const flipBack = css`
  transform: rotateY(0);
`;
const Front = styled.div`
  ${(props) => props.isOpen && flipFront}
`;
const Back = styled.div`
  transform: rotateY(180deg);
  ${(props) => props.isOpen && flipBack}
`;

const CardContainer = styled.div`
  user-select: none;
  display: flex;
  width: calc(22% - 10px);
  box-sizing: border-box;
  padding: 5px;
  position: relative;
  border-radius: 5px;
  ${Front}, ${Back} {
    cursor: pointer;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    backface-visibility: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

function Card(props) {
  const {
    open, src, onClick, indexes, showAllCards,
  } = props;
  const isOpen = open || showAllCards;
  return (
    <CardContainer onClick={() => onClick(indexes)}>
      <Back isOpen={isOpen}>
        <img src={src} alt="" />
      </Back>
      <Front isOpen={isOpen}>
        <img src={POKEBALL_SRC} alt="" />
      </Front>
    </CardContainer>
  );
}

export default React.memo(Card);
