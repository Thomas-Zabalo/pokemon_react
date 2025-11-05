import { useEffect, useState } from "react";
import { PokemonCard } from "../components/pokemonCard.tsx";
import { useTheme } from "../components/themeProvider.tsx";
import { Footer } from "../components/footer.tsx";

export function PokemonFavorites() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const { theme } = useTheme();
    const textColor = theme === "dark" ? "text-white" : "text-black";

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (!storedFavorites) return;

        const favoriteIds: string[] = JSON.parse(storedFavorites);

        Promise.all(
            favoriteIds.map(id =>
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
            )
        )
        .then(results => setFavorites(results))
        .catch(err => console.error("Erreur:", err));
    }, []);

    if (favorites.length === 0) {
        return <p className={textColor}>Aucun Pokémon favori pour le moment.</p>;
    }

    return (
        <>
            <h1 className={`py-5 justify-center text-3xl lg:text-6xl font-semibold ${textColor} leading-tight`}>
                Vos Favoris
            </h1>
            <div className="grid grid-cols-3 gap-4">
                {favorites.map((p: any) => (
                    <PokemonCard key={p.id} name={p.name} id={String(p.id)} />
                ))}
            </div>
            <Footer />
        </>
    );
}