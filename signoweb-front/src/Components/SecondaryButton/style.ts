import styled from "styled-components";

export const Wrapper = styled.div``;

export const Button = styled.button`
  /* margin-top: 30px; */
  width: 100%;
  border-radius: 4px;
  padding: 15px;
  border: none;
  font-size: 0.9rem;
  background: #f3f3f3;
  color: #000;
  transition: 0.2s;

  &:hover {
    background: #FFFF;
  }

  &:disabled {
    background: #959595;
  }
`;
