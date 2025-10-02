import { twMerge } from "tailwind-merge";
import { FaCalendar, FaTag } from "react-icons/fa";

import colors from "tailwindcss/colors";
import { Link } from "react-router";
import { currencyFormatterForFixValues } from "../../../helpers";
import { Button } from "../../button";

export const Product = (props) => {
  const {
    name = "Nome não cadastrado",
    price = 0,
    thumb = "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
    href = "#",
    trade = "Tipo não cadastrado",
    year = new Date(),
    model = "Modelo não cadastrado",
  } = props;

  const carYear = new Date(year);

  return (
    <Link to={href}>
      <div
        className={twMerge(
          "flex flex-col gap-[4px]",
          "p-[24px] bg-neutral-50",
          "rounded-lg border",
          "hover:shadow-2xl"
        )}
      >
        <h5 className="text-[20px] font-bold text-yellow-950">{name}</h5>
        <span className="text-[14px] font-bold text-gray-400">{model}</span>
        <div
          className={twMerge("flex items-center justify-center", "h-[200px]")}
        >
          <img
            src={thumb}
            alt={name}
            className={twMerge("max-h-[200px]", "object-contain")}
          />
        </div>

        <div className="flex justify-between overflow-hidden">
          <div className="flex items-center gap-[4px]">
            <FaTag color={colors.gray[400]} />
            <span className="text-[14px] font-bold text-gray-400">{trade}</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <FaCalendar color={colors.gray[400]} />
            <span className="text-[14px] font-bold text-gray-400">
              {carYear.toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div
          className={twMerge(
            "flex flex-col gap-[12px] items-center",
            "lg:flex-row"
          )}
        >
          <div className="flex flex-col w-full">
            <span className="text-[20px] font-bold text-yellow-950">
              {currencyFormatterForFixValues({
                value: price,
                qtyDecimal: 2,
                showR$: true,
              })}
            </span>
            <span
              className={twMerge(
                "text-[14px] font-bold text-gray-400 underline",
                "text-nowrap"
              )}
            >
              {trade}, {carYear.toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
