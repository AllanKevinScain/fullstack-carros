import { useNavigate, useParams } from "react-router";
import { Button, Container, Form } from "../../../components";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/use-user";
import { FaTruckLoading } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const UserPage = () => {
  const { userId } = useParams();
  const router = useNavigate();

  const { getUserById, putUser, deleteUser } = useUser();

  const [user, setUser] = useState({ name: "", age: "" });
  const [loading, setLoading] = useState(true);

  async function onGetUser() {
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (error) {
      console.log("🚀 ~ listUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePut(values) {
    await putUser(values).then(() => router("/user"));
  }

  async function handleDelete() {
    await deleteUser(userId).then(() => router("/user"));
  }

  useEffect(() => {
    onGetUser();
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
      <Form.user
        onSubmit={handlePut}
        values={user}
        onCancel={() => router("/user")}
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
