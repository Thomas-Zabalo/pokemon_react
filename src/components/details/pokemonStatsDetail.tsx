import { useTheme } from "../provider/themeProvider";
import {useMemo} from "react";

export function PokemonStatsDetail({ data }: { data: any }) {
    const { theme } = useTheme();

    const textColor = useMemo(() =>
            theme === "dark" ? "text-white" : "text-black"
        , [theme]);

    const cardColor = useMemo(() =>
            theme === "dark" ? "bg-zinc-800" : "bg-white"
        , [theme]);

    return (
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
    )
}