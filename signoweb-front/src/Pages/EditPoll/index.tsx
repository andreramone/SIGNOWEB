import React, { useEffect } from "react";
import api from "../../services/api";
import { Wrapper, PageTitle, ItemOption } from "./style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../Components/Input";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";
import  CloseButton  from "../../Components/CloseButton";

const EditPoll: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "poll.options",
  });

  const { poll_id } = useParams();

  useEffect(() => {
    api
      .get(`/poll/${poll_id}`)
      .then((res: AxiosResponse) => {
        setValue("poll.title", res.data.title);
        setValue("poll.start", res.data.start.replace("Z", ""));
        setValue("poll.end", res.data.end.replace("Z", ""));
        setValue("poll.options", res.data.options);
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        navigate("/");
      });
  }, [navigate, poll_id]);

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

  const onSubmit = (data: any) => {
    if (fields.length >= 3) {
      api
        .post(`/poll/${poll_id}/update`, {
          title: data.poll.title,
          start: data.poll.start,
          end: data.poll.end,
          options: data.poll.options,
        })
        .then((res: AxiosResponse) => {
          notify("Sucesso");
          navigate('/')
        })
        .catch((err: AxiosError) => {
          console.log(err);
          notifyError("erro.");
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
        <Link to="/"><u>Voltar</u></Link>

        <PageTitle>Editar Enquete</PageTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome</label>
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
            <label>Inicio</label>
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
            <label>Terminio</label>
            <Input
              type="datetime-local"
              {...register("poll.end", {
                required: {
                  value: true,
                  message: "campo obrigatório.",
                },
              })}
            />
          </div>

          <div style={{display: 'grid', gap: '20px'}}>
            <SecondaryButton
              onClick={(e) => addOption(e)}
              disabled={fields.length >= 20 ? true : false}
            >
              Adicionar Opção
            </SecondaryButton>
            {fields.map((field, index) => (
              <>
                <ItemOption key={field.id}>
                  <Input
                    type="text"
                    {...register(`poll.options.${index}.title`, {
                      required: true,
                    })}
                  />

                  <CloseButton onClick={(e) => removeOption(e, index)}>
                    Excluir
                  </CloseButton>
                </ItemOption>
              </>
            ))}
          </div>

          <PrimaryButton>Salvar</PrimaryButton>
        </form>
      </Wrapper>
    </>
  );
};

export default EditPoll;
