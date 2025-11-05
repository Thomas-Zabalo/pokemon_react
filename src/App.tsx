import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { PokemonDetails } from "./pages/pokemonDetails.tsx";
import { Home } from "./pages/home.tsx";
import { ThemeProvider, useTheme } from "./components/themeProvider.tsx";
import { FavoriteProvider } from "./components/favoriteProvider.tsx";
import { PokemonFavorites } from "./pages/pokemonFavorites.tsx";
import { Search } from './pages/search.tsx';

export function AppContent() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const textColor = theme === "dark" ? "text-white" : "text-black";

    return (
        <BrowserRouter>
            <nav
                className="flex items-center relative justify-between py-6 mb-6 w-[calc(100%-3rem)] max-h-[75px] mx-auto border-b border-black/10 dark:border-white/10 border-dashed">
                <ul className="flex items-center gap-3">
                    <li className={`${textColor} inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer  bg-black/10  dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)]  border border-white/0 `
                    }><Link to="/" className="w-full">
                            Accueil
                        </Link>
                    </li>

                    <li className={`${textColor} inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer   bg-black/10  dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)]  border border-white/0 `
                    }><Link to="/search" className="w-full">
                            Recherche
                        </Link>
                    </li>

                    <li className={`${textColor} inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer   bg-black/10  dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)]  border border-white/0 `
                    }><Link to="/favorites" className="w-full">
                            Favoris
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none transition-all cursor-pointer   bg-black/10  dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)]  border border-white/0 `
                    }>
                        <button onClick={toggleTheme} className="w-full cursor-pointer">
                            {theme === "light" ? "🌘" : "🌞"}
                        </button>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
                <Route path="/favorites" element={<PokemonFavorites />} />
            </Routes>
        </BrowserRouter>
    )
}

export default function App() {

    return (
        <ThemeProvider>
            <FavoriteProvider>
                <AppContent />
            </FavoriteProvider>
        </ThemeProvider>
    )
}
