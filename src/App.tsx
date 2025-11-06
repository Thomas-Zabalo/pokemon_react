import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { PokemonDetails } from "./pages/pokemonDetails.tsx";
import { Home } from "./pages/home.tsx";
import { ThemeProvider } from "./components/provider/themeProvider.tsx";
import { FavoriteProvider } from "./components/provider/favoriteProvider.tsx";
import { PokemonFavorites } from "./pages/pokemonFavorites.tsx";
import { Search } from './pages/pokemonSearch.tsx';
import { Navbar } from './components/home/navbar.tsx';
import { ShinyProvider } from './components/provider/shinyProvider.tsx';

export function AppContent() {
    return (
        <BrowserRouter>
            <Navbar />
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
            <ShinyProvider>
                <FavoriteProvider>
                    <AppContent />
                </FavoriteProvider>
            </ShinyProvider>
        </ThemeProvider>
    )
}
