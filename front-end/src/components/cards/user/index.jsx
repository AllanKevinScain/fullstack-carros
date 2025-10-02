import { twMerge } from "tailwind-merge";
import { Link } from "react-router";

export const User = (props) => {
  const { name = "Nome não cadastrado", href = "#" } = props;

  return (
    <Link to={href}>
      <div
        className={twMerge(
          "flex flex-col items-center gap-[4px]",
          "p-[24px] bg-neutral-50",
          "rounded-lg border",
          "hover:shadow-2xl"
        )}
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
          alt="Foto user"
          className="object-cover max-w-[200px]"
        />
        <h5 className="text-[20px] font-bold text-yellow-950">{name}</h5>
      </div>
    </Link>
  );
};
