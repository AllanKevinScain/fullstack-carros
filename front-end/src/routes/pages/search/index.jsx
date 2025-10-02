import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Container, TextField } from "../../../components";
import { useProducts } from "../../../hooks";
import { FaTruckLoading } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const SearchPage = () => {
  const { listProducts } = useProducts();
  const { control, handleSubmit } = useForm({
    defaultValues: { name: "", tarde: "", model: "" },
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleSearch(data) {
    try {
      const params = new URLSearchParams(data).toString();
      const res = await listProducts(params);
      console.log("🚀 ~ handleSearch ~ res:", res);
      setResults(res);
    } catch (err) {
      console.error("Erro ao buscar carros:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function onSearch() {
    try {
      const res = await listProducts();
      setResults(res);
    } catch (err) {
      console.error("Erro ao buscar carros:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <Container>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Pesquisar Carros
      </h1>

      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex items-end gap-[24px]"
      >
        <TextField
          id="name"
          control={control}
          label="Nome"
          placeholder="Ex: Compass"
        />
        <TextField
          id="trade"
          control={control}
          label="Marca"
          placeholder="Ex: Jeep"
        />
        <TextField
          id="model"
          control={control}
          label="Modelo"
          placeholder="Ex: Limited T270"
        />

        <Button type="submit" isLoading={loading} className="w-fit p-[10px]">
          Pesquisar
        </Button>
      </form>

      <div className="mt-8 w-full max-w-2xl">
        {loading && (
          <div className="w-full felx justify-center items-center">
            <FaTruckLoading className="animate-spin" size={30} />
          </div>
        )}

        {!loading && results.length > 0 && (
          <section className={twMerge("grid grid-cols-2 gap-[32px]")}>
            {results.map((product, index) => {
              const { id: _, ...restProduct } = product;
              return (
                <Card.product
                  key={index}
                  href={`/product/${product.id}`}
                  {...restProduct}
                />
              );
            })}
          </section>
        )}

        {!loading && results.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </Container>
  );
};
