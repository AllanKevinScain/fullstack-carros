import { Link } from "react-router";

export const Users = () => {
  return (
    <Link to="/user" className="cursor-pointer">
      {/* <img src="/" className="h-[55px]" /> */}
      <h4 className="text-yellow-400 font-extrabold text-[14px]">Usuários</h4>
    </Link>
  );
};
