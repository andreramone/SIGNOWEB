import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Wrapper, PollName, PollFooter } from "./style";

interface Option {
  id: Number;
  pollId: Number;
  title: String;
  votes: Number;
  created_at: Date;
  updated_at: Date;
}

interface IPoll {
  id: Number;
  title: String;
  start: Date;
  end: Date;
  created_at: Date;
  updated_at: Date;
  options: Option[];
}

interface IPollProps {
  poll: IPoll;
}

const Poll: React.FC<IPollProps> = ({
  poll,  
}: IPollProps) => {

  const soon = {
    name: 'Em breve',
    color: 'blue',
  }

  const finished = {
    name: 'Finalizada',
    color: 'red',
  }

  const active = {
    name: 'Ativa',
    color: 'green'
  }

  return (
    <Wrapper>
      <Link to={`/poll/${poll.id}`}>
        <PollName>{poll.title}</PollName>
        <PollFooter>
          <div> 
              Início: {format(new Date(poll.start), "H:mm - dd/MM/yy")}</div>
          <div>
              Fim: {format(new Date(poll.end), "H:mm - dd/MM/yy")}
          </div>
          <div>
            {new Date(poll.start) > new Date() && <div style={{color: soon.color}}>{soon.name}</div> }
  
            {new Date(poll.end) < new Date() && <div style={{color: finished.color}}>{finished.name}</div> }
  
            {new Date(poll.start) < new Date() &&
              new Date(poll.end) > new Date() &&
              <div style={{color: active.color}}>{active.name}</div>}
          </div>
        </PollFooter>
      </Link>
    </Wrapper>
  );
}

export default Poll;
