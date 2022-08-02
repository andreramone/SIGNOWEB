import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  flex-direction:column;
  gap: 30px;
  height: 100vh;
  background: linear-gradient(6deg, #EE7752, #E73C7E, #23A6D5);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;

  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 550px) {
    width: min-content;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  padding: 10px;
  margin-bottom: 100px;
`;

export const PollHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
