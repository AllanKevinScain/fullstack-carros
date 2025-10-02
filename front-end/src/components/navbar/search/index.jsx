import { Link } from "react-router";

export const Search = () => {
  return (
    <Link to="/search" className="cursor-pointer">
      {/* <img src="/" className="h-[55px]" /> */}
      <h4 className="text-yellow-400 font-extrabold text-[14px]">Pesquisa</h4>
    </Link>
  );
};
