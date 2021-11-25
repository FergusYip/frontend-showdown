import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageMargins = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="p-8 w-full max-w-screen-md">{children}</div>
    </div>
  );
};

export default PageMargins;
