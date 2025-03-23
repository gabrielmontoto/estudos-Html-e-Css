import { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  const themeCtx = useTheme();

  return (
    <div
      className={`w-full h-full ${
        themeCtx?.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-500 text-black"
      }`}
    >
      <div className="container mx-auto">{children}</div>
    </div>
  );
};
