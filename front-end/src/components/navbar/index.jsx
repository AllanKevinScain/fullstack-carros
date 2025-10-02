import { twMerge } from "tailwind-merge";
import { Logo } from "./logo";
import { Container } from "../container";
import { Products } from "./products";
import { Users } from "./users";
import { Search } from "./search";

export const Navbar = (props) => {
  return (
    <nav className="bg-yellow-950 p-[14px] h-[110px]">
      <Container className={twMerge("flex justify-between items-center")}>
        <div className="flex items-center gap-[14px]">
          <Logo />
        </div>

        <div className="flex items-center gap-[14px]">
          <Search />
          <Products />
          <Users />
        </div>
      </Container>
    </nav>
  );
};
