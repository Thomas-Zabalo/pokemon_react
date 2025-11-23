import { useFetch } from "../../hooks/hook.tsx";
import { useCallback, useMemo, useState } from "react";
import { PokemonCard } from "./pokemonCard.tsx";
import { useTheme } from "../provider/themeProvider.tsx";

export function PokemonList() {
    const [offset, setOffset] = useState(0);
    const { theme } = useTheme();
    const limit = 20;

    const url = useMemo(() => {
        return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    }, [offset, limit]);

    const handlePrev = useCallback(() => {
        setOffset((prev) => Math.max(prev - limit, 0));
    }, []);

    const handleNext = useCallback(() => {
        setOffset((prev) => prev + limit);
    }, []);

    const textColor = useMemo(() =>
            theme === "dark" ? "text-white" : "text-black"
        , [theme]);

    const textColorHover = useMemo(() =>
            theme === "dark" ? "hover:text-white" : "hover:text-black"
        , [theme]);

    const { data, loading } = useFetch(url);

    return (
        <>
            {loading && !data && (
                <div className={`${textColor} px-4 py-2`}>
                    Chargement en cours...
                </div>
            )}

            {!data && !loading ? (
                <div className={`${textColor} px-4 py-2`}>
                    Aucune donnée trouvée.
                </div>
            ) : data && data.results ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {data.results.map((p: any, i: number) => {
                            const parts = p.url.split("/").filter(Boolean);
                            const id = parts[parts.length - 1];

                            return (
                                <div key={i}>
                                    <PokemonCard name={p.name} id={id} />
                                </div>
                            );
                        })}
                    </div>

                    <div className="justify-between flex my-4">
                        <div>
                            {offset > 0 && <button
                                className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer ${textColor} ${textColorHover} hover:bg-black/8  dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] bg-white/16 border border-white/0`
                                } onClick={handlePrev}>Précédent</button>}
                        </div>
                        <div>
                            <button
                                className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer ${textColor} ${textColorHover}  hover:bg-black/8  dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] bg-white/16 border border-white/0`}
                                onClick={handleNext}>
                                Suivant
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}