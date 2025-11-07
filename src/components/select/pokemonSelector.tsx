import {type ChangeEvent, type FormEvent, useEffect, useMemo, useRef, useState} from "react";
import {useTheme} from "../provider/themeProvider";

interface PokemonSelectorProps {
    handlePokemonSelect: (pokemon: string | undefined) => void;
}

export function PokemonSelector({handlePokemonSelect}: PokemonSelectorProps) {
    const [pokemon, setPokemon] = useState<string>("");
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const {theme} = useTheme();

    const wrapperRef = useRef<HTMLDivElement>(null);

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

    const filteredSuggestions = useMemo(() => {
        if (pokemon.length < 2) return [];
        return pokemonList
            .filter((name) =>
                name.toLowerCase().includes(pokemon.toLowerCase())
            )
            .slice(0, 10);
    }, [pokemon, pokemonList]);

    const bgColor = useMemo(() =>
            theme === "dark"
                ? "bg-zinc-800 text-white placeholder-gray-400 border-gray-600 shadow-md"
                : "bg-white text-black placeholder-gray-500 border-gray-300 shadow-md"
        , [theme]);

    return (
        <div className="py-6 relative" ref={wrapperRef}>
            <form onSubmit={searchPokemon} className="flex gap-4">
                <input
                    type="text"
                    className={`${bgColor} text-black text-sm rounded-lg block w-full p-2.5  transition-all duration-300`}
                    value={pokemon}
                    onChange={handleChange}
                    placeholder="Entrez un Pokémon"
                />
                <button
                    type="submit"
                    className={`${bgColor} cursor-pointer font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  transition-all duration-300`}
                >
                    Rechercher
                </button>
            </form>

            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className={`${bgColor} absolute z-10 w-full mt-1 max-h-60 overflow-y-auto rounded shadow  transition-all duration-300`}>
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
