import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "../../../components";
import { FaTruckLoading } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useDialogToggle, useProducts } from "../../../hooks";

export const ProductsPage = () => {
  const { listProducts, createProduct } = useProducts();
  const productDialog = useDialogToggle();

  const [products, setProducts] = useState([]);
  const [laoding, setLoading] = useState(true);

  async function onListProducts() {
    try {
      const response = await listProducts();
      setProducts(response);
    } catch (error) {
      console.log("🚀 ~ listProducts ~ error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(values) {
    await createProduct(values).then(() => {
      onListProducts();
      productDialog.close();
    });
  }

  useEffect(() => {
    onListProducts();
  }, []);

  if (laoding) {
    return (
      <Container
        className={twMerge("flex items-center justify-center", "h-[500px]")}
      >
        <FaTruckLoading className="animate-spin" size={30} />
      </Container>
    );
  }

  return (
    <>
      <dialog
        ref={productDialog.ref}
        className={twMerge(
          "rounded-2xl backdrop:bg-black/50 p-0 border-0",
          "relative"
        )}
      >
        <Form.product
          onCancel={productDialog.close}
          onSubmit={handleCreate}
          values={{
            // name: "",
            // trade: "",
            // model: "",
            // year: "",
            // price: "",
            // specifications: "",
            // thumb: "",
            name: "Corolla",
            trade: "Toyota",
            model: "Altis Hybrid",
            year: "2023",
            price: "181.990",
            specifications:
              "Automático CVT,Híbrido (Gasolina/Elétrico),Controle de tração e estabilidade,Central multimídia 9,7 airbags",
            thumb:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDp2M_dFTVduAK-iKALpeDSdfBxaxS8eMI3g&s",
          }}
          isModal
        />
      </dialog>

      {products.length === 0 ? (
        <Container
          className={twMerge("flex items-center justify-center", "h-[500px]")}
        >
          <div className="flex justify-between items-center gap-[12px]">
            <h1>Não há nenhum produto cadsatrado!</h1>
            <Button className="w-fit p-[10px]" onClick={productDialog.open}>
              Novo
            </Button>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="flex justify-between items-center gap-[12px]">
            <h1>Products</h1>
            <Button className="w-fit p-[10px]" onClick={productDialog.open}>
              Novo
            </Button>
          </div>
          <section
            className={twMerge(
              "grid grid-cols-1 gap-[32px]",
              "md:grid-cols-2",
              "lg:grid-cols-3"
            )}
          >
            {products.map((product, index) => {
              const { id: _, ...restProduct } = product;
              return (
                <Card.product
                  key={index}
                  href={`${product.id}`}
                  {...restProduct}
                />
              );
            })}
          </section>
        </Container>
      )}
    </>
  );
};
