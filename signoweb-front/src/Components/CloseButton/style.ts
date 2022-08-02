import styled from "styled-components";

export const Wrapper = styled.div``;

export const Button = styled.button`
  
  border-radius: 4px;
  padding: 12px;
  height: 36px;
  border: none;
  font-size: 0.9rem;
  background: #f3f3f3;
  color: #000;
  transition: 0.2s;

  &:hover {
    background: #e8e8e8;
  }

  &:disabled {
    background: #959595;
  }
`;
