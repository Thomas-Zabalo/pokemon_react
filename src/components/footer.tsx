import {useTheme} from "./themeProvider.tsx";

export function Footer(){
    const {theme} = useTheme();
    const textColor = theme === "dark" ? "text-white" : "text-black";

    return(
        <>
            <footer className='container mt-2'>
                <div className='w-full px-5 pt-0.5 lg:pt-[0.5rem] pb-10 overflow-hidden relative shadow-none'>
                    <div className={`w-full lg:mt-12 pt-10 flex items-center justify-center text-surface-0 border-t border-dashed border-black/10 dark:border-white/10 ${textColor}`}>© {new Date().getFullYear()} ReactJS – Théorie et pratique intégrées</div>
                </div>
            </footer>
        </>
    )
}