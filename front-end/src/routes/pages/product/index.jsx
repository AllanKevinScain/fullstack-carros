import { useNavigate, useParams } from "react-router";
import { Button, Container, Form } from "../../../components";
import { useEffect, useState } from "react";
import { FaTruckLoading } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useProducts } from "../../../hooks";

export const ProductPage = () => {
  const { productId } = useParams();
  const router = useNavigate();

  const { getProductById, putProduct, deleteProduct } = useProducts();

  const [product, setProduct] = useState({
    name: "",
    trade: "",
    model: "",
    year: "",
    price: "",
    specifications: "",
    thumb: "",
  });
  const [loading, setLoading] = useState(true);

  async function onGetProduct() {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.log("🚀 ~ onGetProduct ~ error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePut(values) {
    await putProduct(values).then(() => router("/product"));
  }

  async function handleDelete() {
    await deleteProduct(productId).then(() => router("/product"));
  }

  useEffect(() => {
    onGetProduct();
  }, []);

  if (loading) {
    return (
      <Container
        className={twMerge("flex items-center justify-center", "h-[500px]")}
      >
        <FaTruckLoading className="animate-spin" size={30} />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col items-center gap-[24px]">
      <Form.product
        onSubmit={handlePut}
        values={product}
        onCancel={() => router("/product")}
      />
      <Button
        variant="ghost"
        className="max-w-[60vw] p-[10px] bg-neutral-400 text-black"
        onClick={handleDelete}
      >
        Excluir
      </Button>
    </Container>
  );
};
