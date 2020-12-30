import React from 'react';
import styled from 'styled-components';

const ButtonBase = styled.button`
  outline: none;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  padding: 5px;
  white-space: nowrap;
  border: 0.125rem solid black;
  background-color: white;
  text-transform: lowercase;
  min-height: 35px;
`;

function Button(props) {
  const { text, onClick, className } = props;
  return (
    <ButtonBase className={className} onClick={onClick}>
      {text}
    </ButtonBase>
  );
}

export default Button;
