import { useMemo } from "react";
import { useShiny } from "../provider/shinyProvider";
import { useParams } from "react-router";
import { useTheme } from "../provider/themeProvider";

const typeColors: { [key: string]: string } = {
    normal: "bg-gray-400 text-black",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-300 text-black",
    grass: "bg-green-500 text-white",
    ice: "bg-cyan-200 text-black",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-700 text-white",
    flying: "bg-indigo-300 text-black",
    psychic: "bg-pink-500 text-white",
    bug: "bg-green-700 text-white",
    rock: "bg-gray-600 text-white",
    ghost: "bg-indigo-700 text-white",
    dragon: "bg-purple-700 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-500 text-black",
    fairy: "bg-pink-300 text-black",
};

export function PokemonCardDetail({ data }: { data: any }) {
    const { id } = useParams<{ id: string }>();
    const { theme } = useTheme();
    const { shiny } = useShiny();

    const image = useMemo(() => {
        return shiny === "shiny"
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${id}.gif`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
    }, [shiny, id]);

    const textColor = useMemo(() =>
            theme === "dark" ? "text-white" : "text-black"
        , [theme]);

    const cardColor = useMemo(() =>
            theme === "dark" ? "bg-zinc-800" : "bg-white"
        , [theme]);

    return (
        <div className={`${cardColor} lg:w-1/3 w-full p-4 rounded shadow`}>
            <h1
                className={`text-2xl font-bold capitalize mb-2 ${textColor}`}
            >
                {data.name} (#{data.id})
            </h1>
            <div className="text-center mb-4">
                <img
                    src={image}
                    alt={data.name}
                    className="w-32 h-32 mx-auto"
                />
            </div>

            <div className="mb-4">
                <h2 className={`font-semibold flex ${textColor}`}>Types:</h2>
                <ul className="flex gap-2 justify-center my-2">
                    {data.types.map((t: any) => {
                        const colorClass = typeColors[t.type.name] || "bg-gray-200 text-black";
                        return (
                            <li
                                key={t.type.name}
                                className={`px-2 py-1 rounded capitalize ${colorClass}`}
                            >
                                {t.type.name}
                            </li>
                        );
                    })}
                </ul>
                <div className="mb-4">
                    <p className={`flex ${textColor}`}> <strong className="mr-1">Taille:</strong> {data.height / 10} m</p>
                    <p className={`flex ${textColor}`}> <strong className="mr-1">Poids:</strong>  {data.weight / 10} kg</p>
                </div>

            </div>
        </div>
    )
}