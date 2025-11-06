import { PokemonList } from "../components/home/pokemonList.tsx";
import { Footer } from "../components/home/footer.tsx";

export function Home() {

    return (
        <>
            <section className="max-h-[75px] mb-12 pb-12">
                <PokemonList />
                <Footer />
            </section>
        </>
    )
}