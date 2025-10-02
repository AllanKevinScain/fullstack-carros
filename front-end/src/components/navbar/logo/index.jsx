import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export const Logo = () => {
  return (
    <Link to="/" className="cursor-pointer">
      {/* <img src="/" className="h-[55px]" /> */}
      <h3 className="text-yellow-400 font-extrabold text-[24px]">
        Venda de carros
      </h3>
    </Link>
  );
};
