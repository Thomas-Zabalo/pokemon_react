import {Link} from "react-router";
import {useFavorites} from "./favoriteProvider.tsx";
import {useTheme} from "./themeProvider.tsx";

export function PokemonCard({name, id}: { name: string, id: string }) {
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
    const {favorites, toggleFavorite} = useFavorites();
    const {theme} = useTheme();

    const isFavorite = favorites.includes(id);
    const textColor = theme === "dark" ? "text-white" : "text-black";
    const cardColor = theme === "dark" ? "bg-gray-800" : "bg-gray-400";
    const starsOpacity = theme === "dark" ? "opacity-30" : "opacity-70";

    return (
        <div>
            <div
                className={`flex flex-row-reverse relative ${cardColor} shadow transition-shadow rounded-md py-2 px-2 mb-3`}>
                <button
                    onClick={() => toggleFavorite(id)}
                    className={`text-xl px-1 py-1 hover:cursor-pointer rounded-full ${isFavorite ? "text-yellow-400" : `text-gray-400 dark:text-gray-300 ${starsOpacity}`} hover:bg-black/8 dark:hover:text-white dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] group-data-[open=true]:!bg-white/16 group-data-[open=true]:!text-white group-data-[open=true]:!backdrop-blur-2xl border border-white/0 group-data-[open=true]:!border-white/4 group-data-[open=true]:!shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]`}
                    title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                    {isFavorite ? "🌟" : "⭐"}
                </button>
            </div>
            <div className={`relative ${cardColor} shadow transition-shadow rounded-md py-2 px-2 mb-6`}>

                <Link to={`/pokemon/${id}`}
                      className="">
                    <div className="mb-2">
                        <h3 className={`text-lg font-semibold ${textColor} capitalize`}>
                            {name}
                        </h3>
                    </div>
                    <div className="py-3 rounded-md">
                        <img src={image} alt={name} className="mx-auto w-24 h-24"/>
                    </div>
                </Link>
            </div>
        </div>
    );
}
