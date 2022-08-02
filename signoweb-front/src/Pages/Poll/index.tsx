import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Components/PrimaryButton";
import api from "../../services/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PollWrapper,
  PollOptions,
  OptionsWrapper,
  OptionName,
  PollTitle,
  Actions,
  Header,
  OptionVote,
  InfoWrapper,
  OptionPercentage,
} from "./style";

interface IOption {
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
  options: IOption[];
}

const Poll: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const [poll, setPoll] = useState<IPoll>();
  const { poll_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [deletePoll, setDeletePoll] = useState(false);


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
  
  const notify = (message: string) => {
    toast(message, {
      position: "top-center",
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  useEffect(() => {
    api
      .get(`/poll/${poll_id}`)
      .then((res: AxiosResponse) => {
        setPoll(res.data);

        const totalVotes = res.data.options.reduce((acc: any, curr: any) => {
          return acc + curr.votes;
        }, 0);

        setVotes(totalVotes);

        if (
          new Date(res.data.start) < new Date() &&
          new Date(res.data.end) > new Date()
        ) {
          setDisabledBtn(false);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        navigate("/");
      });
  }, [navigate, poll_id]);

  const onSubmit = (data: any) => {
    api
      .post(`/poll/${poll_id}/${data.option}/vote`)
      .then((res: AxiosResponse) => {
        notify("Voto computado!");
        setPoll(res.data);

        const totalVotes = res.data.options.reduce((acc: any, curr: any) => {
          return acc + curr.votes;
        }, 0);

        setVotes(totalVotes);
      })
      .catch((err: AxiosError) => {
        notifyError(
          "Ocorreu um erro no voto."
        );
        console.log(err.response?.data);
      });
  };

  const handleDelete = (poll_id: number) => {
    if (deletePoll) {
      api
        .delete(`/poll/${poll_id}`)
        .then((res: AxiosResponse) => {
          navigate("/");
        })
        .catch((err: AxiosError) => {
          setDeletePoll(false);
          notifyError(
            "Ocorreu um erro ao apagar."
          );
          console.log(err.response?.data);
        });
    } else {
      setDeletePoll(true);
    }
  };

  return (
    <>
      <ToastContainer />

      <PollWrapper>
        <Link to="/"><u>Voltar</u></Link>

        <Header>
          <PollTitle>{poll?.title}</PollTitle>

          <Actions>
            <PrimaryButton onClick={() => handleDelete(Number(poll_id))}>
              {deletePoll ? `Confirmar` : "Apagar"}
            </PrimaryButton>

            <Link to={`/edit/${poll_id}`}>
              <PrimaryButton>Editar</PrimaryButton>
            </Link>
          </Actions>
        </Header>

        <InfoWrapper>
          <div>
            Inicio - 
            <span>
              {poll && format(new Date(poll.start), "H:mm - dd/MM/yy")}
            </span>
          </div>

          <div>
            Fim - 
            <span>
              {poll && format(new Date(poll.end), "H:mm - dd/MM/yy")}
            </span>
          </div>

          <div>
            {poll && new Date(poll.start) > new Date() && <div style={{color: soon.color}}>{soon.name}</div> }

            {poll && new Date(poll.end) < new Date() &&  <div style={{color: finished.color}}>{finished.name}</div>}

            {poll &&
              new Date(poll.start) < new Date() &&
              new Date(poll.end) > new Date() &&
              <div style={{color: active.color}}>{active.name}</div>}
          </div>
        </InfoWrapper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <OptionsWrapper>
            {poll?.options.map((option: IOption) => (
              <PollOptions
                key={Number(option.id)}
                style={{ cursor: disabledBtn ? "not-allowed" : "pointer" }}
              >
                <OptionName>{option.title}</OptionName>
                <OptionVote>
                  <span>{String(option.votes)} votos</span>

                  <input
                    type="radio"
                    {...register("option", {
                      required: {
                        value: true,
                        message: "Escolha as alternativas.",
                      },
                    })}
                    value={String(option.id)}
                    id={String(option.id)}
                    disabled={disabledBtn}
                  />
                </OptionVote>

                <OptionPercentage
                  value={(100 * Number(option.votes)) / votes}
                />
              </PollOptions>
            ))}
          </OptionsWrapper>

          <PrimaryButton
            disabled={disabledBtn}
            style={{ cursor: disabledBtn ? "not-allowed" : "pointer" }}
          >
            Votar
          </PrimaryButton>
        </form>
      </PollWrapper>
    </>
  );
};

export default Poll;
