import { useTheme } from "../contexts/ThemeContext";

type ButtonProps = {
  label: string;
};

export const Button = ({ label }: ButtonProps) => {
  const themeCtx = useTheme();
  const handleSwitchTheme = () => {
    themeCtx?.setTheme(themeCtx.theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSwitchTheme}
    >
      {label}
    </button>
  );
};
