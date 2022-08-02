import styled from "styled-components";
import { Wrapper as Input } from "../../Components/Input/style";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px;
  height: 100vh;
  background: linear-gradient(243deg, #EE7752, #E73C7E, #23A6D5);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;

  form {
    label {
      margin: 10px 0px;
      font-weight: 800;
    }
  }
`;

export const PageTitle = styled.h1`
  margin: 40px 0;
`;

export const OptionItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  ${Input} {
    flex: 1;
    margin: 10px 0;
  }
`;
