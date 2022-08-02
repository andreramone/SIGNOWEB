import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Wrapper, PageTitle, PollHeader, Container } from "./style";
import Poll from "../../Components/Polls";
import { Link } from "react-router-dom";
import Select from "../../Components/Select";

interface Option {
  id: Number;
  title: String;
  votes: Number;
  pollId: Number;
  created_at: Date;
  updated_at: Date;
}

interface IPoll {
  id: Number;
  title: String;
  start: Date;
  end: Date;
  options: Option[];
  created_at: Date;
  updated_at: Date;
}

const Home: React.FC = () => {

  const [poll, setpoll] = useState<IPoll[]>([]);
  const [pollFiltered, setPollFiltered] = useState<IPoll[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/poll").then((res: AxiosResponse) => {
      setpoll(res.data);
    });
  });

  const filterOnChanged = (e: any) => {
    setFilter(e.target.value);

    switch (e.target.value) {
      case "all":
        setPollFiltered([]);
        break;

      case "end":
        setPollFiltered(
          poll.filter((Poll) => new Date(Poll.end) < new Date())
        );
        break;

      case "active":
        setPollFiltered(
          poll.filter(
            (Poll) =>
              new Date(Poll.end) > new Date() &&
              new Date(Poll.start) < new Date()
          )
        );
        break;

      case "not-initiated":
        setPollFiltered(
          poll.filter((Poll) => new Date(Poll.start) > new Date())
        );
        break;
    }
  };

  return (
    <>
      <Wrapper>
        <PollHeader>
        <PageTitle>Seja Bem vindo!</PageTitle>
        <PageTitle>Para começar, crie sua enquete clicando abaixo:</PageTitle>

          <Link to="/create" style={{ textDecoration: 'inherit', color: '#E73C7', fontWeight: '800'}}><u>Crie sua Enquete</u></Link>
        </PollHeader>
      <Container>
        <Select onChange={(e) => filterOnChanged(e)}>
          <option value="all">Todas enquetes</option>
          <option value="active">Enquetes ativas</option>
          <option value="end">Enquetes finalizadas</option>
          <option value="not-initiated">Enquetes Não iniciadas</option>
        </Select>

        {filter === "all"
          ? poll.map((poll: IPoll) => (
              <Poll poll={poll} key={String(poll.id)} />
            ))
          : pollFiltered.map((poll: IPoll) => (
              <Poll poll={poll} key={String(poll.id)} />
            ))}
      </Container>
      </Wrapper>
    </>
  );
};

export default Home;