import styled from "styled-components";

export const PollWrapper = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  padding: 100px 0;
  background: linear-gradient(186deg, #EE7752, #E73C7E, #23A6D5);
  display: flex;
  flex-flow: column;
  height: 100vh;
  gap: 30px;

  a {
    font-weight: 800;
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

export const PollTitle = styled.div`
  white-space: pre-wrap;
  overflow-wrap: break-word;
  width: 350px;
  font-size: 1.3rem;
  font-weight: 700;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 5px;

  > div {
    background: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9rem;
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

export const PollOptions = styled.label`
  padding: 20px;
  border-radius: 5px;
  background: #f1f1f1;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

export const OptionName = styled.div`
  width: 450px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const OptionVote = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type PercentageProps = {
  value: number;
};

export const OptionPercentage = styled.div<PercentageProps>`
  position: absolute;
  background: #000;
  opacity: 0.05;
  height: 100%;
  width: ${(props) => props.value}%;
  left: 0;
  top: 0;
  transition: width 0.5s ease-in-out;
`;
