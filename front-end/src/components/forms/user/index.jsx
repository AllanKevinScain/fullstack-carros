import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "../../text-field";
import { Button } from "../../button";
import { twMerge } from "tailwind-merge";

const userSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  age: yup
    .string()
    .required("Idade é obrigatória")
    .matches(/^[0-9]+$/, "Idade deve conter apenas números"),
});

export const UserForm = (props) => {
  const { values, onSubmit, onCancel, isModal = false } = props;
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (values) reset(values);
  }, [values]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge(
        "w-full max-w-[60vw] bg-white rounded-2xl shadow-md p-6",
        isModal && "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "flex flex-col gap-[24px]"
      )}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Usuário</h2>

      <TextField
        label="Nome"
        id="name"
        control={control}
        placeholder="Digite aqui"
      />
      <TextField
        label="Idade"
        id="age"
        control={control}
        placeholder="Digite aqui"
      />

      <div className="flex items-center justify-between gap-[24px]">
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="p-[10px]"
        >
          Enviar
        </Button>

        <Button
          variant="outline"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="p-[10px]"
          onClick={() => {
            reset();
            onCancel();
          }}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
