import { PokemonList } from "../components/pokemonList.tsx";
import { Footer } from "../components/footer.tsx";
import { useTheme } from "../components/themeProvider.tsx";

export function Home() {
    const { theme } = useTheme();

    const textColor = theme === "dark" ? "text-white" : "text-black";

    return (
        <>
            <section className="max-h-[75px] mb-12 pb-12">
                <h1 className={`py-5 justify-center text-3xl lg:text-6xl font-semibold ${textColor} text-surface-950 dark:text-surface-0 leading-tight`}>Pokemon API</h1>
                <PokemonList />
                <Footer />
            </section>
        </>
    )
}