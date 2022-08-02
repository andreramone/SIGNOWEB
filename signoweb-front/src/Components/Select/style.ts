import styled from "styled-components";

export const SelectStyle = styled.select`
  background-color: #fff;
  font-size: 20px;
  border: none;
  text-align: center;
  color: #000;
  padding: 8px 20px;
  border-radius: 4px;
  background-color: #FFFF;
  cursor: pointer;

  &:focus {
    border: 1px solid var(--primary-color);
  }
`;
