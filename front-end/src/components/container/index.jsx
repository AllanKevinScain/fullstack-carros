import { twMerge } from "tailwind-merge";

export const Container = (props) => {
  const { children, className = "" } = props;
  return (
    <div
      className={twMerge(
        "mx-auto max-w-7xl px-4 mt-[24px] mb-[10%]",
        "sm:px-6",
        "lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};
