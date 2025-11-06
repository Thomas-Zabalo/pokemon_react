import { useTheme } from "../provider/themeProvider.tsx";

export function Footer() {
    const { theme } = useTheme();

    const textColor = theme === "dark" ? "text-white" : "text-black";
    const borderColor = theme === "dark" ? "dark:border-white/10" : "border-black/10";
    
    return (
        <>
            <footer className='container'>
                <div className='w-full px-5 pb-10 overflow-hidden relative shadow-none'>
                    <div className={`w-full pt-10 flex items-center justify-center text-surface-0 border-t border-dashed  ${borderColor} ${textColor}`}>© {new Date().getFullYear()} ReactJS – Théorie et pratique intégrées</div>
                </div>
            </footer>
        </>
    )
}