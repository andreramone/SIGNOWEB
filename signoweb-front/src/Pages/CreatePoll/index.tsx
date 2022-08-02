import React from "react";
import api from "../../services/api";
import { Wrapper, PageTitle, OptionItem } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../Components/Input";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";
import CloseButton from "../../Components/CloseButton";



const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "poll.options",
  });

  const addOption = (e: any) => {
    e.preventDefault();

    if (fields.length < 20) {
      append({});
    }
  };

  const removeOption = (e: any, index: number) => {
    e.preventDefault();

    remove(index);
  };

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

  const submit = (data: any) => {
    debugger;
    if (fields.length >= 3) {
      api
        .post("/poll", {
          title: data.poll.title,
          start: data.poll.start,
          end: data.poll.end,
          options: data.poll.options,
        })
        .then((res: AxiosResponse) => {
          notify("Sucesso!");
          navigate('/')
        })
        .catch((err: AxiosError) => {
          console.log(err);
          notifyError("Erro.");
        });
    } else {
      notifyError(
        "Adicione ao menos 3 opções para a enquete."
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <Wrapper>
        <Link to="/" style={{ textDecoration: 'inherit', color: '#E73C7', fontWeight: '800'}}><u>Voltar</u></Link>

        <PageTitle>Crie sua enquete:</PageTitle>

        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label>Título:</label>
            <Input
              type="text"
              {...register("poll.title", {
                required: {
                  value: true,
                  message: "Campo obrigatório.",
                },
              })}
            />
          </div>

          <div>
            <label>Data de início:</label>
            <Input
              type="datetime-local"
              {...register("poll.start", {
                required: {
                  value: true,
                  message: "Campo obrigatório.",
                },
              })}
            />
          </div>

          <div>
            <label>Data do Fim:</label>
            <Input
              type="datetime-local"
              {...register("poll.end", {
                required: {
                  value: true,
                  message: "Campo obrigatório.",
                },
              })}
            />

          </div>

          <div>
            <SecondaryButton
              onClick={(e) => addOption(e)}
              disabled={fields.length >= 20 ? true : false}
            >
              Criar opção
            </SecondaryButton>
            {fields.map((field, index) => (
              <>
                <OptionItem key={field.id}>
                  <Input
                    type="text"
                    {...register(`poll.options.${index}.title`, {
                      required: true,
                    })}
                  />

                  <CloseButton onClick={(e) => removeOption(e, index)}>
                    Excluir
                  </CloseButton>
                </OptionItem>
              </>
            ))}
          </div>
          <PrimaryButton>Criar</PrimaryButton>
        </form>
      </Wrapper>
    </>
  );
};

export default CreatePoll;
