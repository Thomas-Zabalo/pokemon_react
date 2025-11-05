import { useState } from "react";
import { PokemonSelector } from "../components/pokemonSelector";
import { useFetch } from "../hooks/hook";
import { useTheme } from "../components/themeProvider";
import { PokemonCard } from "../components/pokemonCard";

export function Search() {
    const [selectedPokemon, setSelectedPokemon] = useState<string>();
    const { theme } = useTheme();
    const url = selectedPokemon ? `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}` : "";

    const handlePokemonSelect = (pokemon: string | undefined) => {
        setSelectedPokemon(pokemon);
    }

    const textColor = theme === "dark" ? "text-white" : "text-black";

    const { data, loading, error } = useFetch(url);

    return (
        <>
            <PokemonSelector handlePokemonSelect={handlePokemonSelect} />

            {!selectedPokemon && (
                <div className={`${textColor} px-4 py-2`}>
                    Recherchez un Pokémon pour afficher ses informations.
                </div>
            )}

            {loading && (
                <div className={`${textColor} px-4 py-2`}>
                    Chargement en cours...
                </div>
            )}

            {error && selectedPokemon && (
                <div className={`${textColor} px-4 py-2`}>
                    Le Pokémon "{selectedPokemon}" n'existe pas.
                </div>
            )}

            {selectedPokemon && data && !error && (() => {
                const parts = data.species?.url?.split("/").filter(Boolean);
                const id = parts ? parts[parts.length - 1] : data.id;

                return (
                    <div className="grid grid-cols-3 gap-4">
                        <PokemonCard
                            name={data.name}
                            id={id}
                        />
                    </div>
                );
            })()}

        </>
    );
}