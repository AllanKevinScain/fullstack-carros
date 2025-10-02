import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "../../../components";
import { FaTruckLoading } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useUser, useDialogToggle } from "../../../hooks";

export const UsersPage = () => {
  const { createUser, listUsers } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const createDialog = useDialogToggle();

  async function onListUsers() {
    try {
      const response = await listUsers();
      setUsers(response);
    } catch (error) {
      console.log("🚀 ~ listUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(values) {
    await createUser(values).then(() => {
      onListUsers();
      createDialog.close();
    });
  }

  useEffect(() => {
    onListUsers();
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
    <>
      <dialog
        ref={createDialog.ref}
        className={twMerge(
          "rounded-2xl backdrop:bg-black/50 p-0 border-0",
          "relative"
        )}
      >
        <Form.user
          onCancel={createDialog.close}
          onSubmit={handleCreate}
          values={{ age: "", name: "" }}
          isModal
        />
      </dialog>

      {users.length === 0 ? (
        <Container
          className={twMerge("flex items-center justify-center", "h-[500px]")}
        >
          <div className="flex justify-between items-center gap-[12px]">
            <h1>Não há nenhum usuário cadsatrado!</h1>
            <Button className="w-fit p-[10px]" onClick={createDialog.open}>
              Novo
            </Button>
          </div>
        </Container>
      ) : (
        <Container className="flex flex-col gap-[24px]">
          <div className="flex justify-between items-center gap-[12px]">
            <h1>Usuários</h1>
            <Button className="w-fit p-[10px]" onClick={createDialog.open}>
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
            {users.map((user, index) => {
              const { id, name } = user;
              return <Card.user key={index} href={`${id}`} name={name} />;
            })}
          </section>
        </Container>
      )}
    </>
  );
};
