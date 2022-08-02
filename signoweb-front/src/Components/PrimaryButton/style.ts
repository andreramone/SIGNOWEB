import styled from "styled-components";

export const Wrapper = styled.div``;

export const Button = styled.button`
  /* width: 100%; */
  border-radius: 4px;
  padding: 15px;
  border: none;
  font-size: 0.9rem;
  background: #eb9234;
  color: #fff;
  transition: 0.2s;
  
  cursor: pointer;

  &:hover {
    background: orange;
  }

  &:disabled {
    background: grey;
  }
`;