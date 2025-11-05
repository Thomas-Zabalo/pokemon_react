import { Link, useParams } from "react-router";
import { useFetch } from "../hooks/hook.tsx";
import { useTheme } from "../components/themeProvider.tsx";

export function PokemonDetails() {
    const { id } = useParams<{ id: string }>();
    const { theme } = useTheme();

    if (!id) return <p>Aucun Pokémon sélectionné.</p>;

    const pokemonId = parseInt(id, 10);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const { data } = useFetch(url);

    const urlPrev = pokemonId > 1 ? `https://pokeapi.co/api/v2/pokemon/${pokemonId - 1}` : "";
    const urlNext = `https://pokeapi.co/api/v2/pokemon/${pokemonId + 1}`;

    const { data: dataPrev } = useFetch(urlPrev);
    const { data: dataNext } = useFetch(urlNext);

    if (!data) return <p>Chargement...</p>;

    const textColor = theme === "dark" ? "text-white" : "text-black";
    const cardColor = theme === "dark" ? "bg-gray-800" : "bg-gray-400";
    const textColorHover = theme === "dark" ? "hover:text-white" : "hover:text-black";

    return (
        <>
            <div className="flex">
                <Link
                    to="/"
                    className={`inline-flex rounded-full py-1 px-2 select-none transition-all cursor-pointer ${textColor} ${textColorHover} hover:bg-black/8 dark:hover:bg-white/8 border border-transparent`}
                >
                    ← Retour
                </Link>
            </div>

            <div className="flex justify-between my-4">
                <div className="flex items-center">
                    {pokemonId > 1 && dataPrev && (
                        <>
                            <Link
                                to={`/pokemon/${pokemonId - 1}`}
                                className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer ${textColor} ${textColorHover} hover:bg-black/8 dark:hover:bg-white/8 border border-transparent`}
                            >
                                ← {dataPrev.name}
                            </Link>
                            <img
                                src={dataPrev.sprites.front_shiny}
                                alt={dataPrev.name}
                                className="w-16 h-16 mt-2"
                            />
                        </>
                    )}
                </div>

                <div className="flex items-center">
                    {dataNext && (
                        <>
                            <img
                                src={dataNext.sprites.front_shiny}
                                alt={dataNext.name}
                                className="w-16 h-16 mt-2"
                            />
                            <Link
                                to={`/pokemon/${pokemonId + 1}`}
                                className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer ${textColor} ${textColorHover} hover:bg-black/8 dark:hover:bg-white/8 border border-transparent`}
                            >
                                {dataNext.name} →
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <section className="flex grid-col-2 gap-4">
                <div className={`${cardColor} w-1/3 p-4 rounded shadow`}>
                    <h1
                        className={`text-2xl font-bold capitalize mb-2 ${textColor}`}
                    >
                        {data.name} (#{data.id})
                    </h1>
                    <div className="text-center mb-4">
                        <img
                            src={data.sprites.front_shiny}
                            alt={data.name}
                            className="w-32 h-32 mx-auto"
                        />
                    </div>

                    <div className="mb-4">
                        <h2 className={`font-semibold flex ${textColor}`}>Types:</h2>
                        <ul className="flex gap-2 justify-center my-2">
                            {data.types.map((t: any) => (
                                <li
                                    key={t.type.name}
                                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded capitalize"
                                >
                                    {t.type.name}
                                </li>
                            ))}
                        </ul>
                        <div className="mb-4">
                            <p className={`flex ${textColor}`}> <strong>Taille:</strong>  {data.height / 10} m</p>
                            <p className={`flex ${textColor}`}> <strong>Poids:</strong>  {data.weight / 10} kg</p>
                        </div>

                    </div>
                </div>

                <div className={`${cardColor} w-full p-4 rounded shadow`}>
                    <div className="mb-4">
                        <h2 className={`text-xl font-semibold mb-3 border-b pb-1 flex ${textColor}`}>Stats:</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {data.stats.map((s: any) => (
                                <div
                                    key={s.stat.name}
                                    className="flex justify-between p-2 rounded-md"
                                >
                                    <span className={`font-medium ${textColor}`}>{s.stat.name}</span>
                                    <span className={`font-bold ${textColor}`}>{s.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className={`text-xl font-semibold mb-3 border-b pb-1 flex ${textColor}`}>Abilities:</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {data.abilities.map((a: any) => (
                                <div
                                    key={a.ability.name}
                                    className="p-2 rounded-md font-medium"
                                >
                                    <span className={`font-medium ${textColor}`}> {a.ability.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
