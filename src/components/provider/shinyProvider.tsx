import React, { createContext, useContext, useEffect, useState } from "react";

const ShinyContext = createContext<{ shiny: string; setShiny: (shiny: string) => void; }>({
    shiny: "shiny",
    setShiny: () => { },
});

export function ShinyProvider({ children }: { children: React.ReactNode }) {
    const [shiny, setShinyState] = useState(() => {
        const savedShiny = localStorage.getItem("shiny");
        return savedShiny || "shiny";
    });

    const setShiny = (newShiny: string) => {
        setShinyState(newShiny);
        localStorage.setItem("shiny", newShiny);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-shiny", shiny);
    }, [shiny]);

    return (
        <ShinyContext.Provider value={{ shiny, setShiny }}>
            {children}
        </ShinyContext.Provider>
    );
}

export function useShiny() {
    return useContext(ShinyContext);
}
