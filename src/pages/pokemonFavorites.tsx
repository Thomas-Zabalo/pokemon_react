import { PokemonCardFavorite } from "../components/favorite/pokemonCardFavorite.tsx";
import { Footer } from "../components/home/footer.tsx";
import { useFavorites } from "../components/provider/favoriteProvider.tsx";
import { useTheme } from "../components/provider/themeProvider.tsx";

export function PokemonFavorites() {
    const { favorites } = useFavorites();
    const { theme } = useTheme();
    const textColor = theme === "dark" ? "text-white" : "text-black";

    if (favorites.length === 0) {
        return <p className={textColor}>Aucun Pokémon favori pour le moment.</p>;
    }

    const sortedFavorites = [...favorites].sort((a, b) => Number(a) - Number(b));

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {sortedFavorites.map((id: string) => (
                    <PokemonCardFavorite key={id} name={id} id={id} />
                ))}
            </div>
            <Footer />
        </>
    );
}
