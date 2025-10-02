import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const TextField = (props) => {
  const { label, id, control, ...restProps } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        const hasError = !!error?.message;

        return (
          <div className="flex flex-col gap-2 w-full">
            {label && (
              <label
                htmlFor={id}
                aria-disabled={restProps.disabled}
                className={twMerge(
                  "block text-black font-bold",
                  restProps.disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            <input
              {...field}
              id={id}
              className={twMerge(
                "w-full px-3 py-2",
                "focus:outline-none focus:ring-2",
                "text-black",
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300 focus:ring-yellow-500",
                "border rounded-lg",
                "placeholder-neutral-500",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              {...restProps}
            />
            {hasError && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};
