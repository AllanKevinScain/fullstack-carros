import { Link } from "react-router";

export const Products = () => {
  return (
    <Link to="/product" className="cursor-pointer">
      {/* <img src="/" className="h-[55px]" /> */}
      <h4 className="text-yellow-400 font-extrabold text-[14px]">Produtos</h4>
    </Link>
  );
};
