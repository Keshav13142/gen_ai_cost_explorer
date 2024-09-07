import { useTheme } from "@/hooks/use-theme";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
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
      <div className="flex itecells-center gap-2">
        <Button
          variant="ghost"
          aria-label="Toggle theme"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
          size="icon"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            window.open(
              "https://github.com/Keshav13142/gen_ai_cost_explorer",
              "_blank"
            )
          }
          size="icon"
        >
          <a
            href="https://github.com/Keshav13142/gen_ai_cost_explorer"
            target="_blank"
          >
            <GitHubLogoIcon className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </header>
  );
}

export default Header;
