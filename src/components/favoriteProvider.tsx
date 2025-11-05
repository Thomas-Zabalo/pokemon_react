import { createContext, useContext, useState } from "react";
import * as React from "react";

const FavoriteContext = createContext<{ favorites: string[], toggleFavorite: (id: string) => void }>({
    favorites: [],
    toggleFavorite: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (id: string) => {
        setFavorites(prev => {
            let newFavs;
            if (prev.includes(id)) {
                newFavs = prev.filter(f => f !== id);
            } else {
                newFavs = [...prev, id];
            }
            localStorage.setItem("favorites", JSON.stringify(newFavs));
            return newFavs;
        });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoriteContext);
}
