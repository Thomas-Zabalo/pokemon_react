import { Link } from "react-router";
import { useTheme } from "../provider/themeProvider";
import { useShiny } from "../provider/shinyProvider";
import { BsStars } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import {useMemo} from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const { shiny, setShiny } = useShiny();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }
    const toggleShiny = () => {
        setShiny(shiny === "shiny" ? "notShiny" : "shiny")
    }

    const textColor = useMemo(() =>
            theme === "dark" ? "text-white" : "text-black"
        , [theme]);

    const borderColor = useMemo(() =>
            theme === "dark" ? "dark:border-white/10" : "border-black/10"
        , [theme]);

    return (
        <nav
            className={`flex items-center relative justify-between py-6 mb-6 w-[calc(100%-3rem)] max-h-[75px] mx-auto border-b ${borderColor} border-dashed`}>
            <ul className="flex items-center gap-3">
                <li className={`${textColor}  inline-flex items-center gap-2 rounded-full py-1 px-2 select-none  transition-all duration-300 cursor-pointer  hover:underline`}>
                    <Link to="/" className="w-full">
                        Accueil
                    </Link>
                </li>

                <li className={`${textColor} inline-flex items-center gap-2 rounded-full py-1 px-2 select-none  transition-all duration-300 cursor-pointer  hover:underline`
                }><Link to="/search" className="w-full">
                        Recherche
                    </Link>
                </li>

            </ul>
            <ul>
                <li className={`${textColor} inline-flex items-center gap-2 rounded-full py-1 px-2 select-none  transition-all duration-300 cursor-pointer hover:underline`
                }><Link to="/favorites" className="w-full">
                        <MdFavoriteBorder />
                    </Link>
                </li>
                <li className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none  cursor-pointer    `
                }>
                    <button onClick={toggleShiny} className="w-full cursor-pointer">
                        {shiny === "shiny" ? <BsStars color="#ff00ff" /> : <BsStars color={theme === "light" ? "black" : "white"} />}
                    </button>
                </li>
                <li className={`inline-flex items-center gap-2 rounded-full py-1 px-2 select-none  cursor-pointer    `
                }>
                    <button onClick={toggleTheme} className="w-full cursor-pointer">
                        {theme === "light" ? <IoMoon color="black" /> : <IoSunny />}
                    </button>
                </li>
            </ul>
        </nav>
    )
}