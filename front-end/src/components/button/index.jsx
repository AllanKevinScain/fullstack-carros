import { FaTruckLoading } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const Button = (props) => {
  const {
    variant = "solid",
    className,
    disabled = false,
    children,
    isLoading = false,
    ...restprops
  } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(
        "flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "rounded-lg font-medium w-full",
        "transition-colors",
        "cursor-pointer",
        variant === "solid" && "bg-yellow-600 text-white hover:bg-yellow-700",
        variant === "outline" &&
          "border-2 border-yellow-600 bg-transparent text-yellow-600 hover:bg-yellow-50",
        variant === "ghost" &&
          "bg-transparent text-yellow-600 hover:bg-yellow-50",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...restprops}
    >
      {isLoading ? (
        <FaTruckLoading className="animate-spin" size={24} />
      ) : (
        children
      )}
    </button>
  );
};
