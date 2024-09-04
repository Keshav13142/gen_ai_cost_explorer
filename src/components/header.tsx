import { useTheme } from "@/hooks/use-theme";
import { Bot, Moon, Sun } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Link } from "@tanstack/react-router";

function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center">
          <Bot className="mr-3" />
          <span className="text-xl font-bold">Gen-AI Cost Explorer</span>
        </div>
      </Link>
      <Toggle
        variant="outline"
        size="sm"
        aria-label="Toggle theme"
        defaultPressed={theme === "dark"}
        onPressedChange={(v) => {
          setTheme(v ? "dark" : "light");
        }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Toggle>
    </header>
  );
}

export default Header;
