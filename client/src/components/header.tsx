import { useTheme } from "@/hooks/use-theme";
import { Link } from "@tanstack/react-router";
import { Bot, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

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
      <Button
        variant="ghost"
        size="sm"
        aria-label="Toggle theme"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </header>
  );
}

export default Header;
