import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "../../text-field";
import { Button } from "../../button";
import { twMerge } from "tailwind-merge";

const productSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  trade: yup.string().required("Marca é obrigatório"),
  model: yup.string().required("Modelo é obrigatório"),
  price: yup
    .string()
    .required("Preço é obrigatório")
    .matches(/^[0-9.,]+$/, "Deve conter apenas números, ponto ou vírgula"),
  thumb: yup.string().required("Imagem é obrigatório"),
  specifications: yup.string().required("Especificações é obrigatório"),
  year: yup
    .string()
    .required("Ano é obrigatório")
    .matches(/^[0-9]+$/, "Deve conter apenas números"),
});

export const ProductForm = (props) => {
  const { values, onSubmit, onCancel, isModal = false } = props;
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Produto</h2>

      <div className="flex flex-col gap-[24px] overflow-auto max-h-[60vh] px-[4px]">
        <TextField
          label="Nome"
          id="name"
          control={control}
          placeholder="Digite aqui"
        />
        <TextField
          label="Marca"
          id="trade"
          control={control}
          placeholder="Digite aqui"
        />
        <TextField
          label="Modelo"
          id="model"
          control={control}
          placeholder="Digite aqui"
        />
        <TextField
          label="Preço"
          id="price"
          control={control}
          placeholder="Digite aqui"
        />
        <TextField
          label="Ano"
          id="year"
          control={control}
          placeholder="Digite aqui"
        />
        <TextField
          label="Imagem"
          id="thumb"
          control={control}
          placeholder="Digite aqui"
        />
        <TextField
          label="Especificações"
          id="specifications"
          control={control}
          placeholder="Digite aqui"
        />
      </div>

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
