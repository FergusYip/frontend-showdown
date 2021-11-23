import { ButtonHTMLAttributes, Children, DetailedHTMLProps } from "react";

const Button = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button
      className={`bg-indigo-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
