import { Link, useParams } from "react-router";
import { useFetch } from "../hooks/hook.tsx";
import { useTheme } from "../components/provider/themeProvider.tsx";
import { PokemonCardDetail } from "../components/details/pokemonCardDetail.tsx";
import { PokemonStatsDetail } from "../components/details/pokemonStatsDetail.tsx";

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
    const textColorHover = theme === "dark" ? "hover:text-white" : "hover:text-black";

    return (
        <>
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
                                src={dataPrev.sprites.front_default}
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
                                src={dataNext.sprites.front_default}
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

            <section className="flex flex-col md:flex-row gap-4">
                <PokemonCardDetail data={data} />
                <PokemonStatsDetail data={data} />
            </section>

        </>
    );
}
