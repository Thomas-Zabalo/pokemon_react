import { Link } from "react-router";
import { useFavorites } from "../provider/favoriteProvider.tsx";
import { useTheme } from "../provider/themeProvider.tsx";
import { useShiny } from "../provider/shinyProvider.tsx";
import {useCallback, useMemo, useState} from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export function PokemonCard({ name, id }: { name: string, id: string }) {
    const { favorites, toggleFavorite } = useFavorites();
    const [clicked, setClicked] = useState(false);
    const { theme } = useTheme();
    const { shiny } = useShiny();

    const image = useMemo(() => {
        return shiny === "shiny"
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${id}.gif`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
    }, [shiny, id]);

    const handleClick = useCallback((pokemonId: string) => {
        setClicked(true);
        toggleFavorite(pokemonId);
        setTimeout(() => setClicked(false), 50);
    }, [toggleFavorite]);

    const isFavorite = favorites.includes(id);

    const textColor = useMemo(() =>
            theme === "dark" ? "text-white" : "text-black"
        , [theme]);

    const cardColor = useMemo(() =>
            theme === "dark" ? "bg-zinc-800" : "bg-white"
        , [theme]);

    return (
        <div className="w-full max-w-xs mx-auto">
            <div
                className={`relative ${cardColor} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}
            >
                <button onClick={() => handleClick(id)}
                    className="absolute top-2 right-2 text-2xl cursor-pointer"
                    title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                    {isFavorite ? (
                        <MdFavorite
                            className={`text-pink-400 transition-transform duration-500 ${clicked ? "rotate-360" : "rotate-0"}`}
                        />
                    ) : (
                        <MdFavoriteBorder
                            className="text-gray-400 hover:text-pink-200 transition-transform duration-500"
                        />
                    )}
                </button>

                <Link to={`/pokemon/${id}`} className="block text-center pt-6 pb-3">
                    <img
                        src={image}
                        alt={name}
                        className="w-28 h-28 mx-auto object-contain transition-transform duration-300"
                    />
                </Link>

                <div className="px-4 pb-4 text-center">
                    <h3 className={`text-lg font-semibold ${textColor} capitalize mb-1`}>
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        #{id.toString().padStart(3, "0")}
                    </p>
                </div>
            </div>
        </div >

    );
}
