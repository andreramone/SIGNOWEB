import styled from "styled-components";

export const Wrapper = styled.div`

  a {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-flow: column;
    gap: 20px;
    transition: 0.2s;
    
    text-decoration: none;
    color: #000;

    &:hover {
      transform: scale(1.01);
    }
  }
`;

export const PollName = styled.div`
  font-weight: 700;
  text-transform: uppercase;
`;

export const PollFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  > div {
    font-size: 0.9rem;
    background: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
  }
`;
