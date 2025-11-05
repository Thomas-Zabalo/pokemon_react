import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";

const ThemeContext = createContext<{ theme: string, setTheme: (theme: string) => void }>({
    theme: "light",
    setTheme: () => {
    },
});

export function ThemeProvider({children}: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
    });

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}
