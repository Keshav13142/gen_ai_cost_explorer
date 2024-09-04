import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

type Theme = "dark" | "light" | "system";

const localTheme = atomWithStorage<Theme>("theme", "system");

export const useTheme = () => {
  const [theme, setTheme] = useAtom(localTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
};
