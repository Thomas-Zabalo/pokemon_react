import { type ChangeEvent, type FormEvent, useState, useEffect, useRef } from "react";
import { useTheme } from "./themeProvider";

interface PokemonSelectorProps {
    handlePokemonSelect: (pokemon: string | undefined) => void;
}

export function PokemonSelector({ handlePokemonSelect }: PokemonSelectorProps) {
    const [pokemon, setPokemon] = useState<string>("");
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const { theme } = useTheme();

    const wrapperRef = useRef<HTMLDivElement>(null);

    // Charger la liste complète des Pokémon
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500");
                const data = await res.json();
                setPokemonList(data.results.map((p: any) => p.name));
            } catch (error) {
                console.error("Erreur lors du chargement des Pokémon :", error);
            }
        };
        fetchPokemonList();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPokemon(value);

        if (value.length >= 2) {
            const filtered = pokemonList.filter((name) =>
                name.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 10);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    const searchPokemon = (e: FormEvent) => {
        e.preventDefault();
        if (!pokemon.trim()) {
            handlePokemonSelect(undefined);
        } else {
            handlePokemonSelect(pokemon.toLowerCase());
        }
        setPokemon("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const selectSuggestion = (name: string) => {
        handlePokemonSelect(name);
        setPokemon("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // Fermer la liste si clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        if (pokemon.length >= 2) {
            const filtered = pokemonList.filter((name) =>
                name.toLowerCase().includes(pokemon.toLowerCase())
            ).slice(0, 10);
            setSuggestions(filtered);
            setShowSuggestions(true);
        }
    };

    const bgColor = theme === "dark"
        ? "bg-gray-50 text-gray-600 placeholder-gray-400 hover:bg-gray-300"
        : "bg-gray-300 placeholder-gray-400 hover:bg-gray-200";

    return (
        <div className="py-6 relative" ref={wrapperRef}>
            <form onSubmit={searchPokemon} className="flex gap-4">
                <input
                    type="text"
                    className={`${bgColor} text-black text-sm rounded-lg block w-full p-2.5`}
                    value={pokemon}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Entrez un Pokémon"
                />
                <button
                    type="submit"
                    className={`${bgColor} text-black cursor-pointer font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                    Rechercher
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className={`${bgColor} absolute z-10 w-full mt-1 max-h-60 overflow-y-auto rounded shadow`}>
                    {suggestions.map((name) => (
                        <li
                            key={name}
                            onClick={() => selectSuggestion(name)}
                            className={`${bgColor} flex px-4 p-2 cursor-pointer text-black capitalize`}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
