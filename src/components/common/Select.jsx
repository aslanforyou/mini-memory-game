import React from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";

const SelectContainer = styled.div`
  min-width: 250px;
  color: #555;
`;

const getOptions = (options) => {
  return Object.keys(options).map((option) => ({
    value: option,
    label: option,
  }));
};

function Input(props) {
  const { onChange, players } = props;

  return (
    <SelectContainer>
      <CreatableSelect
        placeholder="Enter your name"
        onChange={onChange}
        options={players && getOptions(players)}
      />
    </SelectContainer>
  );
}
export default Input;
