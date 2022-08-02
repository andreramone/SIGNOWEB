import styled from "styled-components";
import { Wrapper as Input } from "../../Components/Input/style";

export const Wrapper = styled.div`
  padding: 100px 0;
  background: linear-gradient(200deg, #EE7752, #E73C7E, #23A6D5);
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: inherit;
    font-weight: 800;
  }
`;

export const PageTitle = styled.h1`
  margin: 40px 0;
`;

export const ItemOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: fit-content

  ${Input} {
    flex: 1;
    margin: 10px 0;
    
  }
`;
